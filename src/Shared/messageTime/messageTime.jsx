import React from "react";
import { MessageReaction } from "../messageReaction/messageReaction";
import styles from "../../App/Styles/messageTime.module.css"


export function  MessageTime({ avatar , time }){
    return(
     <div className={styles.bubbleTimeWrap}>
        <MessageReaction avatar={avatar}/>
        <div><span className={styles.bubbleTimeText}>{time}</span></div>
      </div>
    )
    };
