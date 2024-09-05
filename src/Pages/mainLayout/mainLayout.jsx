import React from "react";
import Nav from "../../Widgets/nav/nav";
import styled from "styled-components";
import NaviItem from "../../Shared/navItem/naviItem";
import DropDown from "../../Shared/dropDown/dropDown";
import { GoPlus } from "react-icons/go";
import { FaUsers } from "react-icons/fa";
import { MdOutlineTaskAlt } from "react-icons/md";
import { Link, Outlet } from "react-router-dom";


const Main = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
const WrapOutlet = styled.div`
  width: 100%;
  height: 100vh;
  background-color: black;
  overflow: hidden;
`;
const OutletItem = styled.div`
  margin-top: 10px;
  background-color: white;
  height: 97%;
  width: 99%;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: start;
`;
function MainLayout() {





  return (
    <>
      <Main>
        <Nav
          navItem={
            <>
              <Link to="/task">
                <NaviItem
                  icon={<MdOutlineTaskAlt color="white" size="20" />}
                  tittle="Задачи"
                  badgeCount="3"
                />
              </Link>

              <Link to="/auto">
                <NaviItem
                  icon={<MdOutlineTaskAlt color="white" size="20" />}
                  tittle="Автоматизации"
                  badgeCount="20"
                />
              </Link>

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
        <WrapOutlet>
          <OutletItem>
            <Outlet />
          </OutletItem>
        </WrapOutlet>
      </Main>
    </>
  );
}
export default MainLayout;
