import { UserProfile } from "../../Shared/UserProfile/UserProfile";
import { getPluralForm } from "../../Entities/PluralForm/getPluralForm";
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

export const GroupChatHeader = ({ room, setModal ,  menu,  showModalInfo }) => {
  try {
    let nameRoom = room.name;
    let userAvatar = room.photo_room;
    let usersCount = `${room.current_users.length} ${getPluralForm(room.current_users.length,'участник' , 'участника' , 'участников')}`

    return (
      <UserProfile
        userAvatar={userAvatar}
        nameRoom={nameRoom}
        setModal={setModal}
        menu = {menu}
        users = {usersCount}
        showModalInfo = {showModalInfo}
      />
    );
  } catch (error) {
    console.log(error);
  }
};
