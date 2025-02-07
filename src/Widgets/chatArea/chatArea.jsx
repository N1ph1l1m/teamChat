import { useState, useEffect, useRef } from "react";
import { IoSend } from "react-icons/io5";
import styles from "../../App/Styles/chatArea.module.css";
import Icon from "../../Shared/icon/icon";
import { MdOutlineEmojiEmotions } from "react-icons/md";
import { emojiBd } from "../../App/Parameters/DataEmoji";
import Picker from "@emoji-mart/react";
import { IoIosClose } from "react-icons/io";
import { FaFile, FaFileImage, FaPaperclip } from "react-icons/fa";
import { IoIosArrowDropdown } from "react-icons/io";

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
  selectTypeFile,
  setSelect,
  keyDownSend,
  replyMessage,
  closeReplyMenu,
  setMessage,
}) {
  const messagesRef = useRef(null)
  const [showScrollButton, setShowScrollButton] = useState(false);
  const autUsr = localStorage.getItem("username");

  useEffect(() => {
    const handleScroll = () => {
      if (messagesRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = messagesRef.current;

        // Проверяем, находится ли пользователь в самом низу
        const isAtBottom = scrollTop + clientHeight >= scrollHeight - 5; // -5 для учёта погрешности

        if (isAtBottom) {
          setShowScrollButton(false); // Скрываем кнопку в самом низу
        } else {
          setShowScrollButton(true); // Показываем кнопку при прокрутке вверх
        }
      }
    };



    const messagesElement = messagesRef.current;
    if (messagesElement) {
      messagesElement.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (messagesElement) {
        messagesElement.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

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
  }

function mediaReplyMessage(reply, text, textS) {
    if (reply.length === 1) {
      return (
        <>
          <span
            style={{ marginLeft: "5px", color: "#390cce", cursor: "pointer" }}
          >
            {text}
          </span>
        </>
      );
    }
    if (reply.length > 1) {
      return (
        <>
          <span
            style={{ marginLeft: "5px", color: "#390cce", cursor: "pointer" }}
          >
            {textS}
          </span>
        </>
      );
    }
  }
  function renderReplyMessage() {
    if (
      !replyMessage ||
      !Array.isArray(replyMessage) ||
      replyMessage.length === 0
    )
      return null;

    return (
      <div className={styles.replyMessageWrap}>
        {Array.isArray(replyMessage) &&
          replyMessage.length > 0 &&
          replyMessage.map((reply) => (
            <div
              key={reply.id}
              className={styles.replyItems}
              style={
                reply.user.username === autUsr
                  ? { borderLeft: "3px solid #390cce" }
                  : { borderLeft: "3px solid #d3cdcd" }
              }
            >
              <span className={styles.replyUserName}>
                {reply.user.username}
              </span>

              <div className={styles.replyText}>
                <span>{reply.text}</span>
                {mediaReplyMessage(reply.photos, "Фотография")}
                {mediaReplyMessage(reply.photos, "", "Фотографии")}
                {mediaReplyMessage(reply.documents, "Документ")}
                {mediaReplyMessage(reply.documents, "", "Документы")}
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

  function inputEmoji(emojiObject) {
    const sys = emojiObject.unified.split("_");
    const codeArray = [];
    sys.forEach((el) => codeArray.push("0x" + el));
    let emoji = String.fromCodePoint(...codeArray);
    setMessage((prevInput) => prevInput + emoji);
  }
  const scrollToBottom = () => {
    if (messagesRef.current) {
      messagesRef.current.scrollTo({
        top: messagesRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className={styles.chatAreaWrap}>
      <div className={styles.chatHeader}>
        <div className={styles.chatHeaderItem}>{title}</div>
        <div className={styles.messages} ref = {messagesRef}

          >
          {content}

          <div
            className={styles.emojiWrap}
            style={isOpenEmoji ? { display: "block" } : { display: "none" }}
          >
            <Picker
              data={emojiBd.data}
              theme={"ligth"}
              onEmojiSelect={inputEmoji}
              locale={"ru"}
              searchPosition={"none"}
            />
          </div>
        </div>
      </div>
      <div className={styles.messageInput}>
      {showScrollButton &&  (
        <button  className={styles.scrollDown}
            onClick={scrollToBottom}
          >
            <Icon>
            <IoIosArrowDropdown  size="30" color="#105c9f" />
            </Icon>
          </button>
      )

             }
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
          <IoSend onClick={sendmessage} color="#105c9f" size="30" />
        </Icon>
      </div>
    </div>
  );
}
export default ChatArea;
