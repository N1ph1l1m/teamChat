import React from "react";
import Icon from "../../Shared/icon/icon";
import { IoCheckmarkDoneSharp } from "react-icons/io5";

export default function IsRead({ isRead }) {
  return (
    <>
      <Icon>
        <IoCheckmarkDoneSharp
          size={18}
          color={isRead === false ? "gray" : "blue"}
        />
      </Icon>
    </>
  );
}
