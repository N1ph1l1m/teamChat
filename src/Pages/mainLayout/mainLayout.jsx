import {React , useCallback} from "react";
import Nav from "../../Widgets/nav/nav";
import NaviItem from "../../Shared/navItem/navItem.jsx";
import { Outlet, useNavigate } from "react-router-dom";
import "../../App/Styles/link.scss";
import { useState, useEffect } from "react";
import CreateGroupRoom from "../../Entities/api/CreateGroupRoom.js";
import { linkToMessage } from "../../Entities/api/CreateNavigateRoom.js";
import ModalCreateGroup from "../../Widgets/modalCreateGroup/modalCreateGroup.jsx";
import styles from "../../App/Styles/mainLayout.module.css";
import userLogo from "../../App/images/userAvatar.png";
import {
  RoomList,
  RoomListLoading,
  GroupRoomList,
  UserList,
} from "../../Widgets/Lists/roomList.jsx";
import { useDispatch, useSelector } from "react-redux";
import { addRoomList } from "../../store/actions/addRoomList.jsx";
import { HeaderPanel } from "../../Shared/searchPanel/searchPanel.jsx";
import MenuIcon from "../../Shared/menuIcons/menuIcons.jsx";
import chat from "../../App/Icons/chat.png";
import groupIcon from "../../App/Icons/groupChat.png";
import contacts from "../../App/Icons/contacts.png";
import { NoMessages } from "../../Shared/NoMessages/NoMessages.jsx";
import { Parameters } from "../../App/Parameters/Parametrs.js";
import {
  GlobalWebSocket,
  getData,
  userAuthId,
} from "../../Entities/api/GetServerData.js";

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
  const isWebSocket = useSelector((state) => state.isOpenSocket.isOpenSocket);
  const [chatList, setChatList] = useState(true);
  const [chatGroupList, setChatGroupList] = useState(false);
  const [contactsList, setContactsList] = useState(false);
  const [isSearch, setIsSearch] = useState()
  const [searchValue, setSearchValue] = useState("");
  const dispatch = useDispatch();



  useEffect(() => {
    async function render() {
      console.log("dispatch - main layout");
      addRoomList(dispatch);
      await getData("users/", setUserList);
      userAuthId(userlist);
    }
    render();
  }, []);


  useEffect(() => {
    addRoomList(dispatch);
  }, [!roomList]);

  useEffect(() => {
    if (!chatList) return;
    GlobalWebSocket(Parameters.token, dispatch);
  }, [chatList]);

  useEffect(() => {
    if (!chatGroupList) return;
    GlobalWebSocket(Parameters.token, dispatch);
  }, [chatGroupList]);

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
      setAvatarPrew(reader.result);
    };
    reader.onerror = () => {
      console.log(reader.error);
    };
  };

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
          <HeaderPanel
               title={"Чаты"} />
          {isLoading && roomList.length === 0 ? (
            <RoomListLoading />
          ) : isLoading && filterRoomList.length === 0 ? (
            <div className={styles.noMessageWrap}>
              <NoMessages
                text={
                  <>
                    Сообщений нет. <br />
                    Перейдите во вкладку '
                    <span
                      style={{ color: "#105c9f", cursor: "pointer" }}
                      onClick={() => {
                        handlerMenuNav(
                          setContactsList,
                          setChatList,
                          setChatGroupList
                        );
                      }}
                    >
                      Контанты
                    </span>
                    ' для начала диалога с пользователями.
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
            <HeaderPanel
              createGroup={() => {
                getData("users/", setUserList);
                showModalGroupChat();
              }}
              title={"Группы"}
            />


            {roomList && roomList.length === 0 ? (
              <RoomListLoading />
            ) : (
              <GroupRoomList
                roomList={roomList}
                authUser={Parameters.authUser}
                link
                isSearch={isSearch}
              />
            )}
          </>
        </>
      );
    }
    if (contactRender) {
      return (
        <>
          <HeaderPanel
                 title={"Контакты"}
          />
          {userlist && userlist.length === 0 ? (
            <RoomListLoading />
          ) : (
            <UserList userlist={userlist} roomList={roomList}/>
          )}{" "}
        </>
      );
    }
  };
  function handlerMenuNav(set1, set2, set3) {
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
            CreateGroupRoom(groupName, avatarGroup, selectedUsers , handleCancel);
            addRoomList(dispatch);
          }}
          avatarGroup={avatarGroup}
          setDeleteAvatar={setDeleteAvatar}
          handleAvatarGroup={handleAvatarGroup}
          setAvatarGroup={setAvatarGroup}
          isDeleteAvatar={isDeleteAvatar}
          avatarPrew={avatarPrew}
          handleInputChangeName={handleInputChangeName}
          selectedUsers={selectedUsers}
          userlist={userlist}
          handleCheckboxChange={handleCheckboxChange}
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
                      handlerMenuNav(
                        setChatList,
                        setChatGroupList,
                        setContactsList
                      );
                    }}
                  />
                  <MenuIcon
                    icon={groupIcon}
                    title={"Группы"}
                    handleClick={() => {
                      handlerMenuNav(
                        setChatGroupList,
                        setChatList,
                        setContactsList
                      );
                      addRoomList(dispatch);
                    }}
                  />
                  <MenuIcon
                    icon={contacts}
                    title={"Контакты"}
                    handleClick={() => {
                      handlerMenuNav(
                        setContactsList,
                        setChatList,
                        setChatGroupList
                      );
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
