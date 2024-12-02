import React from "react";
import styles from "../../App/Styles/message.module.css";
// import Picker from "emoji-picker-react";
import { IoIosMore } from "react-icons/io";
import { IoArrowUndoSharp } from "react-icons/io5";
import Icon from "../../Shared/icon/icon";
import { MessageMenu } from "../../Shared/menuMessage/menuMessage";
import ReplyMessage from "../ReplyMessage/ReplyMessage";
import { HeaderName } from "../../Shared/HeaderNameMessage/HeaderNameMessage";
import { MessageFooter } from "../MessageFooter/MessageFooter";
import { MessagePhoto } from "../../Shared/messagePhoto/messagePhoto";
import { MessageDocuments } from "../../Shared/messageDocuments/messageDocuments";
import ForwardMessage from "../../Shared/ForwardMessage/ForwardMessage";


export default function Message({
  messageId,
  text,
  avatar,
  sent,
  time,
  username,
  photos,
  documents,
  modalPhoto,
  photoData,
  setMenu,
  isShowMenu,
  hiddenMenu,
  replyMessage,
  reply,
  forwardMessage,
  reactions,
  setEmojiWindow,
  emojiWindow,
  onEmojiSelect,
  authUsers,
  onDestroyReaction,
  onSelectMessage,
}) {
  const isForwardMessage = forwardMessage && forwardMessage.forwarded_messages;

  const isPhotoNull = Array.isArray(photos) && photos.length === 0;

  const isDocumentNull = Array.isArray(documents) && documents.length === 0;

  const isForwardMessageNull = Array.isArray(isForwardMessage) && isForwardMessage.length === 0;

  const onlyText = text && isPhotoNull && isDocumentNull && isForwardMessage;

  const isForwardMessageArray =  Array.isArray(forwardMessage.forwarded_messages) &&  forwardMessage.forwarded_messages.length > 0;

  const onlyForward =  isForwardMessage && isForwardMessageArray && !text && isPhotoNull && isDocumentNull;

  const onlyDocuments = !text && Array.isArray(documents) && documents.length > 0;

   const TextDocuments = text && Array.isArray(documents) && documents.length > 0;

  return (
    <>
      <div
        className={`${styles.message} ${sent ? styles.sent : styles.received}`}
        onMouseLeave={hiddenMenu}
        // onClick={messageId}
      >
        <img
          className={styles.messageAvatar}
          src={avatar}
          alt={"avatar user"}
        />

        {onlyForward && (
          <div className={styles.messageBubbleText}>
            <ForwardMessage
              forwardMessage={forwardMessage}
              photos={forwardMessage?.forwarded_messages?.flatMap((msg) =>
                        msg.original_message?.images?.map((image) => image.image) || [])
                      }

            modalPhoto={modalPhoto}
            photoData={photoData}
            />
            <MessageFooter
              time={time}
              reactions={reactions}
              avatar={avatar}
              onDestroyReaction={onDestroyReaction}
            />
          </div>
        )}

        {onlyText && (
          <div className={styles.messageBubbleText}>
            <HeaderName username={username} />
            <ReplyMessage reply={reply} />
            <p>{text}</p>
            <MessageFooter
              time={time}
              reactions={reactions}
              avatar={avatar}
              onDestroyReaction={onDestroyReaction}
            />
          </div>
        )}

        {onlyDocuments && (
          <div className={styles.messageBubbleDocuments}>
            <HeaderName username={username} />
            <ReplyMessage reply={reply} />
            <MessageDocuments documents={documents} />
            <MessageFooter
              time={time}
              reactions={reactions}
              avatar={avatar}
              onDestroyReaction={onDestroyReaction}
            />
          </div>
        )}

        {TextDocuments && (
          <div className={styles.messageBubbleDocuments}>
            <HeaderName username={username} />
            <ReplyMessage reply={reply} />
            <MessageDocuments documents={documents} />
            <p> {text}</p>
            <MessageFooter
              time={time}
              reactions={reactions}
              avatar={avatar}
              onDestroyReaction={onDestroyReaction}
            />
          </div>
        )}

        {!text &&  Array.isArray(documents) &&
          documents.length === 0  &&  isForwardMessageNull  && photos && (
          <div className={styles.messageBublePhoto}>
            <ReplyMessage reply={reply} />
            <MessagePhoto
              photos={photos}
              modalPhoto={modalPhoto}
              photoData={photoData}
            />

            <div className={styles.bubbleTimeWrapPhoto}>
              <MessageFooter
                reactions={reactions}
                avatar={avatar}
                onDestroyReaction={onDestroyReaction}
              />
              <span className={styles.bubbleTimeTextPhoto}>{time}</span>
            </div>
          </div>
        )}

        {text && Array.isArray(photos) && photos.length === 1 && (
          <div className={`${styles.messageBubbleAll} ${styles.one}`}>
            <HeaderName username={username} />
            <MessagePhoto
              photos={photos}
              modalPhoto={modalPhoto}
              photoData={photoData}
            />
            <div className={styles.bubbleText} style={{ width: "300px" }}>
              <p>{text}</p>
              <ReplyMessage style={{ display: "block" }} reply={reply} />
              <MessageFooter
                time={time}
                reactions={reactions}
                avatar={avatar}
                onDestroyReaction={onDestroyReaction}
              />
            </div>
          </div>
        )}

        {text && Array.isArray(photos) && photos.length > 1 && (
          <div className={styles.messageBubbleAll}>
            <HeaderName username={username} />
            <MessagePhoto
              photos={photos}
              modalPhoto={modalPhoto}
              photoData={photoData}
            />
            <div className={styles.bubbleText}>
              <ReplyMessage reply={reply} />
              <p>{text}</p>
              <MessageFooter
                reactions={reactions}
                avatar={avatar}
                onDestroyReaction={onDestroyReaction}
              />
            </div>
          </div>
        )}

        <div className={styles.replyToMessageButton}>
          <Icon>
            <IoArrowUndoSharp
              color="rgb(117, 117, 117)"
              size="20"
              onClick={replyMessage}
            />
            <IoIosMore color="rgb(117, 117, 117)" size="20" onClick={setMenu} />
          </Icon>
          <MessageMenu
            authUsers={authUsers}
            menu={isShowMenu}
            setEmojiWindow={setEmojiWindow}
            emojiWindow={emojiWindow}
            onEmojiSelect={onEmojiSelect}
            onSelectMessage={onSelectMessage}
          />
        </div>
      </div>
    </>
  );
}
