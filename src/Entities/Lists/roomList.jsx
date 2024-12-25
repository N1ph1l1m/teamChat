import React from "react";
import { Link } from "react-router-dom";
import {RoomListItem , SimpleItem} from "../../Shared/roomListItem/roomListItem";
import styles from "../../App/Styles/roomList.module.css";
import { MdOutlineTaskAlt } from "react-icons/md";
import NaviItem from "../../Shared/navItem/navItem";


export function RoomList({
  roomList,
  authUser,
  userLogo,
  link,
  selectedRooms,
  handleRoomSelect,
}) {
  return (
    <>
      {roomList
        .filter(
          (room) =>
            room.name.includes(authUser) && room.current_users.length === 2 &&
            room.message.length > 0
        )
        .sort((a, b) => {
          const dateA = new Date(a.last_message?.created_at || 0);
          const dateB = new Date(b.last_message?.created_at || 0);
          return dateB - dateA;
        })
        .map((room, index) => {
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
          const uniqueKey = `${room.pk}-${room.last_message?.created_at}`;

          return link ? (
            <div className={styles.roomListChats} key={uniqueKey}>
              <Link
                key={room.pk}
                to={`chats/${room.pk}`}
                style={{ textDecoration: "none" }}
              >
                <RoomListItem
                  icon={<img src={avatar} alt={"avatar"} />}
                  tittle={capitalized}
                  badgeCount={room.message.length}
                  text={room.last_message.text}
                  time={room.last_message.created_at}
                  is_read={room.last_message.is_read}
                  user={room.last_message.user}
                  authUser={authUser}
                  photo={room.last_message.images}
                  document={room.last_message.documents}
                  forwarded_messages={room.last_message.forwarded_messages}
                />
              </Link>
            </div>
          ) : (
            <label key={room.pk} className={styles.checkBoxWrap}>
              <NaviItem
                icon={<img src={avatar} alt={"avatar"} />}
                tittle={capitalized}
              />
              <input
                type="checkbox"
                onChange={() => handleRoomSelect(room.pk)}
                checked={selectedRooms.includes(room.pk)}
                className={styles.checkboxRoomList}
              />
            </label>
          );
        })}
    </>
  );
}

export function RoomListLoading() {
  const RoomListLoading = () => {
    const elements = [];
    for (let i = 0; i < 12; i++) {
      elements.push(
        <div key={i} className={styles.roomListChats}>
          <SimpleItem

          />
          {/* <p>Text</p> */}
        </div>
      );
    }
    return elements;
  };

  return <>{RoomListLoading()}</>;
}


export function GroupRoomList({
  roomList,
  link,
  selectedRooms,
  handleRoomSelect,
  authUser,
  plusClick,
}) {
  return (
    <div className={styles.groupListWrap}>
      {roomList
        .filter(
          (room) =>
            room.current_users.some((user) => user.username === authUser) &&
            room.current_users.length > 2
        )
        .map((room) => {
          const capitalized =
            room.name.charAt(0).toUpperCase() + room.name.slice(1);

          const uniqueKey = `${room.pk}-${room.last_message?.created_at}`;

          return link ? (
            <div className={styles.roomListChats} key={uniqueKey}>
              <Link
                key={room.pk}
                to={`grchats/${room.pk}`}
                style={{ textDecoration: "none" }}
              >
                 <RoomListItem
                  icon={<img src={room.photo_room} alt="groupPhoto" />}
                  tittle={capitalized}
                  badgeCount={room.message.length}
                  text={room.last_message.text}
                  time={room.last_message.created_at}
                  is_read={room.last_message.is_read}
                  user={room.last_message.user}
                  authUser={authUser}
                  photo={room.last_message.images}
                  document={room.last_message.documents}
                  forwarded_messages={room.last_message.forwarded_messages}
                />

              </Link>
            </div>
          ) : (
            <label key={room.pk} className={styles.checkBoxWrap}>
              <RoomListItem
                icon={<MdOutlineTaskAlt color="black" size="20" />}
                tittle={capitalized}
                photo={room.last_message.images}
                document={room.last_message.documents}
                forwarded_messages={room.last_message.forwarded_messages}
              />
              <input
                type="checkbox"
                onChange={() => handleRoomSelect(room.pk)}
                checked={selectedRooms.includes(room.pk)}
                className={styles.checkboxRoomList}
              />
            </label>
          );
        })}
    </div>
  );
}
