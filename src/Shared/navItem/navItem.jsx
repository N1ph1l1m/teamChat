import styles from "../../App/Styles/navItem.module.css";
import Badge from "../badge/badge";
import Icon from "../icon/icon";

function NaviItem({badgeCount,click , icon , tittle}) {
  function numBadge() {
    if (badgeCount > 0) {
      return <Badge className="background" value={badgeCount} inline />;
    } else {
      <Badge value={badgeCount} inline />;
    }
  }

  const badge = numBadge();
  return (
    <>
      <div onClick={click} className={styles.wrap}>
        <div className={styles.menuWrap}>
          <div className={styles.iconText}>
            <Icon> {icon}</Icon>
            <p className={styles.tittle}>{tittle}</p>
          </div>

          <div className={styles.badge}>{badge}</div>
        </div>
      </div>
    </>
  );
}

export default NaviItem;
