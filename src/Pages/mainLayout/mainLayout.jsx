import React from "react";
import Nav from "../../Widgets/nav/nav";
import styled from "styled-components";
import Automatization from "../Automatization/automatization";
import NaviItem from "../../Shared/navItem/naviItem";
import DropDown from "../../Shared/dropDown/dropDown";
import { GoPlus } from "react-icons/go";
import { FaUsers } from "react-icons/fa";
import { MdOutlineTaskAlt } from "react-icons/md";
import { Outlet, Link } from "react-router-dom";

const Main = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: row;
`;
function MainPage() {
  return (
    <Main>
      <Nav
        navItem={
          <>
            {/* <Link to={"task"}>
           
            </Link> */}
          
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
              content={
                <>
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
                </>
              }
            />
            <DropDown
              title="Личные сообщения"
              content={
                <>
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
                </>
              }
            />
            <DropDown
              title="Контакты"
              content={
                <>
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
                </>
              }
            />
          </>
        }
      />
      <Outlet/>
    </Main>
  );
}
export default MainPage;
