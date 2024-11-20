import React from "react";
import styles from "../../App/Styles/messageReaction.module.css"

export function  MessageReaction({ avatar}){
    return(
        <div className={styles.wrapReactionMessage}>
        <span className={styles.reactionEmoji}>😁</span>
        <img src={avatar} className={styles.avatarReacter}  alt={"avatar user"}/>
        </div>
    )
    };
