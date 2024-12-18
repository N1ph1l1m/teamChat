import React from "react";
import styles from "../../App/Styles/userprofile.module.css";

export const UserProfile = ({ room, authUserId }) => {
  try {
    let nameRoom = "";
    let userAvatar = "";
    room.current_users
      .filter((user) => user.id !== authUserId)
      .forEach((user) => {
        nameRoom =
          user.username.charAt(0).toUpperCase() + user.username.slice(1);
        userAvatar = user.photo;
      });

    return (
      <div className={styles.userProfileWrap}>
        <img className={styles.userAvatar} src={userAvatar} alt="User Avatar" />
        <div className={styles.userTitle}>
          <p className={styles.titleUserName}>{nameRoom}</p>
          <p className={styles.statusOnline}>Online</p>
        </div>
      </div>
    );
  } catch (error) {
    console.log(error);
  }
};
