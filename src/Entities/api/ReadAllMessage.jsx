import axios from "axios";

export async function ReadMessageAll(id) {
  if(!id) return null
  const reactionData = {
    id: id,
    is_read: true,
  };

  try {


    const url = `http://127.0.0.1:8000/chat/message-read-status/${id}/`;
    const response = await axios.get(url);
     if(response.data.has_unread){
      console.log("read");
      const url = `http://127.0.0.1:8000/chat/message-read-all/${id}/`;
      const response = await axios.post(url, reactionData);

      if (response.status === 201 || response.status === 200) {
      } else {
        console.error("Ошибка: Непредвиденный ответ от сервера", response.status);
      }
     }
    if (response.status === 201 || response.status === 200) {
    } else {
      console.error("Ошибка: Непредвиденный ответ от сервера", response.status);
    }

  } catch (error) {
    if (error.response) {
      //   console.error("Ошибка сервера:", error.response.data);
    } else if (error.request) {
      console.error("Ошибка сети. Сервер не отвечает:", error.request);
    } else {
      console.error("Неизвестная ошибка:", error.message);
    }
  }
  return null;
}
