import React from "react";
import styled from "styled-components";
import { MdOutlineTaskAlt } from "react-icons/md";
import NaviItem from "./navItem/naviItem";

const NavWrap = styled.div`
  width: 260px;
  height: 100vh;
  background-color: #000000;
  display: flex;
  align-items: start;
  flex-direction: column;
  padding: 10px;
`;
const TitleCompany = styled.h1`
  color: white;
  font-size: 16px;
  margin-bottom: 15px;
`;
function Nav(props) {
  return (
    <NavWrap>
      <TitleCompany>Company N</TitleCompany>
      <NaviItem
        icon={<MdOutlineTaskAlt color="white" size="20" />}
        tittle="Задачи"
        badgeCount="3"
      />
      <NaviItem
        icon={<MdOutlineTaskAlt color="white" size="20" />}
        tittle="Автоматизации"
        badgeCount="20"
      />
    </NavWrap>
  );
}

export default Nav;
