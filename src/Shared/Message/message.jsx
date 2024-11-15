import React from "react";
import styles from "../../App/Styles/message.module.css";
import Picker from "emoji-picker-react";
import { IoIosShareAlt } from "react-icons/io";
import { IoIosMore } from "react-icons/io";
import { IoArrowUndoSharp , IoArrowRedoSharp  , IoCheckmarkCircleOutline } from "react-icons/io5";
import Icon from "../icon/icon";
import { DownloadFileTypeIcons } from "../FileTypeIcons/downloadFileTypeIcons";
import { MdOutlineEmojiEmotions } from "react-icons/md";

const HeaderName = ({ username }) => (
  <div className={styles.bubbleNameWrap}>
    <span className={styles.bubbleNameText}>{username}</span>
  </div>
);
const ItemTime = ({ time }) => (
  <div className={styles.bubbleTimeWrap}>
    <span className={styles.bubbleTimeText}>{time}</span>
  </div>
);


const ShowMenu = ({ menu}) => {
    if(!menu) return null;
  return (
    <>
  <ul className={styles.moreMenu} >
      <li><IoArrowRedoSharp  color="rgb(117, 117, 117)"  size ="20" style={{marginRight:"4px"}}/><span>Переслать</span></li>
      <li><IoCheckmarkCircleOutline  color="rgb(117, 117, 117)"  size ="20" style={{marginRight:"4px"}}/><span>Выбрать</span></li>
      <li><MdOutlineEmojiEmotions  color="rgb(117, 117, 117)"  size ="20" style={{marginRight:"4px"}}/> <span>Реакция</span></li>
      </ul>
    </>
  )

};
const ShowPhoto = ({ photos, modalPhoto, photoData }) => {
  if (!Array.isArray(photos) || photos.length === 0) return null;

  let wrapClass = styles.wrapPhoto;
  let photoClass = styles.photoMessage;

  if (photos.length === 2) {
    wrapClass = styles.wrapPhotoTwo;
    photoClass = styles.photoMessageTwoPhoto;
  } else if (photos.length > 2 && photos.length % 2 === 0) {
    wrapClass = styles.wrapPhotoEven;
    photoClass = styles.photoMessageEven;
  } else if (photos.length > 2) {
    wrapClass = styles.wrapPhotoOdd;
    photoClass = styles.photoMessageOdd;
  }

  return (
    <div className={wrapClass}>
      {photos.map((photo, index) => (
        // eslint-disable-next-line jsx-a11y/img-redundant-alt
        <img
          key={`photo-${index}-${photo}`}
          src={photo}
          className={photoClass}
          alt={`message photo ${index + 1}`}
          onClick={() => modalPhoto({ photoData: photoData, id: index })}
        />
      ))}
    </div>
  );
};

const ShowDocuments = ({ documents }) => {
  if (!documents) return null;

  return (
    <>
      {documents.map((document, index) => (
        <div
          className={styles.documentHeaderWrap}
          key={`doc-${index}-${document.document}`}
        >
          {DownloadFileTypeIcons(document.name)}
          <div className={styles.documentTitleUpload}>
            <a
              key={index}
              href={`http://127.0.0.1:8000/chat/docs/${document.id}/${document.name}/`}
              download
              className={styles.documentTitle}
            >
              {document.name}
              <span className={styles.documentUpload}>Загрузить</span>
            </a>
          </div>
        </div>
      ))}
    </>
  );
};

export default function Message({
  text,
  avatar,
  sent,
  time,
  username,
  photos,
  documents,
  modalPhoto,
  photoData,
  reactionMessage,
  isOpenReactions,
  setMenu,
  isShowMenu,
  hiddenMenu,
  replyMessage,
  reply,
}) {
  const onlyText =
    text &&
    Array.isArray(photos) &&
    photos.length === 0 &&
    Array.isArray(documents) &&
    documents.length === 0;
  const onlyDocuments =
    !text && Array.isArray(documents) && documents.length > 0;
  const TextDocuments =
    text && Array.isArray(documents) && documents.length > 0;



  return (<>
<div
      className={`${styles.message} ${sent ? styles.sent : styles.received}`}
      onClick={reactionMessage}
      onMouseLeave={hiddenMenu}

    >
      <img className={styles.messageAvatar} src={avatar} alt={"avatar user"} />

      {onlyText && (
        <div className={styles.messageBubbleText}>
          <HeaderName username={username} />
          <p>{text}</p>

          {reply ? (
  <div key={reply.id}>
    <span>{reply.text}</span>
    {reply.reply_to && (
      <div>
        <span>Reply to: {reply.reply_to.text}</span> {/* Здесь выводится текст ответа */}
        <span>Reply ID: {reply.reply_to.id}</span>  {/* Здесь выводится ID ответа */}
      </div>
    )}
  </div>
) : (
  <span></span> // или другое сообщение, если нет ответов
)}
          <ItemTime time={time} />
        </div>
      )}

      {onlyDocuments && (
        <div className={styles.messageBubbleDocuments}>
          <HeaderName username={username} />
          <ShowDocuments documents={documents} />
          <ItemTime time={time} />
        </div>
      )}




      {TextDocuments && (
        <div className={styles.messageBubbleDocuments}>
          <HeaderName username={username} />
          <ShowDocuments documents={documents} />
          <span> {text}</span>
          <ItemTime time={time} />
        </div>
      )}

      {!text && photos && (
        <div className={styles.messageBublePhoto}>
          <ShowPhoto
            photos={photos}
            modalPhoto={modalPhoto}
            photoData={photoData}
          />
          <div className={styles.bubbleTimeWrapPhoto}>
            <span className={styles.bubbleTimeTextPhoto}>{time}</span>
          </div>
        </div>
      )}

      {text && Array.isArray(photos) && photos.length === 1 && (
        <div className={styles.messageBubbleAll}>
          <HeaderName username={username} />
          <ShowPhoto
            photos={photos}
            modalPhoto={modalPhoto}
            photoData={photoData}
          />
          <div className={styles.bubbleText} style={{ width: "300px" }}>
            <span>{text}</span>
            <ItemTime time={time} />
          </div>
        </div>
      )}

      {text && Array.isArray(photos) && photos.length > 1 && (
        <div className={styles.messageBubbleAll}>
          <HeaderName username={username} />
          <ShowPhoto
            photos={photos}
            modalPhoto={modalPhoto}
            photoData={photoData}
          />
          <div className={styles.bubbleText}>
            <span>{text}</span>
            <ItemTime time={time} />
          </div>
        </div>
      )}
      <Picker open={isOpenReactions} reactionsDefaultOpen={true} />
      <div className={styles.replyToMessage}>
      <Icon>
      <IoArrowUndoSharp  color="rgb(117, 117, 117)"  size ="20" onClick={replyMessage}/>
      <IoIosMore   color="rgb(117, 117, 117)" size ="20" onClick={setMenu}/>
      </Icon>
      <ShowMenu menu={isShowMenu}/>
      </div>



    </div>

  </>

  );
}
