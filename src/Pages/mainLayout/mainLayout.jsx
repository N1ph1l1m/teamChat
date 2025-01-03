import React from "react";
import Nav from "../../Widgets/nav/nav";
import NaviItem from "../../Shared/navItem/navItem.jsx";
import { Outlet, useNavigate } from "react-router-dom";
import "../../App/Styles/link.scss";
import { getData } from "../../Entities/api/getUserList";
import { useState, useEffect } from "react";
import CreateGroupRoom from "../../Entities/api/CreateGroupName.jsx";
import CreateRoom from "../../Entities/api/createRoom";
import ModalCreateGroup from "../../Widgets/modalCreateGroup/modalCreateGroup.jsx";
import styles from "../../App/Styles/mainLayout.module.css";
import userLogo from "../../App/images/userAvatar.png";
import {
  RoomList,
  RoomListLoading,
  GroupRoomList,
} from "../../Entities/Lists/roomList.jsx";
import Icon from "../../Shared/icon/icon.jsx";
import { MdAddAPhoto } from "react-icons/md";
import { MdNoPhotography } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { addRoomList } from "../../store/actions/addRoomList.jsx";
import { getDataTest } from "../../Entities/api/getUserList";
import { GoPlus } from "react-icons/go";
import MenuIcon from "../../Shared/menuIcons/menuIcons.jsx";
import chat from "../../App/Icons/chat.png";
import groupIcon from "../../App/Icons/groupChat.png";
import contacts from "../../App/Icons/contacts.png";
import { NoMessages } from "../../Shared/NoMessages/NoMessages.jsx";
import { Parameters } from "../../App/Parameters/Parametrs.js";

