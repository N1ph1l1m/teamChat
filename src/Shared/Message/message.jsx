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
}) {
  function showPhoto() {
    if (photos === null || (Array.isArray(photos) && photos.length === 0)) {
      return null; // Возвращаем null, если photos null или пустой массив
    }

    if (!Array.isArray(photos)) {
      return (
        <div className={styles.wrapPhoto}>
          <img
            className={styles.photoMessage}
            src={photos}
            alt={`message photo `}
          />
        </div>
      );
    } else {
      if (photos.length === 1) {
        return (
          <>
            <div className={styles.wrapPhoto}>
              {photos.map((photo, index) => (
                // eslint-disable-next-line jsx-a11y/img-redundant-alt
                <img
                  key={index}
                  className={styles.photoMessageOne}
                  src={photo}
                  alt={`message photo ${index}`}
                />
              ))}
            </div>
          </>
        );
      } else if (photos.length === 3) {
        return (
          <>
            <div className={styles.wrapPhoto}>
              {photos.map((photo, index) => (
                // eslint-disable-next-line jsx-a11y/img-redundant-alt
                <img
                  key={index}
                  className={styles.photoMessage3}
                  src={photo}
                  alt={`message photo ${index + 1}`}
                />
              ))}
            </div>
          </>
        );
      } else if (photos.length > 0) {
        return (
          <>
            <div className={styles.wrapPhoto}>
              {photos.map((photo, index) => (
                // eslint-disable-next-line jsx-a11y/img-redundant-alt
                <img
                  key={index}
                  className={styles.photoMessage}
                  src={photo}
                  alt={`message photo ${index + 1}`}
                />
              ))}
            </div>
          </>
        );
      } else {
        return null;
      }
    }
  }
  const photoRender = showPhoto();
  return (
    <div
      className={`${styles.message} ${sent ? styles.sent : styles.received}`}
    >
      <img className={styles.messageAvatar} src={avatar} alt={"avatar user"} />
      <div className={styles.messageBubble}>
        <div className={styles.bubbleNameWrap}>
          <span className={styles.bubbleNameText}>{username}</span>{" "}
        </div>

        <div className={styles.bubbleText}>{text}</div>
        {photoRender}
      
        <div className={styles.bubbleTimeWrap}>
          <span className={styles.bubbleTimeText}>{time}</span>{" "}
        </div>
      </div>
    </div>
  );
}
