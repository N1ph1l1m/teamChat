import React from "react";
import styles from "../../App/Styles/messageReaction.module.css";

export function MessageReaction({ reactions }) {
  return (
    <>
      {reactions && reactions.reactions && reactions.reactions.length > 0 ? (
        reactions.reactions.map((reaction, index) => (
          <div key={index} className={styles.wrapReactionMessage}>
            <span className={styles.reactionEmoji}>{reaction.emoji}</span>
            <img
              src={reactions.user.photo}
              className={styles.avatarReacter}
              alt="avatar user"
            />
          </div>
        ))
      ) : (
        <p></p> // Если нет реакций
      )}
    </>
  );
}
