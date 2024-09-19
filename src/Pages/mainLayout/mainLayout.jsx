import React from "react";
import Nav from "../../Widgets/nav/nav";
import styled from "styled-components";
import NaviItem from "../../Shared/navItem/naviItem";
import DropDown from "../../Shared/dropDown/dropDown";
// import { GoPlus } from "react-icons/go";
import { FaUsers } from "react-icons/fa";
import { MdOutlineTaskAlt } from "react-icons/md";
import { Link, Outlet } from "react-router-dom";
import "../../App/Styles/link.scss";
import {getData} from "../../Entities/api/getUserList";
import { useState } from "react";
import withAuthentication from "../../App/Utils/withAuthentication";
import {createRoom} from  "../../Entities/api/createRoom";

import joinroom from "../../Entities/api/joinroom";

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
  const [userlist, setUserList] = useState([]);

  function UserList() {
    // Переименуем в users

    return (
      <>
        {userlist
          .filter((user) => user.username !== localStorage.getItem("username"))
          .map((user) => (
            <Link
              key={user.username}
              to={`chats/${user.username}`}
              onClick={() => createRoom(user.username)}
            >
              <NaviItem
                icon={<MdOutlineTaskAlt color="white" size="20" />}
                tittle={user.username}
                badgeCount={user.id}
              />
            </Link>
          ))}
      </>
    );
  }

  return (
    <>
      <Main>
        <Nav
          navItem={
            <>
              <Link to="/task" className="newLink" >
                <NaviItem
                  icon={<MdOutlineTaskAlt color="white" size="20" />}
                  tittle="Задачи"
                  badgeCount="3"
                />
              </Link>

              <Link to="/auto" className="newLink">
                <NaviItem
                  icon={<MdOutlineTaskAlt color="white" size="20" />}
                  tittle="Автоматизации"
                  badgeCount="20"
                />
              </Link>
              <DropDown
                title="Чаты"
                onClick={() => getData("users/",setUserList)}
                content={
                  <>
                    <Link to="/chats/1">
                      <NaviItem
                        icon={<MdOutlineTaskAlt color="white" size="20" />}
                        tittle={"Общий чат"}
                        badgeCount={0}
                      />
                    </Link>
                    {UserList()}
                  </>
                }
              />
              <DropDown
                title="Контакты"
                content={
                  <>
                    <DropDown
                      title="Бухгалтерия"
                      content={
                        <>
                          <NaviItem
                            icon={<FaUsers color="white" size="20" />}
                            tittle="User1"
                            badgeCount=""
                          />

                          <NaviItem
                            icon={<FaUsers color="white" size="20" />}
                            tittle="User2"
                            badgeCount="2"
                          />

                          <NaviItem
                            icon={<FaUsers color="white" size="20" />}
                            tittle="User3"
                            badgeCount="10"
                          />
                        </>
                      }
                    />

                    <DropDown
                      title="Отдел Маркетинга"
                      content={
                        <>
                          <NaviItem
                            icon={<FaUsers color="white" size="20" />}
                            tittle="User1"
                            badgeCount=""
                          />

                          <NaviItem
                            icon={<FaUsers color="white" size="20" />}
                            tittle="User2"
                            badgeCount="2"
                          />

                          <NaviItem
                            icon={<FaUsers color="white" size="20" />}
                            tittle="User3"
                            badgeCount="10"
                          />
                        </>
                      }
                    />

                    <DropDown
                      title="Команда N"
                      content={
                        <>
                          <NaviItem
                            icon={<FaUsers color="white" size="20" />}
                            tittle="User1"
                            badgeCount=""
                          />

                          <NaviItem
                            icon={<FaUsers color="white" size="20" />}
                            tittle="User2"
                            badgeCount="2"
                          />

                          <NaviItem
                            icon={<FaUsers color="white" size="20" />}
                            tittle="User3"
                            badgeCount="10"
                          />
                        </>
                      }
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
