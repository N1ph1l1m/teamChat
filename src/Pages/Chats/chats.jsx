import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

import ChatArea from "../../Widgets/chatArea/chatArea";
import Message from "../../Shared/Message/message";
import { getData } from "../../Entities/api/getUserList";

const Text = styled.div`
  color: gray;
  font-size: 14px;
`;

function Chats() {
  const { id } = useParams();
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [isWebSocketOpen, setIsWebSocketOpen] = useState(false);
  const [chatSocket, setChatSocket] = useState(null);
  const [roomList, setRoomList] = useState([]);
  const [userTest, setUserTest] = useState();

  // Добавляем состояния для аватаров
  const [currentUserAvatar, setCurrentUserAvatar] = useState(null);
  const [otherUserAvatar, setOtherUserAvatar] = useState(null);

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/chat/rooms/${id}/`)
      .then((response) => {
        if (response.status === 200) {
          setRoomList(response.data);

          // Проверка на наличие пользователей в данных
          if (
            response.data.current_users &&
            response.data.current_users.length > 0
          ) {
            const currentUser = localStorage.getItem("username");

            // Находим пользователя, который не текущий
            const otherUser = response.data.current_users.find(
              (user) => user.username !== currentUser
            );
            const currentUserObj = response.data.current_users.find(
              (user) => user.username === currentUser
            );

            // Если нашли другого пользователя, устанавливаем его аватар
            if (otherUser) setOtherUserAvatar(otherUser.photo);

            // Если нашли текущего пользователя, устанавливаем его аватар
            if (currentUserObj) setCurrentUserAvatar(currentUserObj.photo);
          }

          // Получаем сообщения
          getData(`chat/room/message/`, setMessages);
        } else {
          console.log("Error: " + response.data.detail);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });

    const room_pk = id;
    const request_id = 1;
    const token = localStorage.getItem("token").trim();
    const socket = new WebSocket(
      `ws://localhost:8000/ws/chat/${room_pk}/?token=${token}`
    );

    socket.onopen = function () {
      console.log("WebSocket открыт");
      setIsWebSocketOpen(true);

      socket.send(
        JSON.stringify({
          pk: room_pk,
          action: "join_room",
          request_id: request_id,
        })
      );
      socket.send(
        JSON.stringify({
          pk: room_pk,
          action: "retrieve",
          request_id: request_id,
        })
      );
      socket.send(
        JSON.stringify({
          pk: room_pk,
          action: "subscribe_to_messages_in_room",
          request_id: request_id,
        })
      );
    };

    socket.onmessage = function (e) {
      const data = JSON.parse(e.data);
      switch (data.action) {
        case "create":
          setMessages((prevMessages) => [...prevMessages, data.data]);
          setUserTest([data.data]);
          break;
        default:
          break;
      }
    };

    setChatSocket(socket);

    return () => {
      if (socket) {
        socket.close();
      }
    };
  }, [id]);

  const handleInputChange = (e) => {
    setMessage(e.target.value);
  };

  const sendMessage = () => {
    if (isWebSocketOpen && chatSocket) {
      const request_id = 1;
      chatSocket.send(
        JSON.stringify({
          message: message,
          action: "create_message",
          request_id: request_id,
          user: userTest,
        })
      );
      console.log(message);
      setMessage("");
      console.log(messages);
    } else {
      console.log("WebSocket не открыт. Сообщение не отправлено.");
    }
  };

  function formatRoomName(roomName) {
    try {
      const username = localStorage.getItem("username");
      const newName = roomName
        .replace(username, "")
        .replace(/^_+|_+$/g, "")
        .trim();
      return newName.charAt(0).toUpperCase() + newName.slice(1);
    } catch (error) {
      //console.log(error);
    }
  }

  return (
    <>
      <ChatArea
        title={formatRoomName(roomList.name)}
        inputValue={message}
        input={handleInputChange}
        sendmessage={sendMessage}
        content={
          <>
            {messages
              .filter((msg) => msg.room.id === parseInt(id))
              .map((msg, index, arr) => {
                const newText = msg.created_at.substring(11, 16);
                const messageDate = msg.created_at.substring(0, 10);
                const previousMessage = arr[index - 1];
                const previousDate = previousMessage
                  ? previousMessage.created_at.substring(0, 10)
                  : null;
                const isNewDay = previousDate !== messageDate;
                const userNameMessage =
                  msg.user.username.charAt(0).toUpperCase() +
                  msg.user.username.slice(1);

                return (
                  <div key={index}>
                    {isNewDay && <Text>{messageDate}</Text>}
                    {msg.user.username === localStorage.getItem("username") ? (
                      <Message
                        text={msg.text}
                        time={newText}
                        sent
                        avatar={currentUserAvatar} // Аватар текущего пользователя
                      />
                    ) : (
                      <Message
                        text={msg.text}
                        time={newText}
                        avatar={otherUserAvatar} // Аватар другого пользователя
                      />
                    )}
                  </div>
                );
              })}
          </>
        }
      />
    </>
  );
}

export default Chats;
