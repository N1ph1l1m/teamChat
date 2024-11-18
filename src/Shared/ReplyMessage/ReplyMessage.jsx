import React from "react";
import styles from "../../App/Styles/replyMessage.module.css"
import { HeaderName , ShowDocuments } from "../Message/message";


export default  function ReplyMessage({reply}){
    const autUsr = localStorage.getItem("username");
    const replyText =
    reply && reply.reply_to && reply.reply_to.text &&
    (!Array.isArray(reply.reply_to.images) || reply.reply_to.images.length === 0) &&
    (!Array.isArray(reply.reply_to.documents) || reply.reply_to.documents.length === 0);

const replyTextPhoto =
    reply && reply.reply_to && reply.reply_to.text &&
    Array.isArray(reply.reply_to.images) && reply.reply_to.images.length > 0 &&
    (!Array.isArray(reply.reply_to.documents) || reply.reply_to.documents.length === 0);

const replyPhoto =
    reply && reply.reply_to && !reply.reply_to.text &&
    Array.isArray(reply.reply_to.images) && reply.reply_to.images.length > 0;

const replyDocumentsOnly =
    reply && reply.reply_to &&
    Array.isArray(reply.reply_to.documents) && reply.reply_to.documents.length > 0 &&
    (!reply.reply_to.text || reply.reply_to.text === "") &&
    (!Array.isArray(reply.reply_to.images) || reply.reply_to.images.length === 0);



    return(
        <>

{replyText && (
    <div key={reply.id}>
    <div className={styles.replyMessageWrap} >
    <HeaderName username={reply.reply_to.user.username}/>
    <span>{reply.reply_to.text}</span>
    </div>
    </div>
)}

{replyTextPhoto &&(
    <div className={styles.replyMessageWrapTextPhoto}>

            {Array.isArray(reply.reply_to.images) && reply.reply_to.images.length > 0  && (
                // eslint-disable-next-line jsx-a11y/img-redundant-alt
                <img
                  src={reply.reply_to.images[0].image}
                  alt="Reply Photo"
                />
              )}
              <div  className={styles.replyMessageTextPhotoTitle}>
              <HeaderName username={reply.reply_to.user.username}/>
              <span>{reply.reply_to.text}</span>
              </div>

      </div>
)}

{replyDocumentsOnly && (
    <div className={styles.replyMessageWrap}>

                <HeaderName username={reply.reply_to.user.username}/>
                <span>Документ</span>
        </div>
)}


{replyPhoto && (
        <div className={styles.replyMessageWrapTextPhoto}>

                {Array.isArray(reply.reply_to.images) && reply.reply_to.images.length > 0  && (
                    // eslint-disable-next-line jsx-a11y/img-redundant-alt
                    <img
                      src={reply.reply_to.images[0].image}
                      alt="Reply Photo"
                    />
                  )}
                  <div  className={styles.replyMessageTextPhotoTitle}>
                  <HeaderName username={reply.reply_to.user.username}/>
                  <span>Фотографии</span>
                  </div>

          </div>
)}





        </>
    )








}
