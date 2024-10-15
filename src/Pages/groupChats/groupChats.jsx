import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import MessageInput from "../../Shared/inputMessage/messageInput";
import ChatArea from "../../Widgets/chatArea/chatArea";
import Message from "../../Shared/Message/message";
import ModalSendMessage from "../../Widgets/modalSendMessage/modalSendMessage";
import ModalPhoto from "../../Widgets/modalPhoto/modalPhoto";
import { getData } from "../../Entities/api/getUserList";
import  styles from "../../App/Styles/chats.module.css"
import Icon from "../../Shared/icon/icon";
import { BiMessageAltX } from "react-icons/bi";

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
  const [sendImage, setSendImage] = useState("");
  const [roomList, setRoomList] = useState([]);
  const [imagePrew, setImagePrew] = useState({});
  const [otherUserAvatars, setOtherUserAvatars] = useState([]);
  const [authUser, setAuthUser] = useState([]);
  const autUsr = localStorage.getItem("username");
  const [modal, setModel] = useState(false);
  const [photoModal,setPhotoModal] = useState(false);
  const [modalPhoto, setModalPhoto] = useState('');


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


  const handleInputFileChange = (e) => {
    try {
      if (e.target.files.length > 0) {
        const file = e.target.files[0];
        setSendImage(file);
        console.log("Выбранный файл изображения:", file);

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

  const handleInputTextChange = (e) => {
    setMessage(e.target.value);
    console.log(message);
  };

  function handleCancelAddPhoto() {
    setModel(false);
  }

  function handleCancelPhoto() {
    setPhotoModal(false);
  }

  async function sendMess() {
    console.log(modal)
    try {
      if (message && !sendImage) {
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
      } else if (sendImage && !message) {
        // Отправка только изображения
        console.log("Отправка только изображения");
        if (isWebSocketOpen && chatSocket) {
          const url = `http://127.0.0.1:8000/chat/room/${id}/user/${autUsr}/message/`;
          const formData = new FormData();
          formData.append("image", sendImage);
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
          setSendImage("");
          setImagePrew("");
          setModel(false);
        }
      } else if (message && sendImage) {
        console.log("Отправка текста и изображения");
        if (isWebSocketOpen && chatSocket) {
          const url = `http://127.0.0.1:8000/chat/room/${id}/user/${autUsr}/message/`;
          const formData = new FormData();
          formData.append("image", sendImage);
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
          setSendImage("")
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
      //console.log(error);
    }
  }
  const modalPh = (photoData)=>{
    console.log('click')
    console.log(`Data  = ${photoData.src} `)
    setModalPhoto(photoData.src)
    setPhotoModal(true)
  }


  const userAuth = autUsr;
  const authenticatedUser = authUser.find((user) => user.username === userAuth);

  return (
    <>
        <ModalSendMessage
        title="Отправить сообщение "
        onCancel={handleCancelAddPhoto}
        onSubmit={sendMess}
        image={imagePrew.preview}
        input={handleInputTextChange}
        inputValue={message}
        isOpen={modal}
      />
      <ModalPhoto
        image ={modalPhoto}
        isOpen={photoModal}
        onCancel={handleCancelPhoto}
      />
      <ChatArea
        title={formatRoomName(roomList.name)}
        inputValue={message}
        input={handleInputTextChange}
        sendmessage={sendMess}
        file={handleInputFileChange}
        content={
          <>
            {messages.filter((msg)=> msg.room.id === parseInt(id)).length === 0 ?
              (    <div className={styles.nullMessageWrap}>
            <Icon>
            <BiMessageAltX color="gray" size="25" />
           </Icon>
          <p className={styles.nullMessageText}>Сообщений пока нет</p>
            </div>)
           : (messages
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
                    const image =
                    msg.image && msg.image.startsWith("http://127.0.0.1:8000")
                      ? msg.image
                      : msg.image
                      ? `http://127.0.0.1:8000${msg.image}`
                      : null;

                      const photoData = { id: msg.id, src: image, text: msg.text, time: newText };
                return (
                  <div key={index}>
                    {isNewDay && <Text>{messageDate}</Text>}
                    {msg.user.username === localStorage.getItem("username") ? (
                      <>
                        <Message
                          avatar={authenticatedUser.photo}
                          text={msg.text}
                          photos={image}
                          time={newText}
                          modalPhoto={modalPh}
                          photoData = {photoData}
                          sent
                        />
                      </>
                    ) : (
                      <>
                        {otherUserAvatars
                          .filter((user) => user.username === msg.user.username)
                          .map((user) => (
                            <Message
                              key={user.username}
                              avatar={user.avatar}
                              username={userNameMesage}
                              text={msg.text}
                              photos={image}
                              time={newText}
                              modalPhoto={modalPh}
                              photoData = {photoData}
                            />
                          ))}
                      </>
                    )}
                  </div>
                );
              }))}
          </>
        }
      />
    </>
  );
}

export default GroupChats;
