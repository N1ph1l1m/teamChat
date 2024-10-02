import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

import ChatArea from "../../Widgets/chatArea/chatArea";
import Message from "../../Shared/Message/message";
import { getData } from "../../Entities/api/getUserList";
import { render } from "@testing-library/react";

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

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/chat/rooms/${id}/`)
      .then((response) => {
        if (response.status === 200) {
          setRoomList(response.data);
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
          console.log(data.data)
          break;
        default:
          break;
      }
    };

    setChatSocket(socket);
    console.log(messages)
    return () => {

      if (socket) {
        socket.close();
      }
    };
  }, [id]);

  const handleInputChange = (e) => {
    setMessage(e.target.value) ;
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

      console.log(message);
      setMessage("");
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
      const previousDate = previousMessage ? previousMessage.created_at.substring(0, 10) : null;
      const isNewDay = previousDate !== messageDate;
      return (
        <div key={index}>
          {isNewDay && (
            <Text>{messageDate}</Text>
          )}
           {msg.user.username === localStorage.getItem("username")? (
            <>
              <Message text={msg.text} time={newText}  avatar={msg.user.photo} sent />
            </>
          ) : (<>
            <Message text={msg.text} time={newText}  avatar={msg.user.photo}  />
          </>)}
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
