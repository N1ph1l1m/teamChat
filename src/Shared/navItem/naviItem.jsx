import React from "react";
import styles from  "../../App/Styles/navItem.module.css";
import Badge from "../badge/badge";
import Icon from "../icon/icon";

function NaviItem(props) {
  function numBadge() {
    if (props.badgeCount > 0) {
      return <Badge className="background" value={props.badgeCount} inline />;
    } else {
      <Badge value={props.badgeCount} inline />;
    }
  }

  const badge = numBadge();
  return (
    <>
      <div onClick={props.click} className={styles.wrap}>
        <div className={styles.menuWrap}>
          <div className={styles.iconText}>
            <Icon> {props.icon}</Icon>
            <p className={styles.tittle}>{props.tittle}</p>
          </div>

          <div className={styles.badge}>{badge}</div>
        </div>
      </div>
    </>
  );
}

export default NaviItem;
