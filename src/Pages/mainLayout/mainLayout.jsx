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
import "../../Widgets/createGroupChat/createGroupChat.scss"
import { getData } from "../../Entities/api/getUserList";
import { useState, useEffect } from "react";
import withAuthentication from "../../App/Utils/withAuthentication";
import CreateGroupRoom from "../../Entities/api/CreateGroupName.jsx";
import CreateRoom from "../../Entities/api/createRoom";
import GroupChat from "../../Widgets/createGroupChat/createGroupChat.jsx"

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
    return (
      <>
        {roomList
          .filter((room) =>
            room.name.includes(`${localStorage.getItem("username")}`)
          )
          .map((room) => {
            const newName = room.name
              .replace(`${localStorage.getItem("username")}`, "")
              .replace(/^_+|_+$/g, "")
              .trim();

            const capitalized =
              newName.charAt(0).toUpperCase() + newName.slice(1);

            return (
              <Link
                key={room.pk}
                to={`chats/${room.pk}`}
                // onClick={() => CreateRoom(user.username)}
              >
                <NaviItem
                  icon={<MdOutlineTaskAlt color="white" size="20" />}
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
          .filter((room) => room.current_users.length > 2
          )
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

  const handleCheckboxChange = (username) => {
    if (selectedUsers.includes(username)) {
      setSelectedUsers(selectedUsers.filter((u) => u !== username));
      console.log("select 1 " + selectedUsers);
    } else {
      // Иначе добавляем его в массив
      setSelectedUsers([...selectedUsers, username]);
      console.log("select 2 " + selectedUsers);
    }
  };



  function formGroupChat() {
    return (
      <>
        <div className="header-model">
          <div className="select-avatar"></div>
          <div className="inputNameGroup">
            <span className="modalTitle">Название группы</span>
            <input
              onChange={(e) => handleInputChangeName(e)}
              />
             <ul className="selectedUsers">
                {
                  selectedUsers.map((username) => (
                    <div className="userBadge">
                    <div className="li-avatar"></div>
                    <li className="selectedUsersItems" key={username}>{username}</li>
                    </div>
                  )
                )
                }
            </ul>
          </div>
        </div>
        <span>Выберите участников чата</span>

{userlist
  .filter((user) => user.username !== localStorage.getItem("username"))
  .map((user) => {
    const upName = user.username.charAt(0).toUpperCase() + user.username.slice(1);
    return (
      <label className=" checkboxWrap check-color " key={user.id} htmlFor={user.id}>

        <input
          type="checkbox"
          className="checkbox"
          id={user.id}
          checked={selectedUsers.includes(user.username)}
          onChange={() => handleCheckboxChange(user.username)}
        />
        <span className="checkboxLabel">{upName}</span>
      </label>
    );
  })}
        <div>
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
          onSubmit={()=>{
            CreateGroupRoom(groupName,selectedUsers);
            handleCancel()
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
                content={
                  <>
                    {RoomList()}
                  </>
                }
              />
               <DropDown
                title="Груповые чаты"
                onClick={() => getData("chat/rooms", setRoomList)}
                plusClick={showModalGroupChat}
                content={
                  <>
                    {GroupRoomList()}
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
