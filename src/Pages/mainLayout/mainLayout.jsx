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
import Modal from "../../Widgets/createGroupChat/modal";

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
  const [isOpen, setOpen] = useState(false);
  const [group, setGroup] = useState([]);
  const [groupName, setGroupName] = useState([]);

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
            // Удаляем "admin", убираем нижнее подчеркивание в начале и в конце, и делаем первую букву заглавной
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
  const [selectedUsers, setSelectedUsers] = useState([]);

  const handleCheckboxChange = (id) => {
    if (selectedUsers.includes(id)) {
      // Если пользователь уже выбран, убираем его из массива
      setSelectedUsers(selectedUsers.filter((userId) => userId !== id));
    } else {
      // Иначе добавляем его в массив
      setSelectedUsers([...selectedUsers, id]);
    }
  };

  function checkRadio(id) {
    setGroup(id);
    console.log(group);
  }
  function SelectUser() {
    return (
      <>
        {userlist
          .filter((user) => user.username !== localStorage.getItem("username"))
          .map((user) => {
            const upName =
              user.username.charAt(0).toUpperCase() + user.username.slice(1);
            return (
              <div key={user.id}>
                <br />
                <input
                  type="checkbox"
                  id={user.id}
                  checked={selectedUsers.includes(user.id)}
                  onChange={() => handleCheckboxChange(user.id)}
                />
                <label htmlFor={user.id}>{upName}</label>
              </div>
            );
          })}
        <div>
          <h3>Selected Users:</h3>
          <ul>
            {selectedUsers.map((id) => (
              <li key={id}>{id}</li>
            ))}
          </ul>
        </div>
      </>
    );
  }

  function handleSubmit() {
    console.log("Submit function!");
    console.log("Select users = " + selectedUsers);
    console.log("Select users = " + groupName);

    setOpen(false);
  }

  function handleCancel() {
    setOpen(false);
    setSelectedUsers([]);
  }
  function createGroupChat() {
    setOpen(true);
    console.log(isOpen);
    return <></>;
  }

  const handleInputChangeName = (e) => {
    setGroupName(e.target.value);
    console.log(groupName);
    if (e.target.value === "") {
      console.log("username has left blank");
    }
  };

  function formGroupChat() {
    return (
      <>
        <input
          placeholder="Введите название чата"
          onChange={(e) => handleInputChangeName(e)}
        ></input>
        <br />
        <span>Выберите участников чата</span>

        {userlist
          .filter((user) => user.username !== localStorage.getItem("username"))
          .map((user) => {
            const upName =
              user.username.charAt(0).toUpperCase() + user.username.slice(1);
            return (
              <div key={user.id}>
                <br />
                <input
                  type="checkbox"
                  id={user.id}
                  checked={selectedUsers.includes(user.id)}
                  onChange={() => handleCheckboxChange(user.id)}
                />
                <label htmlFor={user.id}>{upName}</label>
              </div>
            );
          })}
        <div>
          <h3>Selected Users:</h3>
          <ul>
            {selectedUsers.map((id) => (
              <li key={id}>{id}</li>
            ))}
          </ul>
        </div>
      </>
    );
  }
  const groupChat = formGroupChat();
  return (
    <>
      <Main>
        <Modal
          title="Создать групповой чат"
          isOpen={isOpen}
          onCancel={handleCancel}
          onSubmit={handleSubmit}
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
                plusClick={createGroupChat}
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
