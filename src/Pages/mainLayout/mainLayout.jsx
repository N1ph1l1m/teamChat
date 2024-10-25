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
import { useState, useEffect } from "react";
import withAuthentication from "../../App/Utils/withAuthentication";
import CreateGroupRoom from "../../Entities/api/CreateGroupName.jsx";
import CreateRoom from "../../Entities/api/createRoom";
import ModalCreateGroup from "../../Widgets/modalCreateGroup/modalCreateGroup.jsx";
import joinroom from "../../Entities/api/joinroom";
import Badge from "../../Shared/badge/badge.jsx";
import styles from "../../App/Styles/mainLayout.module.css";
import userLogo from "../../App/images/userAvatar.png"

function MainLayout() {
  const [userlist, setUserList] = useState([]);
  const [roomList, setRoomList] = useState([]);
  const [isOpen, setOpen] = useState(false);
  const [group, setGroup] = useState([]);
  const [groupName, setGroupName] = useState();
  const [selectedUsers, setSelectedUsers] = useState([]);
  const authUser = localStorage.getItem("username");

  function UserList() {
    return (
      <>
        {userlist
          .filter((user) => user.username !== authUser)

          .map((user, index) => {
            const upName =
              user.username.charAt(0).toUpperCase() + user.username.slice(1);
            return (
              <>
                <Link></Link>
                <NaviItem
                  key={index}
                  icon={
                    <img src={user.photo} alt={`${user.username}'s avatar`} />
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
    //console.log(roomList.current_users)
    return (
      <>
        {roomList
          .filter((room) => room.name.includes(authUser))
          .map((room) => {
            const newName = room.name
              .replace(authUser, "")
              .replace(/^_+|_+$/g, "")
              .trim();
            const capitalized =
              newName.charAt(0).toUpperCase() + newName.slice(1);
            const otherUser = room.current_users.find(
              (user) => user.username !== authUser
            );
            const avatar = otherUser ? otherUser.photo : userLogo;
            return (
              <Link key={room.pk} to={`chats/${room.pk}`}>
                <NaviItem
                  icon={<img src={avatar} alt={"avatar"} />}
                  tittle={capitalized}
                  badgeCount={room.message.length}
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
                to={`grchats/${room.pk}`}
                // onClick={() => CreateRoom(user.username)}
              >
                <NaviItem
                  icon={<MdOutlineTaskAlt color="black" size="20" />}
                  tittle={capitalized}
                  badgeCount={room.message.length}
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
    console.log("click");
    setOpen(true);
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
        return prevSelectedUsers.filter((user) => user.username !== username);
      } else {
        return [...prevSelectedUsers, { username, photo }];
      }
    });
  };

  function formGroupChat() {
    return (
      <>
        <div className={styles.headerModel}>
          <div className={styles.selectAvatar}></div>
          <div className={styles.inputNameGroup}>
            <span className={styles.modalTitle}>Название группы</span>
            <input onChange={(e) => handleInputChangeName(e)} />
            <ul className={styles.selectedUsers}>
              {selectedUsers.map((user) => (
                <div className={styles.userBadge}>
                  <img
                    className={styles.liAvatar}
                    src={user.photo}
                    alt={user.name}
                  />
                  <li className={styles.selectedUsersItems} key={user}>
                    {user.username}
                  </li>
                </div>
              ))}
            </ul>
          </div>
        </div>

        <div className={styles.wrapCheckBox}>
          {userlist
            .filter((user) => user.username !== authUser)
            .map((user) => {
              const upName =
                user.username.charAt(0).toUpperCase() + user.username.slice(1);
              return (
                <>
                  <label
                    className={styles.checkBoxWrap}
                    key={user.id}
                    htmlFor={user.id}
                  >
                    <img
                      className={styles.checkboxUserAvatar}
                      src={user.photo}
                      alt={user.username}
                    />
                    <input
                      type="checkbox"
                      className={styles.checkbox}
                      id={user.id}
                      checked={selectedUsers.some(
                        (selectedUser) =>
                          selectedUser.username === user.username
                      )}
                      onChange={() =>
                        handleCheckboxChange(user.username, user.photo)
                      }
                    />
                    <span className={styles.checkboxLabel}>{upName}</span>
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
      <div className={styles.mainWrap}>
        <ModalCreateGroup
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
                  icon={<MdOutlineTaskAlt color="black" size="20" />}
                  tittle="Задачи"
                  badgeCount="3"
                />
              </Link>

              <Link to="/auto" className="newLink">
                <NaviItem
                  icon={<MdOutlineTaskAlt color="black" size="20" />}
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
        <div className={styles.mainOutletWrap}>
          <div className={styles.mainOutletItem}>
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}

export default MainLayout;
