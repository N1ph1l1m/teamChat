import React from "react";
import styled from "styled-components";
import { getData } from "../../Entities/api/getUserList";
import { useEffect, useState } from "react";
import UserItem from "../../Shared/userItem/userItem";

const NavWrap = styled.div`
  min-width: 260px;
  background-color: #000000;
  display: flex;
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
  const [authUser, setAuthUser] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      await getData("users/", setAuthUser);
    };
    fetchData();
  }, []);
;
  const userAuth = localStorage.getItem("username");
  const authenticatedUser = authUser.find((user) => user.username === userAuth);

  return (
    <NavWrap>
      <HeaderWrap>
        <TitleCompany>teamChat</TitleCompany>
        {props.navItem}
      </HeaderWrap>
      <FooterWrap>
        {authenticatedUser && (
          <UserItem tittle={authenticatedUser.username}
           icon={<img src = {authenticatedUser.photo} alt ={authenticatedUser.username} />} />
        )}
      </FooterWrap>
    </NavWrap>
  );
}

export default Nav;
