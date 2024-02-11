import React from "react";
import styled from "styled-components";
import { MdOutlineTaskAlt } from "react-icons/md";
import UserItem from "../../Shared/userItem/userItem";
import NaviItem from "../../Shared/navItem/naviItem";
import DropDown from "../../Shared/dropDown/dropDown";
import { GoPlus } from "react-icons/go";
import { FaUsers } from "react-icons/fa";

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
        <DropDown 
          title="Беседы"
          content={<>
                <NaviItem
              icon={<FaUsers color="white" size="20" />}
              tittle="Бухгалтерия"
              badgeCount="0"
              />
                  <NaviItem
              icon={<FaUsers color="white" size="20" />}
              tittle="Отдел Маркетинга"
              badgeCount="100"
              />
                  <NaviItem
              icon={<FaUsers color="white" size="20" />}
              tittle="Команда N"
              badgeCount="0"
              />
              <NaviItem
              icon={<GoPlus color="white" size="20" />}
              tittle="Создать"
        
              />
          </>}
        />
         <DropDown 
          title="Личные сообщения"
          content={<>
                <NaviItem
              icon={<FaUsers color="white" size="20" />}
              tittle="Бухгалтерия"
              badgeCount="0"
              />
                  <NaviItem
              icon={<FaUsers color="white" size="20" />}
              tittle="Отдел Маркетинга"
              badgeCount="100"
              />
                  <NaviItem
              icon={<FaUsers color="white" size="20" />}
              tittle="Команда N"
              badgeCount="0"
              />
          </>}
        />
         <DropDown 
          title="Контакты"
          content={<>
                <NaviItem
              icon={<FaUsers color="white" size="20" />}
              tittle="Бухгалтерия"
              badgeCount="0"
              />
                  <NaviItem
              icon={<FaUsers color="white" size="20" />}
              tittle="Отдел Маркетинга"
              badgeCount="100"
              />
                  <NaviItem
              icon={<FaUsers color="white" size="20" />}
              tittle="Команда N"
              badgeCount="0"
              />
          </>}
        />
      </HeaderWrap>
      <FooterWrap>
        <UserItem tittle="User1" />
      </FooterWrap>
    </NavWrap>
  );
}

export default Nav;
