import React from 'react';
import Icon from '../../../components/icon/icon';
import { BsFillBellFill } from "react-icons/bs";
import { FaRegUserCircle } from "react-icons/fa";
import "../navItem/navItem.scss";
function UserItem(props) {
    return (
        <div className="wrap">
        <div className="menuWrap">
          <div className="iconText">
            <Icon>
                <FaRegUserCircle color="white" size="20"/>
            </Icon>
            <p className="tittle">{props.tittle}</p>
          </div>

          <div className="bell">
          <Icon><BsFillBellFill color="white" size="20" /></Icon>
          </div>
        </div>
      </div>
    );
}

export default UserItem;