function MainLayout() {
  const [userlist, setUserList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isOpenModalCreateGroup, setModalCreateGroup] = useState(false);
  const [groupName, setGroupName] = useState();
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [avatarGroup, setAvatarGroup] = useState("");
  const [avatarPrew, setAvatarPrew] = useState("");
  const [isDeleteAvatar, setDeleteAvatar] = useState(false);
  const roomList = useSelector((state) => state.roomList.roomList);
  const [chatList, setChatList] = useState(true);
  const [chatGroupList, setChatGroupList] = useState(false);
  const [contactsList, setContactsList] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    addRoomList(dispatch);
  }, []);

  useEffect(() => {
    if (!chatList) return;

    const timer = setInterval(async () => {
      try {
        addRoomList(dispatch);
      } catch (error) {
        console.error("Ошибка при загрузке списка комнат:", error);
      }
    }, 5000);

    return () => clearInterval(timer);
  }, [roomList, dispatch, chatList]);

  useEffect(() => {
    if (!chatGroupList) return;

    const timer = setInterval(async () => {
      try {
        const newRoomList = await getDataTest("chat/rooms");
        if (JSON.stringify(newRoomList) !== JSON.stringify(roomList)) {
          dispatch({ type: "ADD_ROOMLIST", payload: newRoomList });
        }
      } catch (error) {
        console.error("Ошибка при загрузке списка комнат:", error);
      }
    }, 5000);

    return () => clearInterval(timer);
  }, [roomList, dispatch, chatGroupList]);

  useEffect(() => {
    if (roomList.length === 0) {
      const timeout = setTimeout(() => setIsLoading(false), 10);

      return () => clearTimeout(timeout);
    }
    if (roomList.length > 0) {
      const timeout = setTimeout(() => setIsLoading(true), 100);

      return () => clearTimeout(timeout);
    }
  }, [roomList]);

  function linkToMessage(id, navigate) {
    const user = userlist.find((user) => user.id === id);
    const authUsr = userlist.find(
      (user) => user.username === Parameters.authUser
    );

    if (!user) {
      console.error("User not found");
      return;
    }
    if (!authUsr) {
      console.error("Authorized user not found");
      return;
    }

    const filteredRooms = roomList.filter((current) => {
      if (Array.isArray(current.current_users)) {
        const usernames = current.current_users.map(
          (currentUser) => currentUser.username
        );

        return (
          usernames.length === 2 &&
          usernames.includes(user.username) &&
          usernames.includes(authUsr.username)
        );
      }
      return false;
    });

    if (filteredRooms && filteredRooms.length === 0) {
      CreateRoom(user.username);
      return;
    }

    if (filteredRooms.length === 1) {
      navigate(`/chats/${filteredRooms[0].pk}`);
    }
  }

  const UserList = () => {
    const navigate = useNavigate();

    return (
      <>
        {userlist
          .filter((user) => user.username !== Parameters.authUser)
          .map((user, index) => {
            const upName =
              user.username.charAt(0).toUpperCase() + user.username.slice(1);
            return (
              <div
                className={styles.userListWrap}
                key={index}
                onClick={() => {
                  linkToMessage(user.id, navigate);
                }}
              >
                <NaviItem
                  icon={
                    <img src={user.photo} alt={`${user.username}'s avatar`} />
                  }
                  tittle={upName}
                />
              </div>
            );
          })}
      </>
    );
  };

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

  const FormGroupChat = () => {
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
            .filter((user) => user.username !== Parameters.authUser)
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
  };

  const RenderList = () => {
    const chatRender = chatList && !chatGroupList;
    const groupRender = !chatList && chatGroupList;
    const contactRender = !chatList && !chatGroupList && contactsList;
    const filterRoomList = roomList.filter(
      (room) =>
        room.current_users &&
        room.current_users.length === 2 &&
        Array.isArray(room.message) &&
        room.message.length !== 0
    );

    if (chatRender) {
      return (
        <>
          {" "}
          {isLoading && roomList.length === 0 ? (
            <RoomListLoading />
          ) : isLoading && filterRoomList.length === 0 ? (
            <div style={{ display: "flex" }}>
              <NoMessages text={"Чатов нет"} />
            </div>
          ) : (
            <RoomList
              roomList={roomList}
              link
              authUser={Parameters.authUser}
              userLogo={userLogo}
            />
          )}
        </>
      );
    }
    if (groupRender) {
      return (
        <>
          <>
            <div className={styles.menuGroup}>
              <input
                placeholder="Поиск"
                type="text"
                className={styles.searchGroup}
              />
              <button
                className={styles.createGroup}
                onClick={() => {
                  getData("users/", setUserList);
                  showModalGroupChat();
                }}
              >
                {" "}
                <GoPlus color="rgba(0, 0, 0, 0.283)" size="25" />{" "}
              </button>
            </div>
            {roomList && roomList.length === 0 ? (
              <RoomListLoading />
            ) : (
              <GroupRoomList
                roomList={roomList}
                authUser={Parameters.authUser}
                link
              />
            )}
          </>
        </>
      );
    }
    if (contactRender) {
      return (
        <>
          {" "}
          {userlist && userlist.length === 0 ? (
            <RoomListLoading />
          ) : (
            <UserList />
          )}{" "}
        </>
      );
    }
  };

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
          children={<FormGroupChat />}
        />

        <div className={styles.contentWrap}>
          <div className={styles.navWrap}>
            <Nav
              menuNav={
                <>
                  <MenuIcon
                    icon={chat}
                    title="Чаты"
                    handleClick={() => {
                      setChatList(true);
                      setChatGroupList(false);
                    }}
                  />
                  <MenuIcon
                    icon={groupIcon}
                    title={"Группа"}
                    handleClick={() => {
                      setChatList(false);
                      setChatGroupList(true);
                    }}
                  />
                  <MenuIcon
                    icon={contacts}
                    title={"Контакты"}
                    handleClick={() => {
                      getData("users/", setUserList);
                      setChatList(false);
                      setChatGroupList(false);
                      setContactsList(true);
                    }}
                  />
                </>
              }
              navItem={<RenderList />}
            />
          </div>

          <div className={styles.mainOutletWrap}>
            <div className={styles.mainOutletItem}>
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MainLayout;
