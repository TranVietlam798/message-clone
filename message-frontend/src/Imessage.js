import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import Chat from "./Chat";
import { setChat } from "./features/chatSlice";
import db from "./firebase";
import "./Imessage.css";
import Sidebar from "./Sidebar";

function Imessage() {
  const dispatch = useDispatch();

  // useEffect(() => {
  //   db.collection("chats").onSnapshot((snapshot) =>
  //   dispatch(
  //     setChat(
  //       {
  //         chatId: snapshot.docs[0].id,
  //         chatName: snapshot.docs[0].data().chatName
  //       }
  //       // snapshot.docs.map((doc) => ({
  //       //   id: doc.id,
  //       //   data: doc.data(),
  //       // }))
  //     ))
  //   );
  // }, []);

  return (
    <div className="imessage">
      <Sidebar />
      <Chat />
    </div>
  );
}

export default Imessage;
