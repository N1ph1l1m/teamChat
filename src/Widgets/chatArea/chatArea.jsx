import React from "react";
//import Message from "../../Shared/Message/message";
//import MessageInput from "../../Shared/inputMessage/messageInput";
import { IoSend } from "react-icons/io5";
import styles from "../../App/Styles/chatArea.module.css";
import Icon from "../../Shared/icon/icon";
import { MdOutlineEmojiEmotions } from "react-icons/md";
import EmojiPicker from "emoji-picker-react";
import { IoIosClose } from "react-icons/io";
import { FaFile, FaFileImage, FaPaperclip } from "react-icons/fa";

function ChatArea({
  title,
  content,
  documents,
  images,
  inputValue,
  input,
  sendmessage,
  isOpenEmoji,
  openEmoji,
  closeEmoji,
  emojiEvent,
  selectTypeFile,
  setSelect,
  keyDownSend,
  replyMessage,
  closeReplyMenu,
}) {
  const autUsr = localStorage.getItem("username");
  function renderSelectTypeFile() {
    if (selectTypeFile) {
      return (
        <div className={styles.selectTypeFileWrap}>
          <div className={styles.selectTypeFiles}>
            <input
              type="file"
              id="documents"
              name="documents"
              accept=".txt, .pdf, .doc, .docx, .xls, .xlsx, .ppt, .pptx , .zip, .rar, .exe, "
              onChange={documents}
              multiple
            />
            <label htmlFor="documents">
              <Icon className={styles.icon}>
                <FaFile color="rgb(131, 130, 130)" size="30" />
              </Icon>
              <span>Документ</span>
            </label>
            <input
              type="file"
              id="photo"
              name="photo"
              accept="image/*"
              onChange={images}
              multiple
            />
            <label htmlFor="photo">
              <Icon className={styles.icon}>
                <FaFileImage color="rgb(131, 130, 130)" size="30" />
              </Icon>
              <span>Фото</span>
            </label>
          </div>
        </div>
      );
    }
    // return null;
  }

  function mediaReplyMessage(reply, text , textS){
    if(reply.length === 1 ){
      return(<>
      <span style={{marginLeft:"5px",color:"#390cce", cursor:"pointer"}}>{text}</span>
      </>)
    }
    if(reply.length >1){
        return(
        <>
          <span style={{marginLeft:"5px", color:"#390cce", cursor:"pointer"}} >{textS}</span>
        </>
      )
    }




  }
  function renderReplyMessage() {
    if (!replyMessage || !Array.isArray(replyMessage) || replyMessage.length === 0) return null;

    return (
      <div className={styles.replyMessageWrap}>
          {Array.isArray(replyMessage) && replyMessage.length > 0 &&
            replyMessage.map((reply) => (
        <div className={styles.replyItems} style={reply.user.username === autUsr ?
          {borderLeft:"3px solid #390cce"}:
          {borderLeft:"3px solid #d3cdcd"} } >

                <span className={styles.replyUserName}>
                  {reply.user.username}
                </span>

                <div className={styles.replyText}>
                  <span>{reply.text}</span>
                  {mediaReplyMessage(reply.photos,"Фотография")}
                  {mediaReplyMessage(reply.photos,"", "Фотографии")}
                  {mediaReplyMessage(reply.documents,"Документ")}
                  {mediaReplyMessage(reply.documents,"", "Документы")}
                </div>

              </div>
            ))}

        <Icon>
          <IoIosClose
            style={{ cursor: "pointer" }}
            onClick={closeReplyMenu}
            color="black"
            size="50"
          />
        </Icon>
      </div>
    );
  }
  const showSelectTypeFile = renderSelectTypeFile();
  const showReplyMessage = renderReplyMessage();

  return (
    <div className={styles.chatAreaWrap}>
      <div className={styles.chatHeader}>
        <div className={styles.chatHeaderItem}>
          <p>{title}</p>
        </div>
        <div className={styles.messages}>
          {content}
          <div
            className={styles.emojiWrap}
            onMouseOver={openEmoji}
            onMouseLeave={closeEmoji}
          >
            <EmojiPicker
              open={isOpenEmoji}
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
        {showSelectTypeFile}
        {showReplyMessage}
        <div className={styles.inputFileWrap} onClick={setSelect}>
          <Icon className={styles.icon}>
            <FaPaperclip color="rgb(131, 130, 130)" size="30" />
          </Icon>
        </div>
        <div className={styles.wrapTextInput}>
          <textarea
            placeholder="Type your message"
            value={inputValue}
            onChange={input}
            onKeyDownCapture={keyDownSend}
          />

          <Icon>
            <MdOutlineEmojiEmotions
              color="rgb(131, 130, 130)"
              size="30"
              onClick={openEmoji}
            />
          </Icon>
        </div>

        <Icon>
          <IoSend onClick={sendmessage} color="#390cce" size="30" />
        </Icon>
      </div>
    </div>
  );
}
export default ChatArea;
