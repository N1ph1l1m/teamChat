import React from "react";
import styles from "../../App/Styles/forwardMessags.module.css";
import { HeaderName } from "../HeaderNameMessage/HeaderNameMessage";
import { MessagePhoto } from "../messagePhoto/messagePhoto";
import { MessageDocuments } from "../messageDocuments/messageDocuments";

export default function ForwardMessage({
  forwardMessage,
  photoData,
}) {
  const forwwardBy = () => {
    if (
      !Array.isArray(forwardMessage?.forwarded_messages) ||
      forwardMessage.forwarded_messages.length === 0
    ) {
      return null;
    }
    const firstForward = forwardMessage.forwarded_messages.slice(0, 1);

    return (
      <>
        {firstForward.map((forward, index) => (
          <h4 className={styles.forwardMessageTitle} key={index}>Переслано от {forward.forwarded_by.username}</h4>
        ))}
      </>
    );
  };

  function dateText(data) {
    if (!data || typeof data !== "string") {
      console.error("Invalid date format:", data);
      return "";
    }
    const [datePart] = data.split(" ");

    if (!datePart) {
      console.error("Invalid date part:", data);
      return "";
    }
    const [day, month, year] = datePart.split("-");
    if (!day || !month || !year) {
      console.error("Invalid date format:", data);
      return "";
    }
    const formattedDate = `${year}-${month}-${day}`;
    const date = new Date(formattedDate);

    if (isNaN(date.getTime())) {
      console.error("Invalid date:", formattedDate);
      return "";
    }

    const monthName = date.toLocaleString("default", { month: "short" });
    return `${date.getDate()} ${monthName}`;
  }

  const header = (forward)=> {
    return (
    <>
  <div className={styles.forwardMessageHeader}>
                  <img
                    className={styles.forwardAvatar}
                    src={forward.original_message.user.photo}
                    alt={"avatarForward"}
                  />
                  <div className={styles.forwardHeaderWrapTitle}>
                    <HeaderName
                      username={forward.original_message.user.username}
                    />
                    <span className={styles.forwardTime}>
                      {dateText(forward.original_message.created_at_formatted)}{" "}
                      в{" "}
                      {forward.original_message.created_at_formatted.substring(
                        11,
                        17
                      )}
                    </span>
                  </div>
                </div>
    </>)
  }
  return (
    <>
      <>
        <div className={styles.forwardMessageWrap}>
          {forwwardBy()}
          <div style={{marginTop:"-15px" }}>
          {Array.isArray(forwardMessage.forwarded_messages) &&
            forwardMessage.forwarded_messages.length > 0 &&
            forwardMessage.forwarded_messages.map((forward, index) => (
              <div key={index} className={styles.forwardMessageContentWrap}>
                {header(forward)}
                  <MessagePhoto
                    photos={forward.original_message.images.map((img) => img.image)}
                    modalPhoto={()=>{}}
                    photoData={photoData}
                  />
                  <MessageDocuments documents={forward.original_message.documents}/>

                <span>{forward.original_message.text}</span>
              </div>
            ))}
          </div>

        </div>
      </>
    </>
  );
}
