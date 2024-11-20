import React from "react";
import styles from "../../App/Styles/replyMessage.module.css";
import { DownloadFileTypeIcons } from "../../Shared/FileTypeIcons/downloadFileTypeIcons"
import { HeaderName } from "../../Shared/HeaderNameMessage/HeaderNameMessage";

export default function ReplyMessage({ reply }) {
  const autUsr = localStorage.getItem("username");

  const hasReply = reply && reply.reply_to;
  const hasText = hasReply && reply.reply_to.text;
  const hasImages =
    hasReply &&
    Array.isArray(reply.reply_to.images) &&
    reply.reply_to.images.length > 0;
  const hasDocuments =
    hasReply &&
    Array.isArray(reply.reply_to.documents) &&
    reply.reply_to.documents.length > 0;

  const replyText = hasText && !hasImages && !hasDocuments;
  const replyTextPhoto = hasText && hasImages && !hasDocuments;
  const replyPhoto = !hasText && hasImages && !hasDocuments;
  const replyDocumentsText = hasText && !hasImages && hasDocuments;
  const replyDocuments = !hasText && !hasImages && hasDocuments;
  return (
    <>
      {replyText && (
        <div key={reply.id}>
          <div className={styles.replyMessageWrap}>
            <HeaderName username={reply.reply_to.user.username} />
            <span>{reply.reply_to.text}</span>
          </div>
        </div>
      )}

      {replyTextPhoto && (
        <div className={styles.replyMessageWrapTextPhoto}>
          <img
            src={reply.reply_to.images[0].image}
            className={styles.replyMessageTexPhotoImg}
            alt=""
          />
          <div className={styles.replyMessageTextPhotoTitle}>
            <HeaderName username={reply.reply_to.user.username} />
            <span>{reply.reply_to.text}</span>
          </div>
        </div>
      )}

      {replyPhoto && (
        <div className={styles.replyMessageWrapTextPhoto}>
          {Array.isArray(reply.reply_to.images) &&
            reply.reply_to.images.length === 1 &&
                <>
                    <img
              src={reply.reply_to.images[0].image}
              className={styles.replyMessageTexPhotoImg}
              alt=""
            />
             <div className={styles.replyMessageTextPhotoTitle}>
            <HeaderName username={reply.reply_to.user.username} />
            <span>Фотография</span>
          </div>
                </>

          }
          {Array.isArray(reply.reply_to.images) &&
            reply.reply_to.images.length > 1 &&
                <>
                    <img
              src={reply.reply_to.images[0].image}
              className={styles.replyMessageTexPhotoImg}
              alt=""
            />
             <div className={styles.replyMessageTextPhotoTitle}>
            <HeaderName username={reply.reply_to.user.username} />
            <span>Фотографии</span>
          </div>
                </>

          }

        </div>
      )}

      {replyDocuments && (
        <div className={styles.replyMessageWrap}>
          <HeaderName username={reply.reply_to.user.username} />
          {Array.isArray(reply.reply_to.documents) &&
            reply.reply_to.documents.length === 1 &&
            <div className={styles.replyDocumentsItems}>
            {DownloadFileTypeIcons(reply.reply_to.documents[0].name)}
            <span>{reply.reply_to.documents[0].name}</span>
            </div>
            }

          {Array.isArray(reply.reply_to.documents) &&
            reply.reply_to.documents.length > 1 && <span>Документы</span>}
        </div>
      )}

      {replyDocumentsText && (
        <div className={styles.replyMessageWrap}>
          <HeaderName username={reply.reply_to.user.username} />
          {Array.isArray(reply.reply_to.documents) &&
            reply.reply_to.documents.length === 1 &&
            <div className={styles.replyDocumentsItems}>
            {DownloadFileTypeIcons(reply.reply_to.documents[0].name)}
            <span>{reply.reply_to.documents[0].name}</span>
            </div>
            }
          {Array.isArray(reply.reply_to.documents) &&
            reply.reply_to.documents.length > 1 && <span>Документы</span>}
          <span>{reply.reply_to.text}</span>
        </div>
      )}
    </>
  );
}
