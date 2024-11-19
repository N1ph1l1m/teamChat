import React from "react";
import styles from "../../App/Styles/HeaderNameMessage.module.css"

export function HeaderName({ username }){
    return(
      <div className={styles.bubbleNameWrap}>
      <span className={styles.bubbleNameText}>{username}</span>
    </div>
    )
  };
