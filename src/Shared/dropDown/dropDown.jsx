import React, { useState } from "react";
import Icon from "../icon/icon";
import { GoPlus } from "react-icons/go";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";

import "../../App/Styles/dropDown.scss";

function DropDown(props) {
  const [showIcons, setShowIcons] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  function switchDropDown() {
    setShowIcons(!showIcons);
  }
  function showDrop() {
    if (showIcons) {
      return <div className="dropContent">{props.content}</div>;
    }
  }
  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  function showRightIcon() {
    if (isHovered) {
      return (
        <div className="rightSide">
          <Icon>
            <BiDotsHorizontalRounded color="white" size="20" />
          </Icon>
          <Icon>
            <GoPlus color="white" size="20" />
          </Icon>
        </div>
      );
    } else {
      return <div className="zeroWidth"></div>;
    }
  }

  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    }
    return text;
  };

  const contentShow = showDrop();
  const hoverIcon = showRightIcon();
  return (
    <div
      className="wrapDrop"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="dropItem">
        <div className="leftSide">
          <Icon onClick={switchDropDown}>
            {showIcons ? (
              <IoIosArrowDown color="white" size="20" />
            ) : (
              <IoIosArrowForward color="white" size="20" />
            )}
          </Icon>
          <span className="textDrop"> {truncateText(props.title, 13)}</span>
        </div>
        {hoverIcon}
      </div>
      {contentShow}
    </div>
  );
}

export default DropDown;
