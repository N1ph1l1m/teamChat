import axios from "axios";
import { Parameters } from "../../App/Parameters/Parametrs";
export default async function UpdateActivity(id) {
  const dataNow = new Date();
  const updateActivity = {
    id: id,
    last_active: dataNow,
  };
  try {
    const url = `${Parameters.url}users/activity/${id}/`;
    const response = await axios.put(url, updateActivity);
    if (response.status === 200 || response.status === 201) {
      localStorage.setItem("last_active", dataNow);
    } else {
      console.error("Unexpected response status:", response.status);
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
}
