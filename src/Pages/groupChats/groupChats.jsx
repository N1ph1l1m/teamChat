import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import MessageInput from "../../Shared/inputMessage/messageInput";
import ChatArea from "../../Widgets/chatArea/chatArea";
import Message from "../../Shared/Message/message";
import { getData } from "../../Entities/api/getUserList";

const Text = styled.div`
  color: gray;
  font-size: 14px;
`;

function GroupChats() {
  const { id } = useParams();
  const [messages, setMessages] = useState([]); // Массив для хранения сообщений, по умолчанию пустой массив
  const [message, setMessage] = useState("");
  const [isWebSocketOpen, setIsWebSocketOpen] = useState(false);
  const [chatSocket, setChatSocket] = useState(null);
  const [roomList, setRoomList] = useState([]);

  const [otherUserAvatars, setOtherUserAvatars] = useState([]);
  const [authUser, setAuthUser] = useState([]);

  const autUsr = localStorage.getItem("username");

  useEffect(() => {
    async function getRoomData() {
      console.log("getRoomData");
      const data = await axios.get(`http://127.0.0.1:8000/chat/rooms/${id}/`);
      if (data) {
        setRoomList(data.data);
        return data;
      }
    }
    async function fetchData() {
      try {
        console.log("fentchData");
        const data = await getData("users/", setAuthUser);
        return data;
      } catch (error) {
        console.error(error);
      }
    }

    function avatars(roomList) {
      console.log("avatars");
      if (roomList) {
        const otherUsers = roomList.data.current_users.filter(
          (user) => user.username !== autUsr
        );
        setOtherUserAvatars(
          otherUsers.map((user) => ({
            username: user.username,
            avatar: user.photo,
          }))
        );
        console.log(otherUsers);
      }
    }

    async function getMessageData() {
      console.log("Message");
      const data = await getData(`chat/room/message/`, setMessages);

      return data;
    }

    const room_pk = id;
    const request_id = 1;
    const token = localStorage.getItem("token").trim();

    function websocket() {
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
            setMessages((prevMessages) => {
              const messageExists = prevMessages.some(
                (msg) => msg.id === data.data.id
              );
              if (!messageExists) {
                return [...prevMessages, data.data];
              }
              return prevMessages;
            });
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
    }

    async function go() {
      fetchData();
      const dataRoom = await getRoomData();
      websocket();
      avatars(dataRoom);
      await getMessageData();
    }
    go();
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

      setMessage("");
    } else {
      console.log("WebSocket не открыт. Сообщение не отправлено.");
    }
  };

  function formatRoomName(roomName) {
    try {
      const username = autUsr;
      const newName = roomName
        .replace(username, "")
        .replace(/^_+|_+$/g, "")
        .trim();
      return newName.charAt(0).toUpperCase() + newName.slice(1);
    } catch (error) {
      //console.log(error);
    }
  }

  const userAuth = autUsr;
  const authenticatedUser = authUser.find((user) => user.username === userAuth);

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
                const userNameMesage =
                  msg.user.username.charAt(0).toUpperCase() +
                  msg.user.username.slice(1);
                const photos =
                  msg.photos.length > 0
                    ? msg.photos.map((photo) => photo.image)
                    : [];
                return (
                  <div key={index}>
                    {isNewDay && <Text>{messageDate}</Text>}
                    {msg.user.username === localStorage.getItem("username") ? (
                      <>
                        <Message
                          avatar={authenticatedUser.photo}
                          text={msg.text}
                          photos={photos}
                          time={newText}
                          sent
                        />
                      </>
                    ) : (
                      <>
                        {/* Найдите объект пользователя с именем msg.user.username */}
                        {otherUserAvatars
                          .filter((user) => user.username === msg.user.username)
                          .map((user) => (
                            <Message
                              key={user.username}
                              avatar={user.avatar}
                              username={userNameMesage}
                              text={msg.text}
                              photos={photos}
                              time={newText}
                            />
                          ))}
                      </>
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

export default GroupChats;
