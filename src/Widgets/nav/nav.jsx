import React from "react";
import styled from "styled-components";

import UserItem from "../../Shared/userItem/userItem";


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
  let user = localStorage.getItem('username')
  return (
    <NavWrap>
      <HeaderWrap>
        <TitleCompany>Company N</TitleCompany>
       {props.navItem}
      </HeaderWrap>
      <FooterWrap>
        <UserItem tittle={user} />
      </FooterWrap>
    </NavWrap>
  );
}

export default Nav;
