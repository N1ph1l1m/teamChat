import React from "react";
import styles from "../../App/Styles/messageReaction.module.css"

export function  MessageReaction({ reactions}){
    return(
        <>
            {Array.isArray(reactions) && reactions.length >0 ? reactions.map((reaction)=>(
                <div className={styles.wrapReactionMessage}>
                    <span className={styles.reactionEmoji}>{reaction.emoji}</span>
                    <img src={reaction.id_user.photo} className={styles.avatarReacter}  alt={"avatar user"}/>
    </div>
        )): null}
        </>
    )
    };
