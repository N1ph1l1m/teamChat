import styles from "../../App/Styles/loader.module.css";
export const Loader = ({
  custom,
  widthLoader,
  heightLoader,
  borderLoader,
  borderTopLoader,
}) => {
  return (
    <div
      className={styles.loader}
      style={
        custom
          ? {
              width: widthLoader,
              height: heightLoader,
              border: borderLoader,
              borderTop: borderTopLoader,
            }
          : null
      }
    ></div>
  );
};
