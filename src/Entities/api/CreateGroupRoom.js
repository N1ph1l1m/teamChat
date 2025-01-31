import axios from "axios";
import { Parameters } from "../../App/Parameters/Parametrs";
import { addRoomList } from "../../store/actions/addRoomList";

export default function CreateGroupRoom(
  groupName,
  avatar,
  currentUsers,
  handleCancel,
) {
  if (!groupName) {
    alert("Название группы не должно быть пустым");
    return false;
  } else if (currentUsers.length === 0) {
    alert("Список пользователей не должно быть пустым");
  } else {
    const token = Parameters.token;
    const url = `${Parameters.url}chat/create-groupchat/`;

    const formData = new FormData();
    formData.append("name", groupName);
    formData.append("avatar", avatar);
    formData.append(
      "current_users",
      JSON.stringify(currentUsers.map((user) => user.username))
    );

    axios
      .post(url, formData, {
        headers: {
          Authorization: `token ${token}`,
        },
      })
      .then((response) => {
        if (response.status === 200 || response.status === 201) {
          handleCancel();
        } else {
          console.error("Error:", response.status, response.statusText);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);

        if (error.response) {
          console.error("Ошибка сервера:", error.response.data);
        } else if (error.request) {
          console.error("Запрос не получил ответа:", error.request);
        } else {
          console.error("Ошибка при настройке запроса:", error.message);
        }
      });
  }
}
