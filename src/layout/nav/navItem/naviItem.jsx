import React from "react";
import "./navItem.scss";

import Badge from "../../../components/badge/badge";
import Icon from "../../../components/icon/icon";

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
      <div className="wrap">
        <div className="menuWrap">
          <div className="iconText">
            <Icon> {props.icon}</Icon>
            <p className="tittle">{props.tittle}</p>
          </div>

          <div className="badge">{badge}</div>
        </div>
      </div>
    </>
  );
}

export default NaviItem;


