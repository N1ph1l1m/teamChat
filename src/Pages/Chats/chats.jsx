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
import ModalPhoto from "../../Widgets/modalPhoto/modalPhoto";
import ModalSendMessage from "../../Widgets/modalSendMessage/modalSendMessage";
import { IoSend } from "react-icons/io5";
function Chats() {
  const { id } = useParams();
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [sendImage, setSendImage] = useState("");
  const [isWebSocketOpen, setIsWebSocketOpen] = useState(false);
  const [chatSocket, setChatSocket] = useState(null);
  const [roomList, setRoomList] = useState(null);
  const [imagePrew, setImagePrew] = useState({});
  const [otherUserAvatar, setOtherUserAvatar] = useState(null);
  const [authUser, setAuthUser] = useState([]);
  const [sendingPhoto,setSendingPhoto] = useState([]);
  const [modal, setModel] = useState(false);
  const [photoModal,setPhotoModal] = useState(false);
  const autUsr = localStorage.getItem("username");
  const [modalPhoto, setModalPhoto] = useState('');
    const [isSending, setIsSending] = useState(false);

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
              console.log(data.data.images)

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
        setModel(true);
        const files = Array.from(e.target.files);
        setSendImage(files);
        console.log("Выбранный файл изображения:", files);

        const prewImages = []
        files.forEach((file)=>{
          const reader = new FileReader();
          reader.onloadend = () =>{
            prewImages.push(reader.result);
            setImagePrew((prev)=>({
              ...prev,
              preview: [...(prev.preview || []), reader.result],
            }));
          };
          reader.readAsDataURL(file)
        })

        if (imagePrew && imagePrew.preview) {
          console.log("Предпросмотр изображений:", imagePrew.previews);
        }
      } else {
        console.log("Файл не выбран");
      }
    } catch (error) {
      console.error(error);
    }
  };

  function handleCancelAddPhoto() {
    setModel(false);
    setImagePrew("")
  }

  function handleCancelPhoto() {
    setPhotoModal(false);
  }


async function sendMess() {
  if (isSending) return;
  setIsSending(true);
  // console.log(sendImage);

  try {
      let imageData = [];

      if (sendImage) {
          if (Array.isArray(sendImage) && sendImage.length > 0) {
              // Отправляем все изображения и ждем завершения всех запросов
              const uploadPromises = Array.from(sendImage).map(async (img) => {
                  console.log("Отправка изображения");
                  const formData = new FormData();
                  formData.append("image", img);

                  const url = 'http://127.0.0.1:8000/chat/photo-upload/';
                  const response = await axios.post(url, formData, {
                      headers: {
                          "Content-Type": "multipart/form-data",
                      },
                  });
                    console.log(response.data)
                    setSendingPhoto(response.data)
                  return response.data.id; // Возвращаем id изображения с сервера
              });

              // Дожидаемся всех завершенных запросов
              imageData = await Promise.all(uploadPromises);
          }
      }

      console.log("Response from server (images):", imageData);

      // Проверка на открытость WebSocket соединения
      if (!isWebSocketOpen || !chatSocket) {
          console.log("WebSocket не открыт. Сообщение не отправлено.");
          return;
      }

      // Формируем данные для отправки
      const request_id = 1;
      const messageData = {
          message: message || "",
          images: imageData || [],
          action: "create_message",
          request_id: request_id,
      };

      // Отправляем сообщение через WebSocket
      chatSocket.send(JSON.stringify(messageData));

      // Очищаем состояние формы
      setMessage("");
      setSendImage("");
      setImagePrew("");
      setModel(false);

  } catch (error) {
      console.error("Error sending message:", error);
  } finally {
      setIsSending(false);
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

                  const image =
                    msg.image && msg.image.startsWith("http://127.0.0.1:8000")
                      ? msg.images.image
                      : msg.images.image
                      ? `http://127.0.0.1:8000${msg.image}`
                      : null;
                  console.log(sendingPhoto)
                    const imgs = msg.images.map(imageses=>imageses.image)
                    const photoData = { id: msg.id, src: imgs, text: msg.text, time: newText };
                  return (
                    <div key={index}>
                      {isNewDay && (
                        <p className={styles.dataTimeMessage}>{messageDate}</p>
                      )}
                      {msg.user.username ===
                      localStorage.getItem("username") ? (
                        <Message
                          text={msg.text}
                          photos={imgs}
                          time={newText}
                          sent
                          avatar={authenticatedUser.photo}
                          modalPhoto={modalPh}
                          photoData = {photoData}
                        />
                      ) : (
                        <Message
                          text={msg.text}
                          time={newText}
                          photos={imgs}
                          avatar={otherUserAvatar}
                          modalPhoto={modalPh}
                          photoData = {photoData}
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
