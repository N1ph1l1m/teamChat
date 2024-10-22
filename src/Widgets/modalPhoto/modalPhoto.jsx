import React from "react";
import Portal from "../modalCreateGroup/portal";
import PropTypes from "prop-types";

import styles from "../../App/Styles/modalPhoto.module.css";
import Icon from "../../Shared/icon/icon";
import Button from "../../Shared/button/button";
import { IoSend } from "react-icons/io5";
import { IoIosClose } from "react-icons/io";

const ModalPhoto = ({
   title,
  isOpen,
  onCancel,
  onSubmit,
  image,
  input,
  inputValue,
  nextPhoto,
  prevPhoto,
}) => {
  return (
    <>
      {isOpen && (
        <Portal>
          <div className={styles.modalOverlay}>
          <Icon>
                <IoIosClose
                  className={styles.closeModel}
                  onClick={onCancel}
                  color="rgb(116, 116, 116)"
                  size="50"
                />
              </Icon>
            <div className={styles.modalWrap}>
            <button onClick={()=> nextPhoto()}>+</button>
              <img  className={styles.modalPhoto} src={image} alt="img" />
              <button onClick={()=> prevPhoto()}>-</button>
            </div>
          </div>
        </Portal>
      )}
    </>
  );
};

ModalPhoto.propTypes = {
  title: PropTypes.string,
  isOpen: PropTypes.bool,
  onCancel: PropTypes.func,
  onSubmit: PropTypes.func,
  children: PropTypes.node,
};

ModalPhoto.defaultProps = {
  title: "Modal title",
  isOpen: false,
  onCancel: () => {},
  onSubmit: () => {},
  children: null,
};
export default ModalPhoto;
