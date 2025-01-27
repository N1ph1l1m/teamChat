import React, { useState } from "react";
import styles from "../../App/Styles/userprofile.module.css";
import { StatusUser } from "../statusUser/statusUser";

import Icon from "../icon/icon";
import { IoIosMore } from "react-icons/io";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { FaPaperclip } from "react-icons/fa";

export const UserProfile = ({
  userAvatar,
  nameRoom,
  setModal,
  userActive,
  status,
  menu,
}) => {
  const [showMenu, setMenu] = useState(false);
  return (
    <div className={styles.userProfileWrap}>
      <div className={styles.userProfileItems}>
        <img className={styles.userAvatar} src={userAvatar} alt="User Avatar" />
        <div className={styles.userTitle}>
          <p className={styles.titleUserName}>{nameRoom}</p>
          {status ? (
            <StatusUser
              status={userActive}
              online={<p className={styles.statusOnline}>Online</p>}
              offline={
                <p className={styles.statusOnline} style={{ color: "gray" }}>
                  Offline
                </p>
              }
            />
          ) : null}
        </div>
      </div>
      <Icon
        onClick={() => {
          setMenu(!showMenu);
        }}
      >
        {showMenu ? (
          <div className={styles.menuChat}>
            <ul className={styles.menuItemWrap}>
              <li className={styles.menuItem}
                onClick={() => {
                  // navigate("/");
                }}
              >
                <IoMdCloseCircleOutline
                  size="20"
                  style={{ marginRight: "5px" }}
                  color="rgb(131, 130, 130)"
                />
                 Закрыть
              </li>
              <li className={styles.menuItem}
                onClick={setModal}
                >
                <FaPaperclip
                  size="20"
                  style={{ marginRight: "5px" }}
                  color="rgb(131, 130, 130)"
                />
                Показать вложения
              </li>
            </ul>
          </div>
        ) : (
          false
        )}
        {menu ?   <IoIosMore
          style={{ marginRight: "10px", cursor: "pointer" }}
          size="25"
          color="gray"
        /> : null }

      </Icon>
    </div>
  );
};
