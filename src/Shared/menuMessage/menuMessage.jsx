import styles from "../../App/Styles/menuMessage.module.css";
import { IoArrowRedoSharp, IoCheckmarkCircleOutline } from "react-icons/io5";
import { MdOutlineEmojiEmotions } from "react-icons/md";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";

export function MessageMenu({
  menu,
  setEmojiWindow,
  emojiWindow,
  onEmojiSelect,
  onSelectMessage,
}) {
  if (!menu) return null;

  const handleEmojiSelect = (emoji) => {
    if (onEmojiSelect) {
      onEmojiSelect(emoji.native);
    }
  };

  return (
    <>
      <ul className={styles.moreMenu}>
        {/* <li>
          <IoArrowRedoSharp
            color="rgb(117, 117, 117)"
            size="20"
            style={{ marginRight: "4px" }}
          />
          <span>Переслать</span>
        </li> */}
        <li onClick={onSelectMessage}>
          <IoCheckmarkCircleOutline
            color="rgb(117, 117, 117)"
            size="20"
            style={{ marginRight: "4px" }}
          />
          <span>Выбрать</span>
        </li>
        <li onClick={setEmojiWindow}>
          <MdOutlineEmojiEmotions
            color="rgb(117, 117, 117)"
            size="20"
            style={{ marginRight: "4px" }}
          />{" "}
          <span>Реакция</span>
        </li>
      </ul>
      {emojiWindow ? (
        <div className={styles.wrapEmoji}>
          <Picker
            data={data}
            theme={"ligth"}
            onEmojiSelect={handleEmojiSelect}
            locale={"ru"}
            searchPosition={"none"}
            previewPosition={"none"}
            navPosition={"none"}
            maxFrequentRows="4"
            perLine="5"
            emojiSize="20"
          />
        </div>
      ) : null}
    </>
  );
}
