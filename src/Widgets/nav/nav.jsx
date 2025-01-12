import { getData } from "../../Entities/api/GetServerData";
import { useEffect, useState } from "react";
import UserItem from "../../Shared/userItem/userItem";
import styles from "../../App/Styles/nav.module.css";
import avatar from "../../App/images/userAvatar.png";

function Nav(props) {
  const [authUser, setAuthUser] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      await getData("users/", setAuthUser);
    };
    fetchData();
  }, []);
  const userAuth = localStorage.getItem("username");
  const authenticatedUser = authUser.find((user) => user.username === userAuth);
  const avatarUser = authenticatedUser ? authenticatedUser.photo : avatar;
  return (
    <>
      <div className={styles.headerNav}>
        <div className={styles.menuWrap}>
          <div className={styles.menuNav}>{props.menuNav}</div>
          <div className={styles.menuItems}>
            <div className={styles.navItem}>{props.navItem}</div>

            <div className={styles.footerWrap}>
              {authenticatedUser && (
                <UserItem
                  title={authenticatedUser.username}
                  icon={
                    <img src={avatarUser} alt={authenticatedUser.username} />
                  }
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Nav;
