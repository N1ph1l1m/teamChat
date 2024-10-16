import React from "react";
import Portal from "../modalCreateGroup/portal";
import PropTypes from "prop-types";
import {useState} from "react";
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
                {
      Array.isArray(image) && image.length > 0 ? (
        image.map((img, index) => (
          <img key={index} src={img} alt={`image-${index}`} />
        ))
      ) : (
        <img src={image} alt="img" />
      )
    }

                  <div className={styles.inputWrap}>
                    <textarea
                      placeholder="Подпись"
                      value={inputValue}
                      onChange={input}
                    />{" "}
                    <Icon>
                      <IoSend  onClick={onSubmit} color="rgb(116, 116, 116)" size="25" />
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
