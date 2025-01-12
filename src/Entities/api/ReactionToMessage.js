import axios from "axios";
import { Parameters } from "../../App/Parameters/Parametrs";
export async function createReaction(authenticatedUser, selectReactionEmoji) {
  const reactionData = {
    id_user: authenticatedUser.id,
    emoji: selectReactionEmoji,
  };

  try {
    const url = `${Parameters.url}chat/reaction/`;
    const response = await axios.post(url, reactionData);
    if (response.status === 201 || response.status === 200) {
      return {
        id: response.data.id,
        emoji: response.data.emoji,
        id_user: response.data.id_user,
      };
    } else {
      console.error("Ошибка: Непредвиденный ответ от сервера", response.status);
    }
  } catch (error) {
    if (error.response) {
      console.error("Ошибка сервера:", error.response.data);
    } else if (error.request) {
      console.error("Ошибка сети. Сервер не отвечает:", error.request);
    } else {
      console.error("Неизвестная ошибка:", error.message);
    }
  }
  return null;
}
