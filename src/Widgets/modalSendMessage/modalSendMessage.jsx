import React from "react";
import Portal from "../modalCreateGroup/portal";
import PropTypes from "prop-types";
import styles from "../../App/Styles/modalSendMessage.module.css";
import Icon from "../../Shared/icon/icon";
import { IoSend } from "react-icons/io5";
import { IoIosClose } from "react-icons/io";
import { MdOutlineEmojiEmotions } from "react-icons/md";
import ProgressBar from "../../Shared/progressBar/progressBar";
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react';
import { FaRegTrashAlt } from "react-icons/fa";
import {InputFileTypeIcons} from "../../Shared/FileTypeIcons/downloadFileTypeIcons";


const ModalSendMessage = ({
  title,
  isOpen,
  onCancel,
  onSubmit,
  inputPrewiew,
  input,
  inputValue,
  keyDownSend,
  isOpenEmoji,
  openEmoji,
  setMessage,
  progressBar,
  removeElement,
}) => {
  function inputEmoji(emojiObject) {
    const sys = emojiObject.unified.split("_");
    const codeArray = [];
    sys.forEach((el) => codeArray.push("0x" + el));
    let emoji = String.fromCodePoint(...codeArray);


   setMessage((prevInput) => prevInput + emoji);
  }

  return (
    <>
      {isOpen && (
        <Portal>
          <div className={styles.modalOverlay}>
            <div className={styles.modalWrap}
            >
              <div className={styles.emojiWrap}
               style={isOpenEmoji ? {display:"block"} : {display:"none"}}>
              <Picker
              data={data}
              theme={"ligth"}
              onEmojiSelect={inputEmoji}
              previewPosition={"none"}
              searchPosition={"none"}
              />
              </div>
              <div className={styles.modalHeader}
              >
                <h2 className={styles.modalTitle}>{title}</h2>
                <Icon>
                  <IoIosClose
                    className={styles.closeModel}
                    onClick={onCancel}
                    color="rgb(116, 116, 116)"
                    size="35"
                  />
                </Icon>
              </div>

              <div className={styles.modalBody}>
                <div className={styles.wrapContentModal}>
                  <div className={styles.wrapPhoto}>
                    {Array.isArray(inputPrewiew) && inputPrewiew.length > 0
                      ? inputPrewiew.map((img, index) => (
                          <div key={index} className={styles.inputWrapFiles}>
                            {InputFileTypeIcons(img, index)}
                            <ProgressBar value={progressBar} />
                            <FaRegTrashAlt
                              size="25"
                              color="black"
                              style={{ marginLeft: "10px" }}
                              onClick={() => removeElement(index)}
                            />
                          </div>
                        ))
                      : null}
                  </div>

                  <div className={styles.inputWrap}>
                    <textarea
                      placeholder="Подпись"
                      value={inputValue}
                      onChange={input}
                      onKeyDownCapture={keyDownSend}
                    />{" "}
                    <Icon>
                      <MdOutlineEmojiEmotions
                        color="rgb(131, 130, 130)"
                        size="25"
                        onClick={openEmoji}
                      />
                    </Icon>
                    <Icon>
                      <IoSend
                        onClick={onSubmit}
                        color="rgb(116, 116, 116)"
                        size="25"

                      />
                    </Icon>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Portal>
      )}
    </>
  );
};

ModalSendMessage.propTypes = {
  title: PropTypes.string,
  isOpen: PropTypes.bool,
  onCancel: PropTypes.func,
  onSubmit: PropTypes.func,
  children: PropTypes.node,
};

ModalSendMessage.defaultProps = {
  title: "Modal title",
  isOpen: false,
  onCancel: () => {},
  onSubmit: () => {},
  children: null,
};
export default ModalSendMessage;
