import React, { useState } from "react";
//import Message from "../../Shared/Message/message";
//import MessageInput from "../../Shared/inputMessage/messageInput";
import "../chatArea/chatArea.scss";
//import "../inputMessage/inputMessage.scss"
function ChatArea(props) {


  return (
    <div className="chat-area">
      <div className="chat-header">
        <div className="chat-header-item">
          <p>{props.title}</p>
        </div>
        <div className="messages">{props.content}</div>
      </div>
      <div className="message-input">
        <textarea
          placeholder="Type your message"
          value={props.inputValue}
          onChange={props.input}
        />
        <button onClick={props.sendmessage}>Send</button>
      </div>
    </div>
  );
}
export default ChatArea;
