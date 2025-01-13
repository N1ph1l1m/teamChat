
import { Parameters } from "../../App/Parameters/Parametrs";
import styles from "../../App/Styles/userList.module.css"
import { RoomListItem } from "../../Shared/roomListItem/roomListItem";
export const UserList = ({userList,linkToMessage} ) => {

    return (
      <>
        {userList
          .filter((user) => user.username !== Parameters.authUser)
          .map((user, index) => {
            const upName =
              user.username.charAt(0).toUpperCase() + user.username.slice(1);
            return (
              <div
                className={styles.userListWrap}
                key={index}
                onClick={linkToMessage}
              >
                <RoomListItem
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
