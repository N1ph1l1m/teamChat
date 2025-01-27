import Portal from "../modalCreateGroup/portal";
import styles from "../../App/Styles/modalUserProfile.module.css";
import { IoIosClose } from "react-icons/io";
import { UserListItem } from "../../Shared/roomListItem/roomListItem";
import { UserProfile } from "../../Shared/UserProfile/UserProfile";
import { Parameters } from "../../App/Parameters/Parametrs";
import { useNavigate } from "react-router";
import Icon from "../../Shared/icon/icon";
import { MdOutlineMessage } from "react-icons/md";
import { FaFile, FaFileImage } from "react-icons/fa";
import { linkToMessage } from "../../Entities/api/CreateNavigateRoom";
export const ModalUserProfile = ({
  isOpen,
  onCancel,
  userData,
  userId,
  userlist,
  roomList,
  images,
  files,
}) => {
  let navigate = useNavigate();

  return (
    <>
      {isOpen && (
        <Portal>
          <div className={styles.modalOverlay}>
            <div className={styles.modalWrap}>
              <div className={styles.headerWrap}>
                <div className={styles.header}>
                  <h1>Информация</h1>
                  <Icon>
                    <IoIosClose
                      className={styles.closeModel}
                      onClick={onCancel}
                      color="#6f6f6f"
                      size="50"
                    />
                  </Icon>
                </div>
                <div className={styles.userProfile}>
                  {userData
                    .filter((user) => user.id === userId)
                    .map((user) => {
                      const upName =
                        user.username.charAt(0).toUpperCase() +
                        user.username.slice(1);
                      return (
                        <UserProfile
                          key={user.id}
                          userAvatar={user.photo}
                          userActive={user.last_active}
                          nameRoom={upName}
                          status
                        />
                      );
                    })}
                </div>
              </div>

              <div className={styles.modalBody}>
                <ul>
                  <li
                    className={styles.listProfile}
                    onClick={() => {
                      linkToMessage(
                        userlist,
                        userId,
                        Parameters,
                        roomList,
                        navigate
                      );
                      onCancel();
                    }}
                  >
                    <Icon>
                      <MdOutlineMessage
                        style={{ marginTop: "4px" }}
                        color="#6f6f6f"
                        size="20"
                      />
                    </Icon>
                    <span> Написать сообщение</span>
                  </li>
                  <li
                    className={styles.listProfile}
                    onClick={() => {
                        images()
                      onCancel();
                    }}
                  >
                    <Icon>
                      <FaFileImage color="#6f6f6f" size="20" />
                    </Icon>
                    <span>Фотографии</span>
                  </li>
                  <li
                    className={styles.listProfile}
                    onClick={() => {
                        files();
                      onCancel();
                    }}
                  >
                    {" "}
                    <Icon>
                      <FaFile color="#6f6f6f" size="20" />
                    </Icon>
                    <span>Файлы</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </Portal>
      )}
    </>
  );
};
