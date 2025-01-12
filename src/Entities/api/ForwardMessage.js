import axios from "axios";
import { Parameters } from "../../App/Parameters/Parametrs";

export async function createNewMessageForward(room, user, forward, message) {
  try {
    const selected = {
      room: room,
      user: user,
      forwarded_messages: forward,
      text: message,
    };
    const url = `${Parameters.url}chat/message-create/`;
    await axios.post(url, selected);
  } catch (error) {
    if (error.response) {
      console.error("Ошибка сервера:", error.response.data);
    } else if (error.request) {
      console.error("Ошибка сети. Сервер не отвечает:", error.request);
    } else {
      console.error("Неизвестная ошибка:", error.message);
    }
  }
}
export async function sendForward(
  selectedMessages,
  authUserId,
  isSelectRoomSendForward
) {
  const forwardedIds = [];
  try {
    for (const select of selectedMessages) {
      const selected = {
        original_message: select.id,
        forwarded_by: authUserId,
        forwarded_to_room: isSelectRoomSendForward,
      };

      const url = `${Parameters.url}chat/forward-create/`;
      const response = await axios.post(url, selected);

      if (response && response.data && response.data.id) {
        forwardedIds.push(response.data.id);
      } else {
        console.error("Forward response does not contain id:", response);
      }
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
  return forwardedIds;
}
