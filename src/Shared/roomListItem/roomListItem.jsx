import React from "react";
import styles from "../../App/Styles/roomListItem.module.css";
import Icon from "../icon/icon";
import IsRead from "../isRead/isRead";

function RoomListItem({
  click,
  tittle,
  icon,
  text,
  time,
  is_read,
  user,
  authUser,
  photo,
  document,
  forwarded_messages,
}) {
  const HeaderTime = () => {
    const isRead =
      user.username === authUser ? <IsRead isRead={is_read} size={15} /> : null;
    const timeMessage = time ? time.substring(11, 16) : null;
    return (
      <>
        {isRead ? (
          <div className={styles.headerTime}>
            {isRead}
            <p className={styles.timeMessage}>{timeMessage}</p>
          </div>
        ) : (
          <div style={{ width: "30px" }} className={styles.headerTime}>
            <p className={styles.timeMessage}>{timeMessage}</p>
          </div>
        )}
      </>
    );
  };
  const isPhoto = Array.isArray(photo);
  const isDocument = Array.isArray(document);
  const isForwardMessage = Array.isArray(forwarded_messages);

  const isPhotoNull = Array.isArray(photo) && photo.length === 0;
  const isDocumentNull = Array.isArray(document) && document.length === 0;
  const isForwardMessageNull =
    Array.isArray(forwarded_messages) && forwarded_messages.length === 0;

  const textRender =
    text && isPhotoNull && isDocumentNull && isForwardMessageNull;

  const photoRender =
    !text &&
    isPhoto &&
    photo.length > 0 &&
    isDocumentNull &&
    isForwardMessageNull;

  const documentRender =
    !text &&
    isPhotoNull &&
    isDocument &&
    document.length > 0 &&
    isForwardMessageNull;

  const forwardRender =
    !text &&
    isPhotoNull &&
    isDocumentNull &&
    isForwardMessage &&
    forwarded_messages.length > 0;

  const simpleItem =
    !text && isPhotoNull && isDocumentNull && isForwardMessageNull;

  return (
    <>
      <div onClick={click} className={styles.wrap}>
        <div className={styles.icon}>
          <Icon> {icon}</Icon>
        </div>

        {simpleItem && <p className={styles.simpleTittle}>{tittle}</p>}

        {textRender && (
          <div className={styles.titleText}>
            <div className={styles.headerTitle}>
              <p className={styles.tittle}>{tittle}</p>
              <HeaderTime />
            </div>
            <p className={styles.textMessage}>{text}</p>
          </div>
        )}

        {photoRender && (
          <div className={styles.titleText}>
            <div className={styles.headerTitle}>
              <p className={styles.tittle}>{tittle}</p>
              <HeaderTime />
            </div>
            <p className={styles.textMessage}>Фотография</p>
          </div>
        )}

        {documentRender && (
          <div className={styles.titleText}>
            <div className={styles.headerTitle}>
              <p className={styles.tittle}>{tittle}</p>
              <HeaderTime />
            </div>
            <p className={styles.textMessage}>Документ</p>
          </div>
        )}

        {forwardRender && (
          <div className={styles.titleText}>
            <div className={styles.headerTitle}>
              <p className={styles.tittle}>{tittle}</p>
              <HeaderTime />
            </div>
            <p className={styles.textMessage}>Пересланное сообщение </p>
          </div>
        )}
      </div>
    </>
  );
}

export default RoomListItem;
