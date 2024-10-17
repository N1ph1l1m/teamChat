import React from "react";
import styles from "../../App/Styles/message.module.css";
import Icon from "../icon/icon";
import { FaRunning } from "react-icons/fa";

export default function Message({
  text,
  avatar,
  sent,
  time,
  username,
  photos,
  modalPhoto,
  photoData,
}) {
  function showPhoto() {
    if (photos === null || (Array.isArray(photos) && photos.length === 0)) {
      return null; // Возвращаем null, если photos null или пустой массив
    }
      if (photos.length === 1) {
        return (
          <>
            <div className={styles.wrapPhoto}>
              {photos.map((photo, index) => (
                <img
                  key={index}
                  className={styles.photoMessage}
                  src={photo}
                  alt={`message photo ${index}`}
                />
              ))}
            </div>
          </>
        );
      } else if (photos.length %2 === 0) {
        return (
          <>
            <div className={styles.wrapPhotoEven}>
              {photos.map((photo, index) => (
                // eslint-disable-next-line jsx-a11y/img-redundant-alt
                <img
                  key={index}
                  src={photo}
                  className={styles.photoMessageEven}
                  alt={`message photo ${index + 1}`}
                />
              ))}
            </div>
          </>
        );
      } else if (photos.length % 2 !== 0 ) {
        return (
          <>
            <div className={styles.wrapPhotoOdd}  >
              {photos.map((photo, index) => (
                // eslint-disable-next-line jsx-a11y/img-redundant-alt
                <img
                  key={index}
                  className={styles.photoMessageOdd}
                  src={photo}
                  alt={`message photo ${index + 1}`}

                />
              ))}

            </div>
          </>
        );
      }else {
        return null;
      }

  }
  const photoRender = showPhoto();
  return (
    <div
      className={`${styles.message} ${sent ? styles.sent : styles.received}`}
    >
      <img className={styles.messageAvatar} src={avatar} alt={"avatar user"} />

     {text && Array.isArray(photos) && photos.length === 0 && (
      <div className={styles.messageBubbleText}>
        <div className={styles.bubbleNameWrap}>
          <span className={styles.bubbleNameText}>{username}</span>
        </div>
        <span>{text}</span>
        <div className={styles.bubbleTimeWrap}>
          <span className={styles.bubbleTimeText}>{time}</span>
        </div>
      </div>
    )}


    {!text && photos && (
      <div className={styles.messageBublePhoto}>
        {photoRender}
        <div className={styles.bubbleTimeWrapPhoto}>
          <span className={styles.bubbleTimeTextPhoto}>{time}</span>
        </div>
      </div>
    )}

    {text && Array.isArray(photos) && photos.length === 1 && (
      <div className={styles.messageBubbleAll}>
        <div className={styles.bubbleNameWrap}>
          <span className={styles.bubbleNameText}>{username}</span>
        </div>
        {photoRender}
        <div className={styles.bubbleTextOne}>{text}
        <div className={styles.bubbleTimeWrap}>
          <span className={styles.bubbleTimeText}>{time}</span>
        </div>
        </div>
      </div>
    )}

    {text && Array.isArray(photos) && photos.length >1 && (
      <div className={styles.messageBubbleAll}>
        <div className={styles.bubbleNameWrap}>
          <span className={styles.bubbleNameText}>{username}</span>
        </div>
        {photoRender}
        <div className={styles.bubbleText}>{text}
        <div className={styles.bubbleTimeWrap}>
          <span className={styles.bubbleTimeText}>{time}</span>
        </div>
        </div>
      </div>
    )}
  </div>
  );
}
