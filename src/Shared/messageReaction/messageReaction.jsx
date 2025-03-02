import styles from "../../App/Styles/messageReaction.module.css";

export function MessageReaction({ reactions, onDestroyReaction }) {
  return (
    <>
      {reactions &&
        reactions.reactions &&
        reactions.reactions.length > 0 &&
        reactions.reactions.map((reaction, index) => (
          <div
            onClick={() =>
              onDestroyReaction(reaction.id, reactions.id, reaction)
            }
            key={index}
            className={styles.wrapReactionMessage}
          >
            <span className={styles.reactionEmoji}>{reaction.emoji}</span>
            <img
              src={reaction.id_user.photo}
              className={styles.avatarReacter}
              alt="avatar user"
            />
          </div>
        ))}
    </>
  );
}
