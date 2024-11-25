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
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { MessageReaction } from "../../Shared/messageReaction/messageReaction";

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
  setMenu,
  isShowMenu,
  hiddenMenu,
  replyMessage,
  reply,
  reactions,
  setEmojiWindow,
  emojiWindow,
  onEmojiSelect,
  authUsers,
  onDestroyReaction,
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

  return (
    <>
      <div
        className={`${styles.message} ${sent ? styles.sent : styles.received}`}
        onMouseLeave={hiddenMenu}
      >
        <img
          className={styles.messageAvatar}
          src={avatar}
          alt={"avatar user"}
        />

        {onlyText && (
          <div className={styles.messageBubbleText}>
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

        {!text && photos && (
          <div className={styles.messageBublePhoto}>
            <ReplyMessage reply={reply} />
            <MessagePhoto
              photos={photos}
              modalPhoto={modalPhoto}
              photoData={photoData}
            />

            <div className={styles.bubbleTimeWrapPhoto}>
              <MessageReaction
                reactions={reactions}
                avatar={avatar}
                authUsers={authUsers}
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
              <MessageFooter
                time={time}
                reactions={reactions}
                avatar={avatar}
                onDestroyReaction={onDestroyReaction}
              />
              <ReplyMessage style={{ display: "block" }} reply={reply} />
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
                time={time}
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
          />
        </div>
      </div>
    </>
  );
}
