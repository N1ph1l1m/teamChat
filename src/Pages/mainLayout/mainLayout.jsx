import React from "react";
import Nav from "../../Widgets/nav/nav";
import NaviItem from "../../Shared/navItem/navItem.jsx";
import DropDown from "../../Shared/dropDown/dropDown";
import { MdOutlineTaskAlt } from "react-icons/md";
import { Link, Outlet } from "react-router-dom";
import "../../App/Styles/link.scss";
import { getData , getRoomLostWebSocket} from "../../Entities/api/getUserList";
import { useState, useEffect } from "react";
import withAuthentication from "../../App/Utils/withAuthentication";
import CreateGroupRoom from "../../Entities/api/CreateGroupName.jsx";
import CreateRoom from "../../Entities/api/createRoom";
import ModalCreateGroup from "../../Widgets/modalCreateGroup/modalCreateGroup.jsx";
import joinroom from "../../Entities/api/joinroom";
import Badge from "../../Shared/badge/badge.jsx";
import styles from "../../App/Styles/mainLayout.module.css";
import userLogo from "../../App/images/userAvatar.png";
import { RoomList, GroupRoomList } from "../../Entities/Lists/roomList.jsx";
import Icon from "../../Shared/icon/icon.jsx";
import { MdAddAPhoto } from "react-icons/md";
import { MdNoPhotography } from "react-icons/md";

function MainLayout() {
  const [userlist, setUserList] = useState([]);
  const [roomList, setRoomList] = useState([]);
  const [isOpenModalCreateGroup, setModalCreateGroup] = useState(false);
  const [groupName, setGroupName] = useState();
  const [selectedUsers, setSelectedUsers] = useState([]);
  const authUser = localStorage.getItem("username");
  const [avatarGroup, setAvatarGroup] = useState("");
  const [avatarPrew, setAvatarPrew] = useState("");
  const [isDeleteAvatar, setDeleteAvatar] = useState(false);


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

  function handleCancel() {
    setModalCreateGroup(false);
    setSelectedUsers([]);
    setAvatarGroup("");
    setGroupName("");
  }
  function showModalGroupChat() {
    setModalCreateGroup(true);
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

  async function getRoomList(){
    const data = await  getData("chat/rooms", setRoomList) ;
    return data;
  }


  const handleAvatarGroup = (e) => {
    let files = e.target.files[0];
    setAvatarGroup(files);
    console.log(files.name);
    const reader = new FileReader();
    reader.readAsDataURL(files);
    reader.onload = () => {
      console.log(avatarGroup.name);
      setAvatarPrew(reader.result);
    };
    reader.onerror = () => {
      console.log(reader.error);
    };
  };

  function formGroupChat() {
    return (
      <>
        <div className={styles.headerModel}>
          {!avatarGroup ? (
            <div
              className={styles.selectAvatarWrap}
              onMouseLeave={() => setDeleteAvatar(false)}
            >
              <input
                className={styles.inputAvatar}
                type="file"
                id="avatarGroup"
                name="avatarGroup"
                accept="image/*"
                onChange={handleAvatarGroup}
              />
              <label htmlFor="avatarGroup">
                <Icon onClick={() => setAvatarGroup("")}>
                  <MdAddAPhoto color="black" size="40" />
                </Icon>
              </label>
            </div>
          ) : (
            <>
              <div
                className={styles.selectAvatarWrap}
                onMouseEnter={() => setDeleteAvatar(true)}
                onMouseLeave={() => setDeleteAvatar(false)}
              >
                {!isDeleteAvatar ? (
                  <img
                    src={avatarPrew}
                    alt="ava"
                    className={styles.inputAvatarWrap}
                  />
                ) : (
                  <Icon
                    onClick={() => {
                      setAvatarGroup("");
                      console.log("delete");
                    }}
                  >
                    <MdNoPhotography color="rgb(131, 130, 130)" size="30" />
                  </Icon>
                )}
              </div>
            </>
          )}

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
          isOpen={isOpenModalCreateGroup}
          onCancel={handleCancel}
          onSubmit={() => {
                        CreateGroupRoom(groupName, avatarGroup, selectedUsers);
            handleCancel();
          }}
          children={groupChat}
        />
        <Nav
          navItem={
            <>

              <DropDown
                title="Чаты"
                onClick={getRoomList}
                content={
                  <RoomList
                    roomList={roomList}
                    link
                    authUser={authUser}
                    userLogo={userLogo}
                  />
                }
              />

              <DropDown
                title="Груповые чаты"
                onClick={() => (
                  getData("users/", setUserList),
                  getData("chat/rooms", setRoomList)
                )}
                plusClick={showModalGroupChat}
                content={
                  <GroupRoomList roomList={roomList} authUser={authUser} link />
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
