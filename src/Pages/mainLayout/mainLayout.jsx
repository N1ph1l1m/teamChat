import React from "react";
import Nav from "../../Widgets/nav/nav";
import NaviItem from "../../Shared/navItem/navItem.jsx";
import DropDown from "../../Shared/dropDown/dropDown";
import { MdOutlineTaskAlt } from "react-icons/md";
import { Link, Outlet } from "react-router-dom";
import "../../App/Styles/link.scss";
import { getData, getRoomLostWebSocket } from "../../Entities/api/getUserList";
import { useState, useEffect } from "react";
import withAuthentication from "../../App/Utils/withAuthentication";
import CreateGroupRoom from "../../Entities/api/CreateGroupName.jsx";
import CreateRoom from "../../Entities/api/createRoom";
import ModalCreateGroup from "../../Widgets/modalCreateGroup/modalCreateGroup.jsx";
import joinroom from "../../Entities/api/joinroom";
import styles from "../../App/Styles/mainLayout.module.css";
import userLogo from "../../App/images/userAvatar.png";
import { RoomList, GroupRoomList } from "../../Entities/Lists/roomList.jsx";
import Icon from "../../Shared/icon/icon.jsx";
import { MdAddAPhoto } from "react-icons/md";
import { MdNoPhotography } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { addRoomList } from "../../Features/store_redux/recipe/recipe.jsx";
import { getDataTest } from "../../Entities/api/getUserList";
import { GoPlus } from "react-icons/go";
import MenuIcon from "../../Shared/menuIcons/menuIcons.jsx";
import chat from "../../App/Icons/chat.png";
import groupIcon from "../../App/Icons/groupChat.png";
import contacts from "../../App/Icons/contacts.png"
import Input from "../../Shared/input/input.jsx";
import { current } from "@reduxjs/toolkit";
function MainLayout() {
  const [userlist, setUserList] = useState([]);
  // const [roomList, setRoomList] = useState([]);
  const [isOpenModalCreateGroup, setModalCreateGroup] = useState(false);
  const [groupName, setGroupName] = useState();
  const [selectedUsers, setSelectedUsers] = useState([]);
  const authUser = localStorage.getItem("username");
  const [avatarGroup, setAvatarGroup] = useState("");
  const [avatarPrew, setAvatarPrew] = useState("");
  const [isDeleteAvatar, setDeleteAvatar] = useState(false);
  const roomList = useSelector((state) => state.roomList.roomList);
  const [chatList,setChatList] = useState(true);
  const [chatGroupList,setChatGroupList] = useState(false);
  const [contactsList,setContactsList] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    addRoomList(dispatch);
  }, []);

  useEffect(() => {
    if (!chatList) return;

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


  // function linkToMessage(id){
  //   let  user = userlist.find((user)=>user.id === id )
  //   let authUsr = userlist.find((user)=>user.username === authUser )
  //   // console.log(authUser)
  //   // console.log(user.username)
  //     roomList.filter((current)=>{
  //     if(Array.isArray(current.current_users)){
  //       return current.current_users.some((currentUser)=>currentUser.username === user.username   && currentUser.username === authUsr )
  //     }})
  //     .map((current)=>{
  //       console.log(current);
  //     })

  // }

  function linkToMessage(id) {
    // Находим пользователя по id и авторизованного пользователя
    const user = userlist.find((user) => user.id === id);
    const authUsr = userlist.find((user) => user.username === authUser);

    // Проверяем, существуют ли user и authUsr
    if (!user) {
      console.error("User not found");
      return;
    }
    if (!authUsr) {
      console.error("Authorized user not found");
      return;
    }

    // Фильтруем комнаты, где только user и authUsr
    const filteredRooms = roomList.filter((current) => {
      if (Array.isArray(current.current_users)) {
        const usernames = current.current_users.map((currentUser) => currentUser.username);

        // Проверяем, что в массиве только user и authUsr
        return (
          usernames.length === 2 &&
          usernames.includes(user.username) &&
          usernames.includes(authUsr.username)
        );

      }
      return false;
    });

    // Выводим отфильтрованные комнаты
    filteredRooms.forEach((current) => {
      console.log(current);
    });
  }





  function UserList() {
    return (
      <>
        {userlist
          .filter((user) => user.username !== authUser)

          .map((user, index) => {
            const upName =
              user.username.charAt(0).toUpperCase() + user.username.slice(1);
            return (
              < >
                <Link   onClick={()=>{linkToMessage(user.id)}} >
                <NaviItem
                  key={index}
                  icon={
                    <img src={user.photo} alt={`${user.username}'s avatar`} />
                  }
                  tittle={upName}
                  // badgeCount={user.id}
                />
                </Link>

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


  const renderList = () =>{
    const chatRender = chatList && !chatGroupList;
    const groupRender = !chatList && chatGroupList;
    const contactRender = !chatList && !chatGroupList && contactsList;
    if(chatRender){
      return(
        <RoomList
        roomList={roomList}
        link
        authUser={authUser}
        userLogo={userLogo}
      />
      )
    }
    if(groupRender){
      return(<>
       <div className={styles.menuGroup}>
        <input  placeholder="Поиск" type="text" className={styles.searchGroup} />
          <button className={styles.createGroup} onClick={() => {
                  getData("users/", setUserList);
                  showModalGroupChat();
                }}> <GoPlus  color="rgba(0, 0, 0, 0.283)" size="25" /> </button>
       </div>
          <GroupRoomList roomList={roomList} authUser={authUser} link />
      </>

      )
    }
    if(contactRender){
      return(
      <>
        {UserList()}
      </>
      )
    }


  }
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

       <div className={styles.contentWrap}>
       <div className={styles.navWrap}>
        <Nav
          menuNav={<>
            <MenuIcon icon={chat} title="Чаты"
            handleClick = {()=> {
              setChatList(true)
              setChatGroupList(false)}}
            />
            <MenuIcon icon={groupIcon} title={"Группа"}
                handleClick = {()=> {setChatList(false)
                  setChatGroupList(true)}}
            />
            <MenuIcon icon={contacts} title={"Контакты"}
                  handleClick = {()=>
                  {
                    getData("users/", setUserList)
                    setChatList(false)
                    setChatGroupList(false)
                    setContactsList(true)
                  }}
            />
          </>}
          navItem={
            <>
            {renderList()}
            </>
          }
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
