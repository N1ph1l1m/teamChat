import React from "react";
import Portal from "../modalCreateGroup/portal";
import PropTypes from "prop-types";

import styles from "../../App/Styles/modalSendMessage.module.css";
import Icon from "../../Shared/icon/icon";
import Button from "../../Shared/button/button";
import { IoSend } from "react-icons/io5";
import { IoIosClose } from "react-icons/io";

const ModalSendMessage = ({
  title,
  isOpen,
  onCancel,
  onSubmit,
  image,
  input,
  inputValue,
}) => {
  return (
    <>
      {isOpen && (
        <Portal>
          <div className={styles.modalOverlay}>
            <div className={styles.modalWrap}>
              <Icon>
                <IoIosClose
                  className={styles.closeModel}
                  onClick={onCancel}
                  color="white"
                  size="35"
                />
              </Icon>
              <div className={styles.modalBody}>
                <div className={styles.wrapContentModal}>
                  <img src={image} alt="img" />
                  <div className={styles.inputWrap}>
                    <textarea
                      placeholder="Type your message"
                      value={inputValue}
                      onChange={input}
                    />{" "}
                    <Icon>
                      <IoSend onClick={onSubmit} color="gray" size="25" />
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
