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
      <div className="elementsWrap">
        <div className="elementsMenuWrap">
          <div className="elementsIconText">
            <Icon> {props.icon}</Icon>
            <p className="elementTittle">{props.tittle}</p>
          </div>

          <div className="elementBadge">{badge}</div>
        </div>
      </div>
    </>
  );
}

export default NaviItem;

//
