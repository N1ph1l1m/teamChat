import React  from "react";
//import Message from "../../Shared/Message/message";
//import MessageInput from "../../Shared/inputMessage/messageInput";
import { IoSend } from "react-icons/io5";
import styles from "../../App/Styles/chatArea.module.css";
import Icon from "../../Shared/icon/icon";
import { MdOutlineEmojiEmotions } from "react-icons/md";
import EmojiPicker from "emoji-picker-react";
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
}) {


  function renderSelectTypeFile() {
    if (selectTypeFile) {
      return (
        <div className={styles.selectTypeFileWrap}>
          <div className={styles.selectTypeFiles}>
            <input
              type="file"
              id="documents"
              name="documents"
              accept=".txt, .pdf, .doc, .docx, .odt, .rtf, .xls, .xlsx, .ppt, .pptx , .zip, .exe, "
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
    return null;
  }

  const showSelectTypeFile = renderSelectTypeFile();

  return (
    <div className={styles.chatAreaWrap}>
      <div className={styles.chatHeader}>
        <div className={styles.chatHeaderItem}>
          <p>{title}</p>
        </div>
        <div

          className={styles.messages}>
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

        <div
          className={styles.inputFileWrap}
          onClick={setSelect}
        >
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
