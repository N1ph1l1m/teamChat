import React from "react";
import styles from "../../App/Styles/roomListItem.module.css";
import Icon from "../icon/icon";
import IsRead from "../isRead/isRead";
import { BiSolidMessageRounded } from "react-icons/bi";

export function RoomListItem({
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
  simple,
  status,
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
          <div style={{ width: "42px" }} className={styles.headerTime}>
            <p className={styles.timeMessage}>{timeMessage}</p>
          </div>
        )}
      </>
    );
  };

  const HeaderList = ({ text }) => {
    const newMessage = user.username !== authUser && !is_read;
    return (
      <>
        {
          <div className={styles.titleText}>
            <div className={styles.headerTitle}>
              <p className={styles.title}> {tittle}</p>

              <HeaderTime />
            </div>
            <div
              className={styles.textWrap}
              style={{
                backgroundColor: newMessage
                  ? "rgba(128, 128, 128, 0.507)"
                  : null,
              }}
            >
              <p className={styles.textMessage}>{text}</p>
              {newMessage ? (
                <Icon style={{ display: "inline-block" }}>
                  <BiSolidMessageRounded
                    size="20"
                    color="rgba(0, 0, 255, 0.646)"
                  />
                </Icon>
              ) : null}
            </div>
          </div>
        }
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

  const textPhoto =
    text &&
    isPhoto &&
    photo.length > 0 &&
    isDocumentNull &&
    isForwardMessageNull;

  const textDocuments =
    text &&
    isPhotoNull &&
    isDocument &&
    document.length > 0 &&
    isForwardMessageNull;

  const photoRender =
    !text &&
    isPhoto &&
    photo.length > 0 &&
    isDocumentNull &&
    isForwardMessageNull;

  const textForward =
    text &&
    isPhotoNull &&
    isDocumentNull &&
    isForwardMessage &&
    forwarded_messages.length > 0;

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
            {status ? <div className={styles.status}></div> : null}
          <Icon > {icon}</Icon>
        </div>

        {simpleItem && <p className={styles.simpleTittle}>{tittle}</p>}

        {textRender && <HeaderList text={text} />}

        {textPhoto && <HeaderList text={text} />}

        {textDocuments && <HeaderList text={text} />}

        {photoRender && (
          <HeaderList
            text={isPhoto && photo.length > 1 ? "Фотографии" : "Фотография"}
          />
        )}

        {documentRender && (
          <HeaderList
            text={isDocument && document.length > 1 ? "Документы" : "Документ"}
          />
        )}

        {forwardRender && <HeaderList text="Пересланное сообщение" />}

        {textForward && <HeaderList text="Пересланное сообщение" />}
      </div>
    </>
  );
}

export const SimpleItem = () => {
  return (
    <>
      <div className={styles.wrap}>
        <div className={styles.simpleIcon}></div>
        <div className={styles.simpleWrapText}>
          <div className={styles.simpleTittleItem}></div>
          <div className={styles.simpleTextItem}></div>
        </div>
      </div>
    </>
  );
};
