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
import { FaRegTrashAlt, FaFilePdf, FaFileWord , FaFileExcel  } from "react-icons/fa";
import { SiMicrosoftword , SiMicrosoftexcel , SiMicrosoftpowerpoint } from "react-icons/si";
import { FaFile } from "react-icons/fa";
import { BiSolidFileTxt } from "react-icons/bi";
import { GrDocumentZip  ,  GrDocumentRtf} from "react-icons/gr";
import { BsFiletypeExe } from "react-icons/bs";


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
  type,
}) => {
  function rendeerFiles(img, index) {
    switch (img.type) {
      case "image/png":
        // eslint-disable-next-line no-lone-blocks
        {
          return <img src={img.content} alt={`image-${index}`} />;
        }
        break;
      case "text/plain":
        // eslint-disable-next-line no-lone-blocks
        {
          return (
            <Icon>
              <BiSolidFileTxt color="black" size="40" />
            </Icon>
          );
        }
        break;
      case "application/x-zip-compressed": //zip
        // eslint-disable-next-line no-lone-blocks
        {
          return (
            <Icon>
              <GrDocumentZip color="black" size="40" />
            </Icon>
          );
        }
        break;
      case "application/pdf": //pdf
        // eslint-disable-next-line no-lone-blocks
        {
          return (
            <Icon>
              <FaFilePdf color="black" size="40" />
            </Icon>
          );
        }
        break;
        case 'application/msword': //doc
        // eslint-disable-next-line no-lone-blocks
        {
          return (
            <Icon>
              <SiMicrosoftword color="black" size="40" />
            </Icon>
          );
        }
        break;
      case "application/vnd.openxmlformats-officedocument.wordprocessingml.document" : //docx
        // eslint-disable-next-line no-lone-blocks
        {
          return (
            <Icon>
              <SiMicrosoftword color="black" size="40" />
            </Icon>
          );
        }
        break;
        case "application/vnd.ms-excel": //xls
        // eslint-disable-next-line no-lone-blocks
        {
          return (
            <Icon>
              <SiMicrosoftexcel color="black" size="40" />
            </Icon>
          );
        }
        case "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": //xlsx
        // eslint-disable-next-line no-lone-blocks
        {
          return (
            <Icon>
              <SiMicrosoftexcel color="black" size="40" />
            </Icon>
          );
        }


        break;
        case "application/vnd.ms-powerpoint": //ppt
        // eslint-disable-next-line no-lone-blocks
        {
          return (
            <Icon>
              <SiMicrosoftpowerpoint color="black" size="40" />
            </Icon>
          );
        }
        break;
        case "application/vnd.openxmlformats-officedocument.presentationml.presentation": //pptx
        // eslint-disable-next-line no-lone-blocks
        {
          return (
            <Icon>
              <SiMicrosoftpowerpoint color="black" size="40" />
            </Icon>
          );
        }
        break;
        case "application/x-msdownload":
          {
            return (
              <Icon>
                <BsFiletypeExe color="black" size="40" />
              </Icon>
            );
          }

      default:

    }
    let a  = ".zip, .exe, ";
  }

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
                            {rendeerFiles(img, index)}
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
