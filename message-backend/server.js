//import
import express from "express";
import mongoose from "mongoose";
import Pusher from "pusher";
import cors from "cors";

import mongoData from "./mongoData.js";

//app cofig
const app = express();
const port = process.env.PORT || 9000;

const pusher = new Pusher({
  appId: "1131058",
  key: "2571deb02cd38b1a7210",
  secret: "3a38ad564e51886b1b04",
  cluster: "ap1",
  useTLS: true,
});

//middlewares
app.use(cors());
app.use(express.json());

// db config

const mogoURL =
  "mongodb+srv://admin:Lam003439@cluster0.keiaw.mongodb.net/mesageDB?retryWrites=true&w=majority";

mongoose.connect(mogoURL, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.once("open", () => {
  console.log("DB connected");
  const changeStream = mongoose.connection.collection('conversations').watch()

  changeStream.on('change', (change) => {
      if (change.operationType === 'insert') {
          pusher.trigger('chats', 'newChat', {
              'change': change
          })
      } else if (change.operationType === 'update') {
          pusher.trigger('messages', 'newMessage', {
              'change': change
          })
      } else {
          console.log('Error triggering Pusher...')
      }
  })
  
  // const changeStream = mongoose.connection.collection("conversation").watch();

  // changeStream.on('change',(change) => {
  //   if (change.operationType==='insert') {
  //     pusher.trigger('chats', 'newChat',{
  //       'change': change
  //     })
  //   }else if (change.operationType==='update') {
  //     pusher.trigger('message', 'newMessage',{
  //       'change': change
  //     })
  //   } else{
  //     console.log('Error triggering Pusher...')
  //   }
  // } )
});

//api routes
app.get("/", (req, res) => res.status(200).send("Hello bro!"));

app.post("/new/conversation", (req, res) => {
  const dbData = req.body;

  mongoData.create(dbData, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});

app.post("/new/message", (req, res) => {
  mongoData.updateOne(
    { _id: req.query.id },
    { $push: { conversation: req.body } },
    (err, data) => {
      if (err) {
        console.log("Error saving message...");
        console.log(err);

        res.status(500), send(err);
      } else {
        res.status(200).send(data);
      }
    }
  );
});

app.get("/get/conversationList", (req, res) => {
  mongoData.find((err, data) => {
    if (err) {
      res.status(500).swend(err);
    } else {
      data.sort((a, b) => {
        return a.timestamp - b.timestamp;
      });

      let conversations = [];

      data.map((conversationData) => {
        const conversationInfor = {
          id: conversationData._id,
          name: conversationData.chatName,
          timestamp: conversationData.conversation[0].timestamp,
        };

        conversations.push(conversationInfor);
      });
      res.status(200).send(conversations);
    }
  });
});

app.get("/get/conversation", (req, res) => {
  const id = req.query.id;
  mongoData.find({ _id: id }, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

app.get("/get/lastMessage", (req, res) => {
  const id = req.query.id;

  mongoData.find({ _id: id }, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      let convData = data[0].conversation;

      convData.sort((b, a) => {
        return a.timestamp - b.timestamp;
      });

      res.status(200).send(convData[0]);
    }
  });
});

// listen

app.listen(port, () => console.log(`listen on localhost: ${port}`));
