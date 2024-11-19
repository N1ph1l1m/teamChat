import React from "react";
import styles from "../../App/Styles/message.module.css";
import Picker from "emoji-picker-react";
import { IoIosShareAlt } from "react-icons/io";
import { IoIosMore } from "react-icons/io";
import { IoArrowUndoSharp , IoArrowRedoSharp  , IoCheckmarkCircleOutline } from "react-icons/io5";
import Icon from "../icon/icon";
import { DownloadFileTypeIcons } from "../FileTypeIcons/downloadFileTypeIcons";
import { MdOutlineEmojiEmotions } from "react-icons/md";
import { getData } from "../../Entities/api/getUserList";
import ReplyMessage from "../ReplyMessage/ReplyMessage";
export const HeaderName = ({ username }) => {
  return(
    <div className={styles.bubbleNameWrap}>
    <span className={styles.bubbleNameText}>{username}</span>
  </div>
  )

};
const ItemTime = ({ time }) => {
return(
 <div className={styles.bubbleTimeWrap}>
    <span className={styles.bubbleTimeText}>{time}</span>
  </div>
)
};





const ShowMenu = ({ menu }) => {
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

 export const ShowDocuments = ({ documents }) => {
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
              <span style={{color:'black'}}>{document.name}</span>
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
       <ReplyMessage reply={reply} />
          <p>{text}</p>
          <ItemTime time={time} />
        </div>
      )}

      {onlyDocuments && (
        <div className={styles.messageBubbleDocuments}>
          <HeaderName username={username} />
          <ReplyMessage reply={reply}  />
          <ShowDocuments documents={documents}/>
          <ItemTime time={time} />
        </div>
      )}




      {TextDocuments && (
        <div className={styles.messageBubbleDocuments}>
          <HeaderName username={username} />
          <ReplyMessage reply={reply}  />
          <ShowDocuments documents={documents} />
          <span> {text}</span>
          <ItemTime time={time} />
        </div>
      )}

      {!text && photos && (
        <div className={styles.messageBublePhoto}>
        <ReplyMessage reply={reply}/>
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
            <ReplyMessage reply={reply}/>
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
          <ReplyMessage reply={reply}/>
            <span>{text}</span>
            <ItemTime time={time} />
          </div>
        </div>
      )}
      <Picker open={isOpenReactions} reactionsDefaultOpen={true} />
      <div className={styles.replyToMessageButton}>
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
