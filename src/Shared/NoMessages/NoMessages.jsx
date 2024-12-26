import { BiMessageAltX } from "react-icons/bi";
import Icon from "../icon/icon";
import styles from "../../App/Styles/chats.module.css"

export const NoMessages = () => (
    <div className={styles.nullMessageWrap}>
      <Icon>
        <BiMessageAltX color="gray" size="25" />
      </Icon>
      <p className={styles.nullMessageText}>Сообщений пока нет</p>
    </div>
  );
