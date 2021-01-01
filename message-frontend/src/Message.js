import { Avatar } from "@material-ui/core";
import React, { forwardRef } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "./features/userSlice";
import "./Message.css";
import * as timeago from "timeago.js";

const Message = forwardRef(
  (
    { id, timestamp, sender, message  },
    ref
  ) => {
    const user = useSelector(selectUser);

    return (
      <div
        ref={ref}
        className={`message ${user.email === sender.email && "message__sender"}`}
      >
        <Avatar className="message__photo" src={sender.photo} />
        <p>{message}</p>
        {/* <small>{timeago.format(new Date(parseInt(timestamp)).toDateString())}</small> */}
        <small>{new Date(parseInt(timestamp)).toDateString()}</small>
      </div>
    );
  }
);

export default Message;
