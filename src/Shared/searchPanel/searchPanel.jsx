import { GoPlus } from "react-icons/go";
import styles from "../../App/Styles/mainLayout.module.css";

export const SearchPanel = ({
  createGroup,
  inputValue,
  inputSearch,
  keyDownSearch,
}) => {
  return (
    <>
      <div className={styles.menuGroup}>
        <input
          placeholder="Поиск"
          className={styles.searchGroup}
          onChange={inputSearch} // Передаем обработчик изменений
          value={inputValue} // Значение поля ввода
          onKeyDownCapture={keyDownSearch}
        />
        <button className={styles.createGroup} onClick={createGroup}>
          <GoPlus
            color={createGroup ? "rgba(0, 0, 0, 0.283)" : "transparent"}
            size="25"
          />
        </button>
      </div>
    </>
  );
};
