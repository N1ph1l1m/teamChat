import React from "react";
import Portal from "../modalCreateGroup/portal";
import PropTypes from "prop-types";
import styles from "../../App/Styles/modalSendMessage.module.css";
import Icon from "../../Shared/icon/icon";
import { IoSend } from "react-icons/io5";
import { IoIosClose } from "react-icons/io";
import { MdOutlineEmojiEmotions } from "react-icons/md";
import EmojiPicker from "emoji-picker-react";

const ModalSendMessage = ({
  title,
  isOpen,
  onCancel,
  onSubmit,
  image,
  input,
  inputValue,
  isOpenEmoji,
  openEmoji,
  closeEmoji,
  emojiEvent,
}) => {
  return (
    <>
      {isOpen && (
        <Portal>
          <div className={styles.modalOverlay}>
            <div className={styles.modalWrap}>
              <div
                className={styles.emojiWrap}
                onMouseOver={openEmoji}
                onMouseLeave={closeEmoji}
              >
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
                    {Array.isArray(image) && image.length > 0 ? (
                      image.map((img, index) => (
                        // eslint-disable-next-line jsx-a11y/img-redundant-alt
                        <img key={index} src={img} alt={`image-${index}`} />
                      ))
                    ) : (
                      <img src={image} alt="img" />
                    )}
                  </div>

                  <div className={styles.inputWrap}>
                    <textarea
                      placeholder="Подпись"
                      value={inputValue}
                      onChange={input}
                    />{" "}
                    <Icon>
                      <MdOutlineEmojiEmotions
                        color="rgb(131, 130, 130)"
                        size="25"
                        onMouseOver={openEmoji}
                        onMouseLeave={closeEmoji}
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
