import Portal from "../modalCreateGroup/portal";
import styles from "../../App/Styles/modalUserProfile.module.css";
import { IoIosClose } from "react-icons/io";
import { UserProfile } from "../../Shared/UserProfile/UserProfile";
import { Parameters } from "../../App/Parameters/Parametrs";
import { useNavigate } from "react-router";
import Icon from "../../Shared/icon/icon";
import { MdOutlineMessage } from "react-icons/md";
import { FaFile, FaFileImage } from "react-icons/fa";
import { linkToMessage } from "../../Entities/api/CreateNavigateRoom";
import { getPluralForm } from "../../Entities/PluralForm/getPluralForm";

export const ModalUserProfile = ({
  isOpen,
  onCancel,
  userData,
  userId,
  userlist,
  roomList,
  images,
  documents,
  countImages,
  countDocuments,
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
                  <h1 className={styles.title}>Информация</h1>
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
                      images();
                    }}
                  >
                    <Icon>
                      <FaFileImage color="#6f6f6f" size="20" />
                    </Icon>
                    <span>
                      {countImages}{" "}
                      {getPluralForm(
                        countImages,
                        "фотография",
                        "фотографии",
                        "фотографий"
                      )}
                    </span>
                  </li>
                  <li
                    className={styles.listProfile}
                    onClick={() => {
                      documents();
                    }}
                  >
                    {" "}
                    <Icon>
                      <FaFile color="#6f6f6f" size="20" />
                    </Icon>
                    <span>
                      {countDocuments}{" "}
                      {getPluralForm(countDocuments, "файл", "файла", "файлов")}{" "}
                    </span>
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

export const ModalGroupChatInfo = ({
  isOpen,
  onCancel,
  userData,
  userId,
  userlist,
  roomList,
  images,
  documents,
  countImages,
  countDocuments,
}) => {
  let navigate = useNavigate();
  function countFiles(param) {
    return roomList.message.reduce((total, element) => {
      if (element.images && Array.isArray(element[param])) {
        return total + element[param].length;
      }
      console.log(total);
      return total;
    }, 0);
  }
  return (
    <>
      {isOpen && (
        <Portal>
          <div className={styles.modalOverlay}>
            <div className={styles.modalWrap}>
              <div className={styles.headerWrap}>
                <div className={styles.header}>
                  <h1 className={styles.title}>Информация</h1>
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
                  <UserProfile
                    userAvatar={roomList.photo_room}
                    nameRoom={roomList.name}
                    users={`${roomList.current_users.length} ${getPluralForm(
                      roomList.current_users.length,
                      "участник",
                      "участника",
                      "участников"
                    )}`}
                  />
                </div>
              </div>

              <div className={`${styles.modalBody} ${styles.mediaMargin}`}>
                <ul>
                  <li
                    className={styles.listProfile}
                    onClick={() => {
                      navigate(`/grchats/${roomList.pk}`);
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
                      images();
                    }}
                  >
                    <Icon>
                      <FaFileImage color="#6f6f6f" size="20" />
                    </Icon>
                    <span>
                      {" "}
                      {countFiles("images")}{" "}
                      {getPluralForm(
                        countFiles("images"),
                        "фотография",
                        "фотографии",
                        "фотографий"
                      )}
                    </span>
                  </li>
                  <li
                    className={styles.listProfile}
                    onClick={() => {
                      documents();
                    }}
                  >
                    {" "}
                    <Icon>
                      <FaFile color="#6f6f6f" size="20" />
                    </Icon>
                    <span>
                      {countFiles("documents")}{" "}
                      {getPluralForm(
                        countFiles("documents"),
                        "файл",
                        "файла",
                        "файлов"
                      )}{" "}
                    </span>
                  </li>
                </ul>
              </div>

              <div className={styles.usersWrap}>
                <h1 className={styles.title}>Участники</h1>
                <ul>
                  {roomList.current_users.map((user, index) => {
                    return (
                      <>
                        <li
                          className={styles.listProfile}
                          key={index}
                          onClick={() => {
                            navigate(`/grchats/${roomList.pk}`);
                          }}
                        >
                          <img
                            className={styles.usersAvatar}
                            src={user.photo}
                            alt={`userGroup${index}`}
                          />

                          <span>{user.username}</span>
                        </li>
                      </>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
        </Portal>
      )}
    </>
  );
};
