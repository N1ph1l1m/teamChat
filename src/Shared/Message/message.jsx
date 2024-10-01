import React from "react";
import styles from "../../App/Styles/message.module.css";
import Icon from "../icon/icon";
import { FaRunning } from "react-icons/fa";

export default function Message({ text, avatar  , sent, time, username }) {
  return (
    <div
      className={`${styles.message} ${sent ? styles.sent : styles.received}`}
    >
        <img  className={styles.messageAvatar} src={avatar} alt={"avatar user"}/>
        <div className={styles.messageBubble}>
        <div className={styles.bubbleNameWrap}>

          <span className={styles.bubbleNameText}>{username}</span>{" "}
        </div>

        <div className={styles.bubbleText}>{text}</div>

        <div className={styles.bubbleTimeWrap}>
          <span className={styles.bubbleTimeText}>{time}</span>{" "}

        </div>
      </div>
    </div>
  );
}
