import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import MessageInput from "../../Shared/inputMessage/messageInput";
import ChatArea from "../../Widgets/chatArea/chatArea"
import Message from "../../Shared/Message/message";


const Text = styled.div`
  color: red;
  font-size: 14px;
`;

function Chats() {
  const { id } = useParams();
  const [messages, setMessages] = useState([]); // Массив для хранения сообщений, по умолчанию пустой массив
  const [message, setMessage] = useState("");
  const [isWebSocketOpen, setIsWebSocketOpen] = useState(false);
  const [chatSocket, setChatSocket] = useState(null);

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/chat/rooms/${id}/`)
      .then((response) => {
        if (response.status === 200) {
          // Загрузка существующих сообщений комнаты
          setMessages(response.data.messages || []); // Если сообщений нет, установить пустой массив
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
    const socket = new WebSocket(`ws://localhost:8000/ws/chat/${room_pk}/?token=${token}`);

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
      console.log("RealTime", data.data);
      switch (data.action) {
        case "retrieve":
          setMessages(data.data.messages || []); // Если нет сообщений, пустой массив
          break;
        case "create":
          setMessages((prevMessages) => [...prevMessages, data.data]); // Добавляем новое сообщение
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
        })
      );

      setMessage(""); // Очищаем поле после отправки сообщения
      console.log(messages)
    } else {
      console.log("WebSocket не открыт. Сообщение не отправлено.");
    }
  };
  function click(){
    console.log("click")
  }

  return (
    <>
      {/* <div>
        <h2>Чат</h2>
        <div>
          {messages.length > 0 ? ( // Проверка, что массив не пустой
            messages.map((msg, index) => (
              <div key={index}>
                <strong>{msg.user.username}:</strong> {msg.text} <br />
                <small>{msg.created_at_formatted}</small>
              </div>
            ))
          ) : (
            <p>Сообщений пока нет</p> // Отображение, если сообщений нет
          )}
        </div>
      </div>

      <input type="text" size="100" value={message} onChange={handleInputChange} />
      <br />
      <input type="button" value="Send" onClick={sendMessage} /> */}
      <ChatArea
      title="Chat"
      inputValue={message}
          input={handleInputChange}
          sendmessage={sendMessage}
          content={
       <>{
          messages.map((msg, index) => (
              <Message key={index} text={msg.text} sent />
            ))
       }



          </>

      }



      />
    </>
  );
}

export default Chats;
