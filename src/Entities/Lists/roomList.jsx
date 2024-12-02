import React from "react";
import { Link, Outlet } from "react-router-dom";
import NaviItem from "../../Shared/navItem/naviItem";
export default function RoomList({
  roomList,
  authUser,
  userLogo,
  link,
  onRoomSelect,
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
                <NaviItem
                  icon={<img src={avatar} alt={"avatar"} />}
                  tittle={capitalized}
                  click={() => {
                    if (onRoomSelect) onRoomSelect(room.pk);
                  }}
                />
              )}
            </>
          );
        })}
    </>
  );
}
