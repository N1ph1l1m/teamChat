import Icon from "../icon/icon";
import { RiLogoutBoxLine } from "react-icons/ri";
import styles from "../../App/Styles/userAuth.module.css";
import { useNavigate } from "react-router-dom";
import { logout } from "../../Entities/api/Logout";
function UserItem(props) {
  const history = useNavigate();

  return (
    <div className={styles.wrap}>
      <div className={styles.menuWrap}>
        <div className={styles.iconText}>
          <Icon>{props.icon}</Icon>
          <p className={styles.title}>{props.title}</p>
        </div>

        <div className={styles.logOut}>
          <Icon
            onClick={() => {
              logout(history);
            }}
          >
            <RiLogoutBoxLine color="rgb(131, 130, 130)" size="25" />
          </Icon>
        </div>
      </div>
    </div>
  );
}

export default UserItem;
