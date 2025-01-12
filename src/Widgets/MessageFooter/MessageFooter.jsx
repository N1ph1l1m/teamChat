import { MessageReaction } from "../../Shared/messageReaction/messageReaction";
import styles from "../../App/Styles/messageFooter.module.css";
import IsRead from "../../Shared/isRead/isRead";

export function MessageFooter({
  style,
  reactions,
  avatar,
  emoji,
  time,
  onDestroyReaction,
  isRead,
  sent,
  reactionStyle,
}) {
  return (
    <div className={styles.bubbleTimeWrap} style={style}>
      <div style={reactionStyle}>
        <MessageReaction
          reactions={reactions}
          avatar={avatar}
          emoji={emoji}
          onDestroyReaction={onDestroyReaction}
        />
      </div>

      <div className={styles.timeCheckWrap}>
        <span className={styles.bubbleTimeText}>{time}</span>
        {time && sent ? <IsRead isRead={isRead} size={18} /> : null}
        {!time && sent ? (
          <IsRead
            style={{
              backgroundColor: "black",
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
