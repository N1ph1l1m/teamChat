import { BiMessageAltX } from "react-icons/bi";
import Icon from "../icon/icon";
import styles from "../../App/Styles/chats.module.css";

export const NoMessages = ({ text, style, icon }) => (
  <div className={styles.nullMessageWrap} style={style}>
    <Icon>{!icon ? <BiMessageAltX color="gray" size="25" /> : icon}</Icon>
    <p className={styles.nullMessageText}>{text}</p>
  </div>
);
