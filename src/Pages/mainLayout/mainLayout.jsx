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
import { getData } from "../../Entities/api/getUserList";
import { useState } from "react";
import withAuthentication from "../../App/Utils/withAuthentication";
import CreateRoom from "../../Entities/api/createRoom";

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
  const [roomList, setRoomList] = useState([]);

  function UserList() {
    return (
      <>
        {userlist
          .filter((user) => user.username !== localStorage.getItem("username"))
          .map((user) => {
            const upName =
              user.username.charAt(0).toUpperCase() + user.username.slice(1);
            return (
              <>
                <NaviItem
                  icon={<MdOutlineTaskAlt color="white" size="20" />}
                  tittle={upName}
                  badgeCount={user.id}
                />
              </>
            );
          })}
      </>
    );
  }
  function RoomList() {
    console.log(roomList);

    return (
      <>
        {roomList
          .filter((room) =>
             room.name.includes(`${localStorage.getItem("username")}`)
           )
        .map((room) => {
            // Удаляем "admin", убираем нижнее подчеркивание в начале и в конце, и делаем первую букву заглавной
            return (
              <Link
                key={room.pk}
                to={`chats/${room.pk}`}
                // onClick={() => CreateRoom(user.username)}
              >
                <NaviItem
                  icon={<MdOutlineTaskAlt color="white" size="20" />}
                  tittle={room.name} // Используем обновленное имя
                  badgeCount={room.pk}
                />
              </Link>
            );
          })}
      </>
    );
  }

  // function RoomList() {
  //   console.log(roomList);

  //   return (
  //     <>
  //       {roomList
  //         .filter((room) =>
  //           room.name.includes(`${localStorage.getItem("username")}`)
  //         )
  //         .map((room) => {
  //           // Удаляем "admin", убираем нижнее подчеркивание в начале и в конце, и делаем первую букву заглавной
  //           const newName = room.name
  //             .replace(`${localStorage.getItem("username")}`, "")
  //             .replace(/^_+|_+$/g, "")
  //             .trim();

  //           const capitalized =
  //             newName.charAt(0).toUpperCase() + newName.slice(1);

  //           return (
  //             <Link
  //               key={room.pk}
  //               to={`chats/${room.pk}`}
  //               // onClick={() => CreateRoom(user.username)}
  //             >
  //               <NaviItem
  //                 icon={<MdOutlineTaskAlt color="white" size="20" />}
  //                 tittle={capitalized} // Используем обновленное имя
  //                 badgeCount={room.pk}
  //               />
  //             </Link>
  //           );
  //         })}
  //     </>
  //   );
  // }

  return (
    <>
      <Main>
        <Nav
          navItem={
            <>
              <Link to="/task" className="newLink">
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
                onClick={() => getData("chat/rooms", setRoomList)}
                content={
                  <>
                    <Link to="/chats/72">
                      <NaviItem
                        icon={<MdOutlineTaskAlt color="white" size="20" />}
                        tittle={"Общий чат"}
                        badgeCount={0}
                      />
                    </Link>
                    {RoomList()}
                  </>
                }
              />
              <DropDown
                title="Контакты"
                onClick={() => getData("users/", setUserList)}
                content={<>{UserList()}</>}
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
