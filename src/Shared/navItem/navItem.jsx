import styles from "../../App/Styles/navItem.module.css";
import Icon from "../icon/icon";

function NaviItem({ badgeCount, click, icon, tittle }) {
  return (
    <>
      <div onClick={click} className={styles.wrap}>
        <div className={styles.menuWrap}>
          <div className={styles.iconText}>
            <Icon> {icon}</Icon>
            <p className={styles.tittle}>{tittle}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default NaviItem;
