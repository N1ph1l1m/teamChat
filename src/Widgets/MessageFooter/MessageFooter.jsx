import React from "react";
import { MessageReaction } from "../../Shared/messageReaction/messageReaction";
import styles from "../../App/Styles/messageFooter.module.css";
import IsRead from "../../Shared/isRead/isRead";

export function MessageFooter({
  reactions,
  avatar,
  emoji,
  time,
  onDestroyReaction,
  isRead,
  sent,
}) {
  return (
    <div className={styles.bubbleTimeWrap}>
      <MessageReaction
        reactions={reactions}
        avatar={avatar}
        emoji={emoji}
        onDestroyReaction={onDestroyReaction}
      />
      <div className={styles.timeCheckWrap}>
        <span className={styles.bubbleTimeText}>{time}</span>
        {time && sent ? <IsRead isRead={isRead} size={18} /> : null}
        {!time && sent ? (
          <IsRead
            style={{
              backgroundColor: "rgba(0, 0, 0, 0.486)",
              marginRight: "10px",
              height: "20px",
              width: "30px",
              padingLeft: "15px",
              borderRadius: "5px",
            }}
            isRead={isRead}
            size={18}
          />
        ) : null}
      </div>
    </div>
  );
}
