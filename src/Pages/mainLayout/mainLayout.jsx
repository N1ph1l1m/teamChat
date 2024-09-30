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
import "../../Widgets/createGroupChat/createGroupChat.scss";
import { getData } from "../../Entities/api/getUserList";
import { useState, useEffect } from "react";
import withAuthentication from "../../App/Utils/withAuthentication";
import CreateGroupRoom from "../../Entities/api/CreateGroupName.jsx";
import CreateRoom from "../../Entities/api/createRoom";
import GroupChat from "../../Widgets/createGroupChat/createGroupChat.jsx";

import joinroom from "../../Entities/api/joinroom";
import Badge from "../../Shared/badge/badge.jsx";

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
  const [isOpen, setOpen] = useState(false);
  const [group, setGroup] = useState([]);
  const [groupName, setGroupName] = useState();
  const [selectedUsers, setSelectedUsers] = useState([]);

  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // useEffect(() => {
  //   getData("users/", setUserList)

  //   },
  // )

  function UserList() {
    return (
      <>
        {userlist
          .filter((user) => user.username !== localStorage.getItem("username"))

          .map((user, index) => {
            const upName =
              user.username.charAt(0).toUpperCase() + user.username.slice(1);
            return (
              <>
              <Link></Link>
                <NaviItem
                  key={index}
                  icon={
                    <img
                      src={user.photo}
                      alt={`${user.username}'s avatar`}
                    />
                   }
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
    const loggedInUsername = localStorage.getItem("username");

    //console.log(roomList.current_users)
    return (
      <>
        {roomList
          .filter((room) => room.name.includes(loggedInUsername))
          .map((room) => {
           // console.log(room.current_users)
            const newName = room.name
              .replace(loggedInUsername, "")
              .replace(/^_+|_+$/g, "")
              .trim();

            const capitalized =
              newName.charAt(0).toUpperCase() + newName.slice(1);

            const otherUser = room.current_users.find(
              (user) => user.username !== loggedInUsername
            );

            return (
              <Link
                key={room.pk}
                to={`chats/${room.pk}`}
                // onClick={() => CreateRoom(user.username)}
              >
                <NaviItem
                  icon={
                    <img
                      src={otherUser?.photo}
                      alt={`${room.pk}'s avatar`}

                    />
                  }
                  tittle={capitalized} // Используем обновленное имя
                  badgeCount={room.pk}
                />
              </Link>
            );
          })}
      </>
    );
  }

  function GroupRoomList() {
    return (
      <>
        {roomList
          .filter((room) => room.current_users.length > 2)
          .map((room) => {
            const capitalized =
              room.name.charAt(0).toUpperCase() + room.name.slice(1);

            return (
              <Link
                key={room.pk}
                to={`chats/${room.pk}`}
                // onClick={() => CreateRoom(user.username)}
              >
                <NaviItem
                  icon={<MdOutlineTaskAlt color="white" size="20" />}
                  tittle={capitalized}
                  badgeCount={room.pk}
                />
              </Link>
            );
          })}
      </>
    );
  }

  function handleCancel() {
    setOpen(false);
    setSelectedUsers([]);
    setGroupName("");
  }
  function showModalGroupChat() {
    setOpen(true);
    console.log(isOpen);
    return <></>;
  }

  const handleInputChangeName = (e) => {
    setGroupName(e.target.value);
    if (e.target.value === "") {
      console.log("username has left blank");
    }
  };

  const handleCheckboxChange = (username, photo) => {
    setSelectedUsers((prevSelectedUsers) => {
      if (prevSelectedUsers.some((user) => user.username === username)) {
        // Если пользователь уже выбран, удаляем его
        return prevSelectedUsers.filter((user) => user.username !== username);
      } else {
        // Если пользователь не выбран, добавляем его
        return [...prevSelectedUsers, { username, photo }];
      }
    });
  };

  function formGroupChat() {
    return (
      <>
        <div className="header-model">
          <div className="select-avatar"></div>
          <div className="inputNameGroup">
            <span className="modalTitle">Название группы</span>
            <input onChange={(e) => handleInputChangeName(e)} />
            <ul className="selectedUsers">
              {selectedUsers.map((user) => (
                <div className="userBadge">
                  <img className="li-avatar" src={user.photo} alt={user.name}/>
                  <li className="selectedUsersItems" key={user}>
                    {user.username}
                  </li>
                </div>
              ))}
            </ul>
          </div>
        </div>
        <span>Выберите участников чата</span>
        <div className="wrapCheckBox">
        {userlist
          .filter((user) => user.username !== localStorage.getItem("username"))
          .map((user) => {
            const upName =
              user.username.charAt(0).toUpperCase() + user.username.slice(1);
            return (
              <>
              <label
                className="checkboxWrap"
                key={user.id}
                htmlFor={user.id}
              >
                 <img  className="checkboxUserAvatar" src={user.photo} alt={user.username}/>
                 <input
                  type="checkbox"
                  className="checkbox"
                  id={user.id}
                  checked={selectedUsers.some((selectedUser) => selectedUser.username === user.username)}
                  onChange={() => handleCheckboxChange(user.username, user.photo)}
                />
                <span className="checkboxLabel">{upName}</span>
              </label>
              </>
            );
          })}
        </div>
      </>
    );
  }

  const groupChat = formGroupChat();

  return (
    <>
      <Main>
        <GroupChat
          isOpen={isOpen}
          onCancel={handleCancel}
          onSubmit={() => {
            CreateGroupRoom(groupName, selectedUsers);
            handleCancel();
          }}
          children={groupChat}
        />
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
                content={<>{RoomList()}</>}
              />
              <DropDown
                title="Груповые чаты"
                onClick={() => (
                  getData("users/", setUserList),
                  getData("chat/rooms", setRoomList)
                )}
                plusClick={showModalGroupChat}
                content={<>{GroupRoomList()}</>}
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
