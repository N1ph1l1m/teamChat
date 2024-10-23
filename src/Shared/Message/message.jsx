import React from "react";
import styles from "../../App/Styles/message.module.css";
import Icon from "../icon/icon";
import { FaRunning } from "react-icons/fa";
import Picker from 'emoji-picker-react';

export default function Message({
  text,
  avatar,
  sent,
  time,
  username,
  photos,
  modalPhoto,
  photoData,
  reactionMessage,
  isOpenReactions,
}) {
  function showPhoto() {
    if (photos === null || (Array.isArray(photos) && photos.length === 0)) {
      return null;
    }
    if (photos.length === 1) {
      return (
        <>
          <div className={styles.wrapPhoto}>
            {photos.map((photo, index) => (
              // eslint-disable-next-line jsx-a11y/img-redundant-alt
              <img
                key={index}
                className={styles.photoMessage}
                src={photo}
                alt={`message photo ${index}`}
                onClick={() =>
                  modalPhoto({photoData:photoData, id:index})
                }
              />
            ))}
          </div>
        </>
      );
    } else if (photos.length === 2) {
      return (
        <>
          <div className={styles.wrapPhotoTwo}>
            {photos.map((photo, index) => (
              // eslint-disable-next-line jsx-a11y/img-redundant-alt
              <img
                key={index}
                src={photo}
                className={styles.photoMessageTwoPhoto}
                alt={`message photo ${index + 1}`}
                  onClick={() =>
                  modalPhoto({photoData:photoData, id:index})
                }
              />
            ))}
          </div>
        </>
      );
    } else if (photos.length % 2 === 0) {
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
                onClick={() =>
                  modalPhoto({photoData:photoData, id:index})
                }
              />
            ))}
          </div>
        </>
      );
    } else if (photos.length % 2 !== 0) {
      return (
        <>
          <div className={styles.wrapPhotoOdd}>
            {photos.map((photo, index) => (
              // eslint-disable-next-line jsx-a11y/img-redundant-alt
              <img
                key={index}
                className={styles.photoMessageOdd}
                src={photo}
                alt={`message photo ${index + 1}`}
                onClick={() =>
                  modalPhoto({photoData:photoData, id:index})
                }
              />
            ))}
          </div>
        </>
      );
    } else {
      return null;
    }
  }
  const photoRender = showPhoto();
  return (
    <div
      className={`${styles.message} ${sent ? styles.sent : styles.received}`}
      onClick={reactionMessage}
    >
      <img className={styles.messageAvatar} src={avatar} alt={"avatar user"} />

      {text && Array.isArray(photos) && photos.length === 0 && (
        <div
        className={styles.messageBubbleText}

        >
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
          <div className={styles.bubbleTextOne}>
            <span>{text}</span>
            <div className={styles.bubbleTimeWrap}>
              <span className={styles.bubbleTimeText}>{time}</span>
            </div>
          </div>
        </div>
      )}

      {text && Array.isArray(photos) && photos.length > 1 && (
        <div className={styles.messageBubbleAll}>
          <div className={styles.bubbleNameWrap}>
            <span className={styles.bubbleNameText}>{username}</span>
          </div>
          {photoRender}
          <div className={styles.bubbleText}>
            <span>{text}</span>
            <div className={styles.bubbleTimeWrap}>
              <span className={styles.bubbleTimeText}>{time}</span>
            </div>
          </div>
        </div>
      )}
      <Picker open={isOpenReactions} reactionsDefaultOpen={true}
      />
    </div>
  );
}
