import React from "react";
import Icon from "../icon/icon";

import { IoIosMore } from "react-icons/io";
import styles from "../../App/Styles/userprofile.module.css";


const RenderUserProfile = ({userAvatar,nameRoom})=>{
  return (
    <div className={styles.userProfileWrap}>
    <div className={styles.userProfileItems}>
    <img className={styles.userAvatar} src={userAvatar} alt="User Avatar" />
        <div className={styles.userTitle}>
          <p className={styles.titleUserName}>{nameRoom}</p>
          <p className={styles.statusOnline}>Online</p>
        </div>
    </div>
   <Icon onClick={()=>{console.log("click")}}>
    <IoIosMore style={{marginRight:"10px", cursor:"pointer"}} size="25" color="gray"/>
   </Icon>
    </div>
  );
}

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
      return( <RenderUserProfile userAvatar={userAvatar} nameRoom={nameRoom}/>)

  } catch (error) {
    console.log(error);
  }
};


export const GroupProfile = ({ room }) => {
  try {
    let nameRoom = room.name;
    let userAvatar = room.photo_room;

    return (
      <RenderUserProfile userAvatar={userAvatar} nameRoom={nameRoom}/>
    );
  } catch (error) {
    console.log(error);
  }
};
