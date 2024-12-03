import React from "react";
import { Link} from "react-router-dom";
import NaviItem from "../../Shared/navItem/naviItem";
import styles  from "../../App/Styles/roomList.module.css"
import { hover } from "@testing-library/user-event/dist/hover";
export default function RoomList({
  roomList,
  authUser,
  userLogo,
  link,
  onRoomSelect,
  selectedRoom,
  changeRoom
}) {
  //console.log(roomList.current_users)
  return (
    <>
      {roomList
        .filter((room) => room.name.includes(authUser))
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
          return (
            <>
              {link ? (
                <Link key={room.pk} to={`chats/${room.pk}`}>
                  <NaviItem
                    icon={<img src={avatar} alt={"avatar"} />}
                    tittle={capitalized}
                    badgeCount={room.message.length}
                  />
                </Link>
              ) : (
                <label key={index}
                  className={styles.checkBoxWrap}
                  onClick={()=>{
                    if (onRoomSelect) onRoomSelect(room.pk);
                  }}>

                <NaviItem
                  icon={<img src={avatar} alt={"avatar"} />}
                  tittle={capitalized}
                />
                <input type="checkbox"
                   checked={selectedRoom === room.pk} // Отмечаем чекбокс, если это выбранный room
                   onChange={() => changeRoom}
                />
                </label>

              )}
            </>
          );
        })}
    </>
  );
}
