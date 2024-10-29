import React from "react";
import { getData } from "../../Entities/api/getUserList";
import { useEffect, useState } from "react";
import UserItem from "../../Shared/userItem/userItem";
import styles from "../../App/Styles/nav.module.css"
import avatar from "../../App/images/userAvatar.png"

function Nav(props) {
  const [authUser, setAuthUser] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      await getData("users/", setAuthUser);
    };
    fetchData();
  }, []);
;
  const userAuth = localStorage.getItem("username");
  const authenticatedUser = authUser.find((user) => user.username === userAuth);
  const avatarUser =   authenticatedUser ? authenticatedUser.photo : avatar;
  return (
    <div className={styles.navWrap}>
      <div className={styles.headerNav}>
        <h1 className={styles.navTitle}>teamChat</h1>
        {props.navItem}
      </div>
      <div className={styles.footerWrap}>
        {authenticatedUser && (
          <UserItem tittle={authenticatedUser.username}
           icon={<img src = {avatarUser} alt ={authenticatedUser.username} />} />
        )}
      </div>
    </div>
  );
}

export default Nav;
