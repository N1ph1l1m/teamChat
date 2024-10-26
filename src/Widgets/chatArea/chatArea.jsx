import React, { useState } from "react";
//import Message from "../../Shared/Message/message";
//import MessageInput from "../../Shared/inputMessage/messageInput";
import { IoSend } from "react-icons/io5";
import styles from "../../App/Styles/chatArea.module.css";
import { MdAddPhotoAlternate } from "react-icons/md";
import Icon from "../../Shared/icon/icon";
import { MdOutlineEmojiEmotions } from "react-icons/md";
import EmojiPicker from 'emoji-picker-react';
function ChatArea({
  title,
  content,
  file,
  inputValue,
  input,
  sendmessage,
  isOpenEmoji,
openEmoji,
closeEmoji,
  emojiEvent
}) {
  return (
    <div className={styles.chatAreaWrap}>
      <div className={styles.chatHeader}>
        <div className={styles.chatHeaderItem}>
          <p>{title}</p>
        </div>
        <div className={styles.messages}>{content}
        <div className={styles.emojiWrap}
           onMouseOver={openEmoji}
           onMouseLeave={closeEmoji}>
        <EmojiPicker open={isOpenEmoji}
          width={350}
          height={350}
          searchDisabled={true}
          onEmojiClick={emojiEvent}
          skinTonesDisabled={true}
          />
        </div>
        </div>
      </div>
      <div className={styles.messageInput}>
        <div className={styles.inputFileWrap}>
          <input
            type="file"
            id="photo"
            name="photo"
            accept="image/png, image/jpeg"
            onChange={file}
            multiple
          />
          <label for="photo">
            <Icon className={styles.icon}>
              <MdAddPhotoAlternate
              color="rgb(131, 130, 130)"
              size="30" />
            </Icon>
          </label>
        </div>
        <div className={styles.wrapTextInput}>
        <textarea
          placeholder="Type your message"
          value={inputValue}
          onChange={input}
        />

          <Icon>
            <MdOutlineEmojiEmotions
              color="rgb(131, 130, 130)"
              size="30"
              onMouseOver={openEmoji}
              onMouseLeave={closeEmoji}
            />

          </Icon>
        </div>

        <Icon>
          <IoSend
            onClick={sendmessage}
            color="#390cce"
            size="30"
          />
        </Icon>
      </div>
    </div>
  );
}
export default ChatArea;
