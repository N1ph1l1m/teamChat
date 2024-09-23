import React from "react";
import styled from "styled-components";

import UserItem from "../../Shared/userItem/userItem";

const NavWrap = styled.div`
  min-width: 260px;
  ${"" /* height: 100vh; */}
  background-color: #000000;
  display: flex;
  align-items: space-around;
  flex-direction: column;
  padding: 10px;
  overflow: scroll;

  &::-webkit-scrollbar {
    display: none;
  }
`;
const HeaderWrap = styled.div`
  width: 260px;
  height: 98vh;
  overflow: scroll;

  &::-webkit-scrollbar {
    display: none;
  }
`;
const FooterWrap = styled.div`
  margin-top: 10px;
  width: 260px;
`;
const TitleCompany = styled.h1`
  color: white;
  font-size: 16px;
  margin-bottom: 15px;
`;
function Nav(props) {
  let user = localStorage.getItem("username");
  return (
    <NavWrap>
      <HeaderWrap>
        <TitleCompany>teamChat</TitleCompany>
        {props.navItem}
      </HeaderWrap>
      <FooterWrap>
        <UserItem tittle={user} />
      </FooterWrap>
    </NavWrap>
  );
}

export default Nav;
