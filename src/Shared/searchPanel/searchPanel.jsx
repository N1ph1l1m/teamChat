import { GoPlus } from "react-icons/go";
import styles from "../../App/Styles/mainLayout.module.css";

export const HeaderPanel = ({
  createGroup,
  title,

}) => {
  return (
    <>
      <div className={styles.menuGroup}>
        <h1 className={styles.header}>{title}</h1>
        <button className={styles.createGroup} onClick={createGroup}>
          <GoPlus
            color={createGroup ? "black" : "transparent"}
            size="25"
          />
        </button>
      </div>
    </>
  );
};
