import React from "react";
import Nav from "../../Widgets/nav/nav";
import NaviItem from "../../Shared/navItem/navItem.jsx";
import { Outlet, useNavigate } from "react-router-dom";
import "../../App/Styles/link.scss";
import { getData } from "../../Entities/api/getUserList";
import { useState, useEffect } from "react";
import CreateGroupRoom from "../../Entities/api/CreateGroupName.jsx";
import { linkToMessage } from "../../Entities/api/createNavigateRoom.jsx";
import ModalCreateGroup from "../../Widgets/modalCreateGroup/modalCreateGroup.jsx";
import styles from "../../App/Styles/mainLayout.module.css";
import userLogo from "../../App/images/userAvatar.png";
import {
  RoomList,
  RoomListLoading,
  GroupRoomList,
} from "../../Entities/Lists/roomList.jsx";
import { useDispatch, useSelector } from "react-redux";
import { addRoomList } from "../../store/actions/addRoomList.jsx";
import { SearchPanel } from "../../Shared/searchPanel/searchPanel.jsx";
import { getDataTest } from "../../Entities/api/getUserList";
import { GoPlus } from "react-icons/go";
import MenuIcon from "../../Shared/menuIcons/menuIcons.jsx";
import chat from "../../App/Icons/chat.png";
import groupIcon from "../../App/Icons/groupChat.png";
import contacts from "../../App/Icons/contacts.png";
import { NoMessages } from "../../Shared/NoMessages/NoMessages.jsx";
import { Parameters } from "../../App/Parameters/Parametrs.js";
import { GlobalWebSocket } from "../../Features/getServerData/getServerData.js";

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
    console.log("dispatch - main layout");
    addRoomList(dispatch);
    getData("users/", setUserList);
  }, []);

  useEffect(() => {
    if (!chatList) return;
    GlobalWebSocket(Parameters.token, dispatch);
  }, [chatList]);

  useEffect(() => {
    if (!chatGroupList) return;
    GlobalWebSocket(Parameters.token, dispatch);
  }, [chatGroupList]);

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
                  linkToMessage(
                    userlist,
                    user.id,
                    Parameters,
                    roomList,
                    navigate
                  );
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
    const reader = new FileReader();
    reader.readAsDataURL(files);
    reader.onload = () => {
      // console.log(avatarGroup.name);
      setAvatarPrew(reader.result);
    };
    reader.onerror = () => {
      console.log(reader.error);
    };
  };
  // const FormGroupChat = () => {
  //   return (
  //     <>

  //     </>
  //   );
  // };

  const RenderList = () => {
    const chatRender = chatList && !chatGroupList;
    const groupRender = !chatList && chatGroupList;
    const contactRender = !chatList && !chatGroupList && contactsList;
    const filterRoomList = roomList.filter(
      (room) =>
        room.current_users &&
        room.current_users.length === 2 &&
        room.current_users.some(
          (user) => user.username === Parameters.authUser
        ) &&
        Array.isArray(room.message) &&
        room.message.length !== 0
    );

    if (chatRender) {
      return (
        <>
          <SearchPanel />
          {isLoading && roomList.length === 0 ? (
            <RoomListLoading />
          ) : isLoading && filterRoomList.length === 0 ? (
            <div className={styles.noMessageWrap}>
              <NoMessages
                text={
                  <>
                    Сообщений нет. <br />
                    Перейдите во вкладку '<span style={{color:"#105c9f" , cursor:"pointer"}}
                    onClick={()=>{
                      handlerMenuNav(setContactsList,setChatList,setChatGroupList)
                    }}>Контанты</span>' для начала диалога с
                    пользователями.
                  </>
                }
                icon
              />
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
            <SearchPanel
              createGroup={() => {
                getData("users/", setUserList);
                showModalGroupChat();
              }}
            />
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
          <SearchPanel />
          {userlist && userlist.length === 0 ? (
            <RoomListLoading />
          ) : (
            <UserList />
          )}{" "}
        </>
      );
    }
  };
 function handlerMenuNav(set1,set2,set3){
  set1(true);
  set2(false);
  set3(false);
 }

  return (
    <>
      <div className={styles.mainWrap}>
        <ModalCreateGroup
          isOpen={isOpenModalCreateGroup}
          onCancel={handleCancel}
          onSubmit={() => {
            CreateGroupRoom(groupName, avatarGroup, selectedUsers);
            addRoomList(dispatch)
            handleCancel();
          }}
          avatarGroup = {avatarGroup}
          setDeleteAvatar = {setDeleteAvatar}
          handleAvatarGroup = {handleAvatarGroup}
          setAvatarGroup = {setAvatarGroup}
          isDeleteAvatar = {isDeleteAvatar}
          avatarPrew={avatarPrew}
          handleInputChangeName = {handleInputChangeName}
          selectedUsers={selectedUsers}
          userlist={userlist}
          handleCheckboxChange = { handleCheckboxChange}
          Parameters={Parameters}
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
handlerMenuNav(setChatList,setChatGroupList,setContactsList)
                    }}
                  />
                  <MenuIcon
                    icon={groupIcon}
                    title={"Группа"}
                    handleClick={() => {
                      handlerMenuNav(setChatGroupList,setChatList,setContactsList)
                      addRoomList(dispatch)
                    }}
                  />
                  <MenuIcon
                    icon={contacts}
                    title={"Контакты"}
                    handleClick={() => {
                      handlerMenuNav(setContactsList,setChatList,setChatGroupList)
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
