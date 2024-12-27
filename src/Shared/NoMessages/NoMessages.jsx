import { BiMessageAltX } from "react-icons/bi";
import Icon from "../icon/icon";
import styles from "../../App/Styles/chats.module.css"

export const NoMessages = ({text, style}) => (
    <div className={styles.nullMessageWrap} style={style}>
      <Icon>
        <BiMessageAltX color="gray" size="25" />
      </Icon>
      <p className={styles.nullMessageText}>{text}</p>
    </div>
  );
