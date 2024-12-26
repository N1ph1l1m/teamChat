import styles from "../../App/Styles/chats.module.css"
export default function ForwardMessageMenu({selectedMessage,
    setOpenModalForward,setIsSelectedMessage,setSelectedMessage}) {
    return (
      <div className={styles.forwardMenuWrap}>
        <button
          className={styles.forwardButton}
          onClick={() => {
            if (selectedMessage.length === 0) return null;
            setOpenModalForward(true);
          }}
        >
          Переслать
        </button>
        <button
          className={styles.forwardButton}
          onClick={() => {
            setIsSelectedMessage(false);
            setSelectedMessage("");
          }}
        >
          Отмена
        </button>
      </div>
    );
  };
