import React, { useState } from "react";
import Icon from "../icon/icon";
import { GoPlus } from "react-icons/go";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import styles from "../../App/Styles/dropDown.module.css";

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
        <div>
          <Icon>
            <BiDotsHorizontalRounded color="black" size="20" />
          </Icon>
          <Icon>
            <GoPlus onClick={props.plusClick} color="black" size="20" />
          </Icon>
        </div>
      );
    } else {
      return <div className={styles.zeroWidth}></div>;
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
        className={styles.wrapDrop}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={showIcons === false ? props.onClick : null}
    >
      <div className={styles.dropItem}>
        <div className={styles.leftSide}>
          <Icon onClick={switchDropDown}>
            {showIcons ? (
              <IoIosArrowDown color="black" size="20" />
            ) : (
              <IoIosArrowForward color="black" size="20" />
            )}
          </Icon>
          <span className={styles.textDrop}> {truncateText(props.title, 16)}</span>
          {/* <span className="textDrop"> {props.title}</span> */}
        </div>
        {hoverIcon}
      </div>
      {contentShow}
    </div>
  );
}

export default DropDown;
