import React from "react";
import Portal from "./portal";
import PropTypes from "prop-types";
import styles from "../../App/Styles/modalCreateGroupChat.module.css";
import Button from "../../Shared/button/button";

const ModalCreateGroup = ({ title, isOpen, onCancel, onSubmit, children }) => {
  return (
    <>
      {isOpen && (
        <Portal>
          <div className={styles.modalOverlay}>
            <div className={styles.modalWrap}>
              <div className={styles.modalBody}>{children}</div>
              <div className={styles.modalFooter}>
                <Button
                  className={styles.modalButton}
                  onClick={onCancel}
                  invert
                >
                  Закрыть
                </Button>
                <Button className={styles.modalButton} onClick={onSubmit}>
                  Создать
                </Button>
              </div>
            </div>
          </div>
        </Portal>
      )}
    </>
  );
};

ModalCreateGroup.propTypes = {
  title: PropTypes.string,
  isOpen: PropTypes.bool,
  onCancel: PropTypes.func,
  onSubmit: PropTypes.func,
  children: PropTypes.node,
};

ModalCreateGroup.defaultProps = {
  title: "Modal title",
  isOpen: false,
  onCancel: () => {},
  onSubmit: () => {},
  children: null,
};
export default ModalCreateGroup;
