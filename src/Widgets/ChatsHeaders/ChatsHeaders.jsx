import { UserProfile } from "../../Shared/UserProfile/UserProfile";

export const ChatHeader = ({ room, authUserId, setModal, status, menu}) => {
  try {
    let nameRoom = "";
    let userAvatar = "";
    let userActive = "";
    room.current_users
      .filter((user) => user.id !== authUserId)
      .forEach((user) => {
        nameRoom =
          user.username.charAt(0).toUpperCase() + user.username.slice(1);
        userAvatar = user.photo;
        userActive = user.last_active;
      });
    return (
      <UserProfile
        userAvatar={userAvatar}
        nameRoom={nameRoom}
        setModal={setModal}
        userActive={userActive}
        status={status}
        menu = {menu}
      />
    );
  } catch (error) {
    console.log(error);
  }
};

export const GroupChatHeader = ({ room, setModal }) => {
  try {
    let nameRoom = room.name;
    let userAvatar = room.photo_room;

    return (
      <UserProfile
        userAvatar={userAvatar}
        nameRoom={nameRoom}
        setModal={setModal}
      />
    );
  } catch (error) {
    console.log(error);
  }
};
