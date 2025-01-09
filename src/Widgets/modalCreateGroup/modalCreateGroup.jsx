import React from "react";
import Portal from "./portal";
import PropTypes from "prop-types";
import styles from "../../App/Styles/modalCreateGroupChat.module.css";
import Button from "../../Shared/button/button";
import Icon from "../../Shared/icon/icon";
import { MdAddAPhoto } from "react-icons/md";
import { MdNoPhotography } from "react-icons/md";

const ModalCreateGroup = ({ isOpen, onCancel, onSubmit, avatarGroup , setDeleteAvatar, handleAvatarGroup , setAvatarGroup , isDeleteAvatar,
  avatarPrew,handleInputChangeName,
  selectedUsers,userlist, handleCheckboxChange,Parameters,

 }) => {
  return (
    <>
      {isOpen && (
        <Portal>
          <div className={styles.modalOverlay}>
            <div className={styles.modalWrap}>
              <div className={styles.modalBody}>
              {/* {children} */}
              <div className={styles.headerModel}>
          {!avatarGroup ? (
            <div
              className={styles.selectAvatarWrap}
              onMouseLeave={() => setDeleteAvatar(false)}
            >
              <input
                className={styles.inputAvatar}
                type="file"
                id="avatarGroup"
                name="avatarGroup"
                accept="image/*"
                onChange={handleAvatarGroup}
              />
              <label htmlFor="avatarGroup">
                <Icon onClick={() => setAvatarGroup("")}>
                  <MdAddAPhoto color="black" size="40" />
                </Icon>
              </label>
            </div>
          ) : (
            <>
              <div
                className={styles.selectAvatarWrap}
                onMouseEnter={() => setDeleteAvatar(true)}
                onMouseLeave={() => setDeleteAvatar(false)}
              >
                {!isDeleteAvatar ? (
                  <img
                    src={avatarPrew}
                    alt="ava"
                    className={styles.inputAvatarWrap}
                  />
                ) : (
                  <Icon
                    onClick={() => {
                      setAvatarGroup("");
                      console.log("delete");
                    }}
                  >
                    <MdNoPhotography color="rgb(131, 130, 130)" size="30" />
                  </Icon>
                )}
              </div>
            </>
          )}

          <div className={styles.inputNameGroup}>
            <span className={styles.modalTitle}>Название группы</span>
            <input onChange={(e) => handleInputChangeName(e)} />
            <ul className={styles.selectedUsers}>
              {selectedUsers.map((user, index) => (
                <div className={styles.userBadge} key={`select-user-${index}`}>
                  <img
                    className={styles.liAvatar}
                    src={user.photo}
                    alt={user.name}
                  />
                  <li className={styles.selectedUsersItems} key={user}>
                    {user.username}
                  </li>
                </div>
              ))}
            </ul>
          </div>
        </div>

        <div className={styles.wrapCheckBox}>
          {userlist
            .filter((user) => user.username !== Parameters.authUser)
            .map((user) => {
              const upName =
                user.username.charAt(0).toUpperCase() + user.username.slice(1);
              return (
                <>
                  <label
                    className={styles.checkBoxWrap}
                    key={user.id}
                    htmlFor={user.id}
                  >
                    <img
                      className={styles.checkboxUserAvatar}
                      src={user.photo}
                      alt={user.username}
                    />
                    <input
                      type="checkbox"
                      className={styles.checkbox}
                      id={user.id}
                      checked={selectedUsers.some(
                        (selectedUser) =>
                          selectedUser.username === user.username
                      )}
                      onChange={() =>
                        handleCheckboxChange(user.username, user.photo)
                      }
                    />
                    <span className={styles.checkboxLabel}>{upName}</span>
                  </label>
                </>
              );
            })}
        </div>
              </div>
              <div className={styles.modalFooter}>
                <Button
                  className={styles.modalButton}
                  onClick={onCancel}
                  invert
                >
                  Закрыть
                </Button>
                <Button className={styles.modalButton} onClick={onSubmit}>
                  Создать
                </Button>
              </div>
            </div>
          </div>
        </Portal>
      )}
    </>
  );
};

ModalCreateGroup.propTypes = {
  title: PropTypes.string,
  isOpen: PropTypes.bool,
  onCancel: PropTypes.func,
  onSubmit: PropTypes.func,
  children: PropTypes.node,
};

ModalCreateGroup.defaultProps = {
  title: "Modal title",
  isOpen: false,
  onCancel: () => {},
  onSubmit: () => {},
  children: null,
};
export default ModalCreateGroup;
