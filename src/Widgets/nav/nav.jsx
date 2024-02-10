import React from "react";
import styled from "styled-components";
import { MdOutlineTaskAlt } from "react-icons/md";
import UserItem from "../../Shared/userItem/userItem";
import NaviItem from "../../Shared/navItem/naviItem";

const NavWrap = styled.div`
  width: 260px;
  height: 100vh;
  background-color: #000000;
  display: flex;
  align-items: space-around;
  flex-direction: column;
  padding: 10px;
`;
const HeaderWrap = styled.div`
  width: 260px;
  height: 98vh;
`;
const FooterWrap = styled.div`
  width: 260px;
`;
const TitleCompany = styled.h1`
  color: white;
  font-size: 16px;
  margin-bottom: 15px;
`;
function Nav(props) {
  return (
    <NavWrap>
      <HeaderWrap>
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
      </HeaderWrap>
      <FooterWrap>
        <UserItem tittle="User1" />
      </FooterWrap>
    </NavWrap>
  );
}

export default Nav;
