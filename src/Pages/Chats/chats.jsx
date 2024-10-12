import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ChatArea from "../../Widgets/chatArea/chatArea";
import Message from "../../Shared/Message/message";
import Icon from "../../Shared/icon/icon";
import { BiMessageAltX } from "react-icons/bi";
import { getData } from "../../Entities/api/getUserList";
import styles from "../../App/Styles/chats.module.css";
import ModalWindow from "../../Widgets/modalCreateGroup/modalCreateGroup";
import ModalSendMessage from "../../Widgets/modalSendMessage/modalSendMessage";
import { IoSend } from "react-icons/io5";
function Chats() {
  const { id } = useParams();
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [image, setImage] = useState("");
  const [isWebSocketOpen, setIsWebSocketOpen] = useState(false);
  const [chatSocket, setChatSocket] = useState(null);
  const [roomList, setRoomList] = useState(null);
  const [imagePrew, setImagePrew] = useState({});
  const [otherUserAvatar, setOtherUserAvatar] = useState(null);
  const [authUser, setAuthUser] = useState([]);
  const [modal, setModel] = useState(false);
  const autUsr = localStorage.getItem("username");

  useEffect(() => {
    async function getRoomData() {
      try {
        console.log("getRoomData");
        const data = await axios.get(`http://127.0.0.1:8000/chat/rooms/${id}/`);
        if (data) {
          setRoomList(data.data);
          console.log("setRoomList");
          return data;
        }
      } catch (error) {
        console.error(error);
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

    async function getMessageData() {
      console.log("Message");
      const data = await getData(`chat/room/message/`, setMessages);
      return data;
    }

    const room_pk = id;
    const request_id = 1;
    const token = localStorage.getItem("token").trim();

    function webSocket() {
      console.log("websocket");
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

      socket.onmessage = function async(e) {
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
    }
    function showMessageAvatar(roomList) {
      console.log("avatar");
      if (roomList.data) {
        const otherUser = roomList.data.current_users.find(
          (user) => user.username !== autUsr
        );
        if (otherUser) setOtherUserAvatar(otherUser.photo);
      } else {
        console.error("roomList или current_users отсутствуют или пусты");
      }
    }

    async function go() {
      fetchData();
      const dataRoom = await getRoomData();
      webSocket();
      showMessageAvatar(dataRoom);
      await getMessageData();
    }

    go();
  }, [id]);

  const handleInputTextChange = (e) => {
    setMessage(e.target.value);
    console.log(message);
  };

  // const handleInputFileChange = (e) => {
  //   if (e.target.files.length > 0) {
  //     const file = e.target.files[0].name;
  //     setImage(file);
  //     console.log("image =  " + image);
  //     console.log(e.target.files[0]);
  //   } else {
  //     console.log("No file selected");
  //   }
  // };

  const handleInputFileChange = (e) => {
    try {
      if (e.target.files.length > 0) {
        const file = e.target.files[0];
        setImage(file); // Сохраняем сам файл, а не только его имя
        console.log("Выбранный файл изображения:", file);

        // Генерация URL для предпросмотра выбранного изображения
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePrew((prev) => ({
            ...prev,
            preview: reader.result, // Сохраняем URL предпросмотра
          }));
        };
        reader.readAsDataURL(file); // Чтение файла для получения URL
        if (imagePrew) {
          setModel(true);
        }
      } else {
        console.log("Файл не выбран");
      }
    } catch (error) {
      console.error(error);
    }
  };

  function handleCancel() {
    setModel(false);
  }

  async function sendMess() {
    try {
      if (message && !image) {
        console.log("Отправка только текста");
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
          return;
        }
      } else if (image && !message) {
        // Отправка только изображения
        console.log("Отправка только изображения");
        if (isWebSocketOpen && chatSocket) {
          const url = `http://127.0.0.1:8000/chat/room/${id}/user/${autUsr}/message/`;
          const formData = new FormData();
          formData.append("image", image);

          const response = await axios.post(url, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });

          const imageData = `http://127.0.0.1:8000${response.data.image}`;
          console.log("Response from server:", response.data);

          const request_id = 1;
          chatSocket.send(
            JSON.stringify({
              message: "",
              image: imageData,
              action: "create_message",
              request_id: request_id,
            })
          );
          setImage("");
          setImagePrew("");
          setModel(false);
        }
      } else if (message && image) {
        // Отправка и текста, и изображения
        console.log("Отправка текста и изображения");
        if (isWebSocketOpen && chatSocket) {
          const url = `http://127.0.0.1:8000/chat/room/${id}/user/${autUsr}/message/`;
          const formData = new FormData();
          formData.append("image", image);
          formData.append("text", message);

          const response = await axios.post(url, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });

          const imageData = response.data.image;
          console.log("Response from server:", response.data);

          const request_id = 1;
          chatSocket.send(
            JSON.stringify({
              message: message,
              image: imageData,
              action: "create_message",
              request_id: request_id,
            })
          );

          setMessage("");
          setImage("");
          setImagePrew("");
          setModel(false);
        } else {
          console.log("WebSocket не открыт.");
        }
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  }

  function formatRoomName(roomName) {
    try {
      const username = autUsr;
      const newName = roomName
        .replace(username, "")
        .replace(/^_+|_+$/g, "")
        .trim();
      return newName.charAt(0).toUpperCase() + newName.slice(1);
    } catch (error) {
      console.log(error);
    }
  }

  // imagePrew.preview
  const userAuth = autUsr;
  const imgPr = imagePrew.prew;
  const authenticatedUser = authUser.find((user) => user.username === userAuth);
  const selectImg = image;

  return (
    <>
      <ModalSendMessage
        onCancel={handleCancel}
        onSubmit={sendMess}
        image={imagePrew.preview}
        input={handleInputTextChange}
        inputValue={message}
        isOpen={modal}
      />
      <ChatArea
        title={roomList ? formatRoomName(roomList.name) : ""}
        inputValue={message}
        input={handleInputTextChange}
        file={handleInputFileChange}
        sendmessage={sendMess}
        content={
          <>
            {messages.filter((msg) => msg.room && msg.room.id === parseInt(id))
              .length === 0 ? (
              <div className={styles.nullMessageWrap}>
                <Icon>
                  <BiMessageAltX color="gray" size="25" />
                </Icon>
                <p className={styles.nullMessageText}>Сообщений пока нет</p>
              </div>
            ) : (
              messages
                .filter((msg) => msg.room && msg.room.id === parseInt(id))
                .map((msg, index, arr) => {
                  const newText = msg.created_at.substring(11, 16);
                  const messageDate = msg.created_at.substring(0, 10);
                  const previousMessage = arr[index - 1];
                  const previousDate = previousMessage
                    ? previousMessage.created_at.substring(0, 10)
                    : null;
                  const isNewDay = previousDate !== messageDate;
                  const anwPhoto =
                    msg.image && msg.image.startsWith("http://127.0.0.1:8000")
                      ? msg.image
                      : `http://127.0.0.1:8000${msg.image || ""}`;
                  console.log(anwPhoto);
                  return (
                    <div key={index}>
                      {isNewDay && (
                        <p className={styles.dataTimeMessage}>{messageDate}</p>
                      )}
                      {msg.user.username ===
                      localStorage.getItem("username") ? (
                        <Message
                          text={msg.text}
                          photos={anwPhoto}
                          time={newText}
                          sent
                          avatar={authenticatedUser.photo}
                        />
                      ) : (
                        <Message
                          text={msg.text}
                          time={newText}
                          photos={anwPhoto}
                          avatar={otherUserAvatar}
                        />
                      )}
                    </div>
                  );
                })
            )}
          </>
        }
      />
    </>
  );
}
export default Chats;
