import axios from "axios";
import { Parameters } from "../../App/Parameters/Parametrs";
export async function ReadMessage(id) {
  const reactionData = {
    id: id,
    is_read: true,
  };

  try {
    console.log("read message");
    const url = `${Parameters.url}chat/message-read/${id}/`;
    const response = await axios.put(url, reactionData);
    if (response.status === 201 || response.status === 200) {
      // console.log(`Cообщение ${id} прочитано `);
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
