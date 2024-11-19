import React from "react";
import styles from "../../App/Styles/messageTime.module.css"

export function  MessageTime({ time }){
    return(
     <div className={styles.bubbleTimeWrap}>
        <span className={styles.bubbleTimeText}>{time}</span>
      </div>
    )
    };
