import React, { useState } from "react";
//import Message from "../../Shared/Message/message";
//import MessageInput from "../../Shared/inputMessage/messageInput";
import { IoSend } from "react-icons/io5";
import styles from "../../App/Styles/chatArea.module.css";
import { MdAddPhotoAlternate } from "react-icons/md";
import Icon from "../../Shared/icon/icon";
function ChatArea(props) {
  return (
    <div className={styles.chatAreaWrap}>
      <div className={styles.chatHeader}>
        <div className={styles.chatHeaderItem}>
          <p>{props.title}</p>
        </div>
        <div className={styles.messages}>{props.content}</div>
      </div>
      <div className={styles.messageInput}>
        <div className={styles.inputFileWrap}>
          <input
            type="file"
            id="photo"
            name="photo"
            accept="image/png, image/jpeg"
            onChange={props.file}
            multiple
          />
          <label for="photo">
            <Icon className={styles.icon}>
              <MdAddPhotoAlternate color="gray" size="30" />
            </Icon>
          </label>
        </div>

        <textarea
          placeholder="Type your message"
          value={props.inputValue}
          onChange={props.input}
        />

        <Icon>
          <IoSend
            onClick={props.sendmessage}
            color="rgb(116, 116, 116)"
            size="25"
          />
        </Icon>
      </div>
    </div>
  );
}
export default ChatArea;
