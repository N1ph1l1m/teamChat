import React from "react";
import { MessageReaction } from "../../Shared/messageReaction/messageReaction";
import styles from "../../App/Styles/messageFooter.module.css"


export function  MessageFooter({ reactions, avatar , emoji , time  , authUsers , onDestroyReaction }){

    return(
     <div className={styles.bubbleTimeWrap}>
        <MessageReaction  reactions ={reactions} avatar={avatar}  emoji={emoji}  authUsers = {authUsers}
              onDestroyReaction ={ onDestroyReaction}
        />
        <div><span className={styles.bubbleTimeText}>{time}</span></div>
      </div>
    )
    };
