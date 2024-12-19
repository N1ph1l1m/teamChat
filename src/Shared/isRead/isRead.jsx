import React from "react";
import Icon from "../../Shared/icon/icon";
import { IoCheckmarkDoneSharp } from "react-icons/io5";

export default function IsRead({ isRead, size, style }) {
  return (
    <div style={style}>
      <Icon>
        <IoCheckmarkDoneSharp
          size={size}
          color={isRead === false ? "gray" : "blue"}
        />
      </Icon>
    </div>
  );
}