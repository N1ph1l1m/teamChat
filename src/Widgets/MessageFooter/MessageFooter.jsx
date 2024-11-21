import React from "react";
import { MessageReaction } from "../../Shared/messageReaction/messageReaction";
import styles from "../../App/Styles/messageTime.module.css"


export function  MessageFooter({ reactions, avatar , emoji , time }){
    return(
     <div className={styles.bubbleTimeWrap}>
        <MessageReaction  reactions ={reactions} avatar={avatar}  emoji={emoji} />
        <div><span className={styles.bubbleTimeText}>{time}</span></div>
      </div>
    )
    };
