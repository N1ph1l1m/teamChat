import React from "react";
import { Link } from "react-router-dom";
import RoomListItem from "../../Shared/roomListItem/roomListItem";
import styles from "../../App/Styles/roomList.module.css";
import { MdOutlineTaskAlt } from "react-icons/md";

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
            room.name.includes(authUser) && room.current_users.length === 2
        )
        .sort((a, b) => {
          const dateA = new Date(a.last_message?.created_at || 0);
          const dateB = new Date(b.last_message?.created_at || 0);
          return dateB - dateA;
        })
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
          return link ? (
            <div className={styles.roomListChats}>
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
              <RoomListItem
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

export function GroupRoomList({
  roomList,
  link,
  selectedRooms,
  handleRoomSelect,
  authUser,
}) {
  return (
    <>
      {roomList
        .filter(
          (room) =>
            room.current_users.some((user) => user.username === authUser) &&
            room.current_users.length > 2
        )
        //.filter((room) => )
        .map((room) => {
          const capitalized =
            room.name.charAt(0).toUpperCase() + room.name.slice(1);
          return link ? (
            <div className={styles.roomListChats}>
              <Link
                key={room.pk}
                to={`grchats/${room.pk}`}
                style={{ textDecoration: "none" }}
                // onClick={() => CreateRoom(user.username)}
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
