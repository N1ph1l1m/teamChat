import React from "react";
import Portal from "../modalCreateGroup/portal";
import PropTypes from "prop-types";
import styles from "../../App/Styles/modalPhoto.module.css";
import Icon from "../../Shared/icon/icon";
import { IoIosClose } from "react-icons/io";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";

const ModalPhoto = ({
  sizeGalary,
  isOpen,
  onCancel,
  image,
  nextPhoto,
  prevPhoto,
}) => {
  function renderPhoto() {
    if (sizeGalary && sizeGalary.length > 1) {
      return (
        <>
          {isOpen && (
            <Portal>
              <div className={styles.modalOverlay}>
                <Icon>
                  <IoIosClose
                    className={styles.closeModel}
                    onClick={onCancel}
                    color="rgb(199, 198, 198)"
                    size="50"
                  />
                </Icon>
                <Icon>
                  <IoIosArrowBack
                    size="50"
                    className={styles.arrowBack}
                    color="rgb(199, 198, 198)"
                    onClick={() => prevPhoto()}
                  />
                </Icon>
                <div className={styles.modalWrap}>
                  <img className={styles.modalPhoto} src={image} alt="img" />
                </div>
                <Icon>
                  <IoIosArrowForward
                    size="50"
                    color="rgb(199, 198, 198)"
                    className={styles.arrowForwad}
                    onClick={() => nextPhoto()}

                  />
                </Icon>
              </div>
            </Portal>
          )}
        </>
      );
    } else {
      return (
        <>
          {isOpen && (
            <Portal>
              <div className={styles.modalOverlay}>
                <Icon>
                  <IoIosClose
                    className={styles.closeModel}
                    onClick={onCancel}
                    color="rgb(199, 198, 198)"
                    size="50"
                  />
                </Icon>
                <div className={styles.modalWrap}>
                  <img className={styles.modalPhoto} src={image} alt="img" />
                </div>
              </div>
            </Portal>
          )}
        </>
      );
    }
  }
  const showPhoto = renderPhoto();
  return <>{showPhoto}</>;
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
