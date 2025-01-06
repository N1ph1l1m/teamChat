import React, { useState } from "react";
import Icon from "../icon/icon";
import { useNavigate } from "react-router";
import { IoIosMore } from "react-icons/io";
import styles from "../../App/Styles/userprofile.module.css";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { FaPaperclip } from "react-icons/fa";

const RenderUserProfile = ({ userAvatar, nameRoom, setModal }) => {
  const [showMenu, setMenu] = useState(false);
  let navigate = useNavigate();

  return (
    <div className={styles.userProfileWrap}>
      <div className={styles.userProfileItems}>
        <img className={styles.userAvatar} src={userAvatar} alt="User Avatar" />
        <div className={styles.userTitle}>
          <p className={styles.titleUserName}>{nameRoom}</p>
          <p className={styles.statusOnline}>Online</p>
        </div>
      </div>
      <Icon
        onClick={() => {
          setMenu(!showMenu);
        }}
      >
        {showMenu ? (
          <div className={styles.menuChat}>
            <ul className={styles.menuItems}>
              <li
                onClick={() => {
                  navigate("/");
                }}
              >
                <IoMdCloseCircleOutline
                  size="20"
                  style={{ marginRight: "5px" }}
                  color="rgb(131, 130, 130)"
                />{" "}
                Закрыть
              </li>
              <li onClick={setModal}>
                <FaPaperclip
                  size="20"
                  color="rgb(131, 130, 130)"
                  style={{ marginRight: "5px" }}
                />
                Показать вложения
              </li>
            </ul>
          </div>
        ) : (
          false
        )}
        <IoIosMore
          style={{ marginRight: "10px", cursor: "pointer" }}
          size="25"
          color="gray"
        />
      </Icon>
    </div>
  );
};

export const UserProfile = ({ room, authUserId, setModal }) => {
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
      <RenderUserProfile
        userAvatar={userAvatar}
        nameRoom={nameRoom}
        setModal={setModal}
      />
    );
  } catch (error) {
    console.log(error);
  }
};

export const GroupProfile = ({ room }) => {
  try {
    let nameRoom = room.name;
    let userAvatar = room.photo_room;

    return <RenderUserProfile userAvatar={userAvatar} nameRoom={nameRoom} />;
  } catch (error) {
    console.log(error);
  }
};
