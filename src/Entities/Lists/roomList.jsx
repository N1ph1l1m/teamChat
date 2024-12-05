import React from "react";
import { Link} from "react-router-dom";
import NaviItem from "../../Shared/navItem/naviItem";
import styles  from "../../App/Styles/roomList.module.css"
import { MdOutlineTaskAlt } from "react-icons/md";

export  function RoomList({
  roomList,
  authUser,
  userLogo,
  link,
  selectedRooms,
  handleRoomSelect
}) {
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
            return link ? (
              <div className={styles.roomListChats}>
              <Link key={room.pk} to={`chats/${room.pk}`}>
                <NaviItem
                  icon={<img src={avatar} alt={"avatar"} />}
                  tittle={capitalized}
                  badgeCount={room.message.length}
                />
              </Link>
              </div>

            ) : (
              <label
                key={room.pk}
                className={styles.checkBoxWrap}
              >
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


export  function GroupRoomList({
  roomList,
  link,
  selectedRooms,
  handleRoomSelect
}) {


    return (
      <>
        {roomList
          .filter((room) => room.current_users.length > 2)
          .map((room) => {
            const capitalized =
              room.name.charAt(0).toUpperCase() + room.name.slice(1);
            return link ? (
              <div className={styles.roomListChats}>

              <Link
                key={room.pk}
                to={`grchats/${room.pk}`}
                // onClick={() => CreateRoom(user.username)}
              >
                <NaviItem
                  icon={<img src={room.photo_room} alt = "groupPhoto"/>}
                  tittle={capitalized}
                  badgeCount={room.message.length}
                />
              </Link>
              </div>

            ) : (
              <label
                key={room.pk}
                className={styles.checkBoxWrap}
              >
                <NaviItem
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
