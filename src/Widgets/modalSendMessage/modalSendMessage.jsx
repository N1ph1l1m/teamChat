import React from "react";
import Portal from "../modalCreateGroup/portal";
import PropTypes from "prop-types";
import styles from "../../App/Styles/modalSendMessage.module.css";
import Icon from "../../Shared/icon/icon";
import { IoSend } from "react-icons/io5";
import { IoIosClose } from "react-icons/io";
import { MdOutlineEmojiEmotions } from "react-icons/md";
import ProgressBar from "../../Shared/progressBar/progressBar";
import EmojiPicker from "emoji-picker-react";
import { FaRegTrashAlt } from "react-icons/fa";
import {InputFileTypeIcons} from "../../Shared/FileTypeIcons/downloadFileTypeIcons";


const ModalSendMessage = ({
  title,
  isOpen,
  onCancel,
  onSubmit,
  image,
  input,
  inputValue,
  keyDownSend,
  isOpenEmoji,
  openEmoji,
  emojiEvent,
  progressBar,
  removeElement,
}) => {

  return (
    <>
      {isOpen && (
        <Portal>
          <div className={styles.modalOverlay}>
            <div className={styles.modalWrap}>
              <div className={styles.emojiWrap} onClick={openEmoji}>
                <EmojiPicker
                  open={isOpenEmoji}
                  width={300}
                  height={300}
                  searchDisabled={true}
                  onEmojiClick={emojiEvent}
                  skinTonesDisabled={true}
                />
              </div>
              <div className={styles.modalHeader}>
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
                    {Array.isArray(image) && image.length > 0
                      ? image.map((img, index) => (
                          <div key={index} className={styles.inputWrapFiles}>
                            {InputFileTypeIcons(img, index)}
                            <ProgressBar value={progressBar} />
                            <FaRegTrashAlt
                              size="30"
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
