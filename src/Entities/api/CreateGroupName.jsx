import axios from "axios";

export default function CreateGroupRoom(groupName, avatar, currentUsers) {
  const token = localStorage.getItem("token");
  const url = `http://127.0.0.1:8000/chat/create-groupchat/`;

  const formData = new FormData();
  formData.append("name", groupName);
  formData.append("avatar", avatar); // avatar должен быть объектом File
  formData.append(
    "current_users",
    JSON.stringify(currentUsers.map((user) => user.username))
  );

  axios
    .post(url, formData, {
      headers: {
        Authorization: `token ${token}`,
        // Не указываем "Content-Type" — он будет установлен автоматически
      },
    })
    .then((response) => {
      if (response.status === 200 || response.status === 201) {
        localStorage.setItem("requestApi", JSON.stringify(response.data));
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
