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
import styles from "../../App/Styles/chats.module.css";
import Icon from "../../Shared/icon/icon";
import { BiMessageAltX } from "react-icons/bi";

const Text = styled.div`
  color: gray;
  font-size: 14px;
`;

function GroupChats() {
  const autUsr = localStorage.getItem("username");
  const { id } = useParams();
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [sendImage, setSendImage] = useState("");
  const [isWebSocketOpen, setIsWebSocketOpen] = useState(false);
  const [chatSocket, setChatSocket] = useState(null);
  const [roomList, setRoomList] = useState([]);
  const [imagePrew, setImagePrew] = useState({});
  const [otherUserAvatars, setOtherUserAvatars] = useState(null);
  const [authUser, setAuthUser] = useState([]);
  const [sendingPhoto, setSendingPhoto] = useState([]);
  const [modal, setModel] = useState(false);
  const [photoModal, setPhotoModal] = useState(false);
  const [modalPhoto, setModalPhoto] = useState("");
  const [isOpenEmoji, setEmoji] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [isOpenModelEmoji, setModelEmoji] = useState(false);
  const [isOpenReactions, setReactions] = useState(false);

  const [currentPhotoId, setCurrentPhotoId] = useState(0);

  useEffect(() => {
    async function getRoomData() {
      console.log("getRoomData");
      const data = await axios.get(`http://127.0.0.1:8000/chat/rooms/${id}/`);
      if (data) {
        setRoomList(data.data);
        console.log("setRoomList");
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

    async function getMessageData() {
      console.log("Message");
      const data = await getData(`chat/room/message/`, setMessages);
      return data;
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

    const room_pk = id;
    const request_id = 1;
    const token = localStorage.getItem("token").trim();

    function websocket() {
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

      socket.onmessage = function (e) {
        const data = JSON.parse(e.data);
        switch (data.action) {
          case "create":
            setMessages((prevMessages) => {
              const messageExists = prevMessages.some(
                (msg) => msg.id === data.data.id
              );
              console.log(data.data.images);
              getMessageData();
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

  const handleInputTextChange = (e) => {
    setMessage(e.target.value);
    console.log(message);
  };

  function inputEmoji(emojiObject) {
    setMessage((prevInput) => prevInput + emojiObject.emoji);
  }

  const handleInputFileChange = (e) => {
    try {
      if (e.target.files.length > 0) {
        setModel(true);
        const files = Array.from(e.target.files);
        setSendImage(files);
        console.log("Выбранный файл изображения:", files);

        const prewImages = [];
        files.forEach((file) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            prewImages.push(reader.result);
            setImagePrew((prev) => ({
              ...prev,
              preview: [...(prev.preview || []), reader.result],
            }));
          };
          reader.readAsDataURL(file);
        });

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
    setImagePrew("");
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

            const url = "http://127.0.0.1:8000/chat/photo-upload/";
            const response = await axios.post(url, formData, {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            });
            console.log(response.data);
            setSendingPhoto(response.data);
            return response.data.id;
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

      const request_id = 1;
      const messageData = {
        message: message || "",
        images: imageData || [],
        action: "create_message",
        request_id: request_id,
      };
      chatSocket.send(JSON.stringify(messageData));

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
    }
  }

  const modalPh = (photoData) => {
    setCurrentPhotoId(photoData.id);
    console.log(photoData);
    setModalPhoto(photoData);
    setPhotoModal(true);
  };

  const nextImg = () => {
    console.log("next");
    if (currentPhotoId < modalPhoto.photoData.length - 1) {
      setCurrentPhotoId(currentPhotoId + 1);
    }
  };

  const prevImg = () => {
    console.log("prev");
    if (!currentPhotoId > 0) return;
    setCurrentPhotoId(currentPhotoId - 1);
  };

  function openEmoji() {
    setEmoji(true);
  }
  function closeEmoji() {
    setEmoji(false);
  }

  function openModelEmoji() {
    setModelEmoji(true);
  }
  function closeModelEmoji() {
    setModelEmoji(false);
  }

  function openReactions() {
    setReactions(!isOpenReactions);
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
        openEmoji={openModelEmoji}
        closeEmoji={closeModelEmoji}
        isOpenEmoji={isOpenModelEmoji}
        emojiEvent={inputEmoji}
      />
      <ModalPhoto
        sizeGalary={modalPhoto.photoData}
        image={
          modalPhoto &&
          modalPhoto.photoData &&
          modalPhoto.photoData[currentPhotoId]
            ? modalPhoto.photoData[currentPhotoId].image
            : null
        }
        isOpen={photoModal}
        onCancel={handleCancelPhoto}
        nextPhoto={nextImg}
        prevPhoto={prevImg}
      />
      <ChatArea
        title={roomList ? formatRoomName(roomList.name) : ""}
        inputValue={message}
        input={handleInputTextChange}
        file={handleInputFileChange}
        sendmessage={sendMess}
        openEmoji={openEmoji}
        closeEmoji={closeEmoji}
        isOpenEmoji={isOpenEmoji}
        emojiEvent={inputEmoji}
        content={
          <>
            {messages.filter((msg) => msg.room.id === parseInt(id)).length ===
            0 ? (
              <div className={styles.nullMessageWrap}>
                <Icon>
                  <BiMessageAltX color="gray" size="25" />
                </Icon>
                <p className={styles.nullMessageText}>Сообщений пока нет</p>
              </div>
            ) : (
              messages
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

                    const photoData = msg.images.map((image) => image);

                  return (
                    <div key={index}>
                      {isNewDay && <Text>{messageDate}</Text>}
                      {msg.user.username ===
                      localStorage.getItem("username") ? (
                        <>
                          <Message
                            sent
                            avatar={authenticatedUser.photo}
                            text={msg.text}
                            photos={msg.images.map((image) => image.image)}
                            time={newText}
                            modalPhoto={modalPh}
                            photoData={photoData}
                              // reactionMessage={openReactions}
                          // isOpenReactions={isOpenReactions}
                          />
                        </>
                      ) : (
                        <>
                          {otherUserAvatars
                            .filter(
                              (user) => user.username === msg.user.username
                            )
                            .map((user) => (
                              <Message
                                key={user.username}
                                avatar={user.avatar}
                                username={userNameMesage}
                                text={msg.text}
                                photos={msg.images.map((image) => image.image)}
                                time={newText}
                                modalPhoto={modalPh}
                                photoData={photoData}
                              />
                            ))}
                        </>
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

export default GroupChats;
