import styles from "../../App/Styles/header.module.css";
export function Header(props) {
  return (
    <div className={styles.wrapHeader}>
      <span className={styles.headerTitle}>{props.tittle}</span>
    </div>
  );
}
