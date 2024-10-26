import React, { useState } from "react";
import axios from "axios";

export default function CreateGroupRoom(groupName, currentUsers) {
  let token = localStorage.getItem("token");
  let urls = `http://127.0.0.1:8000/chat/roomg/`;

  console.log(groupName);
  const userNames = currentUsers.map((user) => user.username);
  axios
    .post(
      urls,
      {
        name: groupName,
        current_users: userNames,
      },
      {
        headers: {
          Authorization: `token ${token}`,
          "Content-Type": "application/json",
        },
      }
    )
    .then((response) => {
      if (response.status === 200 || response.status === 201) {
        localStorage.setItem("requestApi", JSON.stringify(response.data));
      } else {
        console.log("Error: " + response.status, response.statusText);
      }
    })
    .catch((error) => {
      console.error("Error fetching data:", error);

      if (error.response) {
        // Сервер ответил с ошибкой
        console.error("Ошибка сервера:", error.response.data);
      } else if (error.request) {
        // Запрос был сделан, но ответа не получено
        console.error("Запрос не получил ответа:", error.request);
      } else {
        // Ошибка при настройке запроса
        console.error("Ошибка при настройке запроса:", error.message);
      }
      console.log("username:", groupName);
    });
}
