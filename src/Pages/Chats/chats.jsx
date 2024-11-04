import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ChatArea from "../../Widgets/chatArea/chatArea";
import Message from "../../Shared/Message/message";
import Icon from "../../Shared/icon/icon";
import { BiMessageAltX } from "react-icons/bi";
import { getData } from "../../Entities/api/getUserList";
import styles from "../../App/Styles/chats.module.css";
import ModalPhoto from "../../Widgets/modalPhoto/modalPhoto";
import ModalSendMessage from "../../Widgets/modalSendMessage/modalSendMessage";
// import EmojiPicker from "emoji-picker-react";
function Chats() {
  const autUsr = localStorage.getItem("username");
  const { id } = useParams();
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [sendImage, setSendImage] = useState("");
  const [sendingPhoto, setSendingPhoto] = useState([]);
  const [sendDocument, setSendDocument] = useState("");
  const [isWebSocketOpen, setIsWebSocketOpen] = useState(false);
  const [chatSocket, setChatSocket] = useState(null);
  const [roomList, setRoomList] = useState(null);
  const [imagePrew, setImagePrew] = useState({});
  const [otherUserAvatar, setOtherUserAvatar] = useState(null);
  const [authUser, setAuthUser] = useState([]);
  const [modal, setModel] = useState(false);
  const [photoModal, setPhotoModal] = useState(false);
  const [modalPhoto, setModalPhoto] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [currentPhotoId, setCurrentPhotoId] = useState(0);
  const [isOpenEmoji, setEmoji] = useState(false);
  const [isOpenModelEmoji, setModelEmoji] = useState(false);
  const [progressBar, setProgressBar] = useState(0);
  // const [isOpenReactions, setReactions] = useState(false);
  const [selectTypeFile, setSelectTypeFile] = useState(false);


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
    e.preventDefault()
    setMessage(e.target.value);
  };

  function inputEmoji(emojiObject) {
    setMessage((prevInput) => prevInput + emojiObject.emoji);
  }

  const handleInputImages = (e) => {
    try {
      if (e.target.files.length > 0) {
        setModel(true);
        const files = Array.from(e.target.files);
        console.log(files);
        const fileType = e.target.files;
        console.log(fileType);
        setSendImage(files);
        console.log("Выбранный файл изображения:", files);

        const prewImages = [];
        files.forEach((file) => {
          const reader = new FileReader();
          // reader.onloadend = () => {
          //   prewImages.push(reader);
          //   setImagePrew((prev) => ({
          //     ...prev,
          //     preview: [...(prev.preview || []), reader],
          //   }));
          // };

          reader.onloadend = () => {
            const previewData = {
              content: reader.result,
              type: file.type,
            };
            prewImages.push(previewData);

            setImagePrew((prev) => ({
              ...prev,
              preview: [...(prev.preview || []), previewData],
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
  const handleInputDocuments = (e) => {
    try {
      if (e.target.files.length > 0) {
        setModel(true);
        const files = Array.from(e.target.files);
        setSendDocument(files);

        const prewImages = [];
        files.forEach((file) => {
          const reader = new FileReader();

          reader.onloadend = () => {
            const previewData = {
              content: reader.result,
              type: file.type,
            };
            prewImages.push(previewData);

            setImagePrew((prev) => ({
              ...prev,
              preview: [...(prev.preview || []), previewData],
            }));
          };

          reader.readAsDataURL(file);
        });

        if (prewImages.length > 0) {
          console.log("Предпросмотр изображений с типами:", prewImages);
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
    setProgressBar(0);
  }

  function handleCancelPhoto() {
    setPhotoModal(false);
  }

  const BYTES_IN_MB = 1048576;
  function updateProgress(loaded, total) {
    const loadedMb = (loaded / BYTES_IN_MB).toFixed(1);
    const totalSizeMb = (total / BYTES_IN_MB).toFixed(1);
    const percentLoaded = Math.round((loaded / total) * 100);

    setProgressBar(percentLoaded);
    // console.log(`${loadedMb} из ${totalSizeMb} МБ`)
    // console.log( `Загружено ${percentLoaded}% `)
    return percentLoaded;
  }

  async function sendMess() {
    if (isSending) return;
    setIsSending(true);
    // console.log(sendImage);

    try {
      let imageData = [];
      let documentsData = [];
      if (sendImage || message) {
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
            return response.data.id; // Возвращаем id изображения с сервера
          });

          // Дожидаемся всех завершенных запросов
          imageData = await Promise.all(uploadPromises);
        }
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

        // Отправляем сообщение через WebSocket
        chatSocket.send(JSON.stringify(messageData));
      }
      if (sendDocument || message) {
        console.log(sendDocument);
        if (Array.isArray(sendDocument) && sendDocument.length > 0) {
          const uploadPromises = Array.from(sendDocument).map(
            async (documents) => {
              console.log("Отправка документов");
              const formData = new FormData();
              formData.append("document", documents);
              console.log(formData);

              const url = "http://127.0.0.1:8000/chat/documents-upload/";
              const response = await axios.post(url, formData, {
                headers: {
                  "Content-Type": "multipart/form-data",
                },
                onUploadProgress: (progressEvent) => {
                  const percentCompleted = updateProgress(
                    progressEvent.loaded,
                    progressEvent.total
                  );
                  console.log(
                    `Загрузка изображения: ${percentCompleted}% завершено`
                  );
                },
              });

              console.log(response.data);
              setSendDocument(response.data);
              return response.data.id;
            }
          );

          // Дожидаемся всех завершенных запросов
          documentsData = await Promise.all(uploadPromises);
        }
        if (!isWebSocketOpen || !chatSocket) {
          console.log("WebSocket не открыт. Сообщение не отправлено.");
          return;
        }

        const request_id = 1;
        const messageData = {
          message: message || "",
          documents: documentsData || [],
          action: "create_message",
          request_id: request_id,
        };

        // Отправляем сообщение через WebSocket
        chatSocket.send(JSON.stringify(messageData));
      }
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
    setEmoji(!isOpenEmoji);
  }

  function openModelEmoji() {
    setModelEmoji(!isOpenModelEmoji);
  }
  function removeElementModal(imagePrew) {
    console.log("remove " + imagePrew);
  }

  const keyDownEvent = (e) =>{
    if (e.code === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMess()

    }
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
        keyDownSend={keyDownEvent}
        isOpen={modal}
        openEmoji={openModelEmoji}
        isOpenEmoji={isOpenModelEmoji}
        emojiEvent={inputEmoji}
        progressBar={progressBar}
        removeElement={removeElementModal}
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
        documents={handleInputDocuments}
        images={handleInputImages}
        sendmessage={sendMess}
        openEmoji={openEmoji}
        isOpenEmoji={isOpenEmoji}
        emojiEvent={inputEmoji}
        keyDownSend={keyDownEvent}
        selectTypeFile={selectTypeFile}
        setSelect={() => setSelectTypeFile(!selectTypeFile)}
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
                  const photoData = msg.images.map((image) => image);

                  const docs = msg.documents.map((doc) =>
                    decodeURIComponent(doc.document.substring(43))
                  );

                  return (
                    <div key={index}>
                      {isNewDay && (
                        <p className={styles.dataTimeMessage}>{messageDate}</p>
                      )}
                      {msg.user.username ===
                      localStorage.getItem("username") ? (
                        <>
                        <Message
                          sent
                          avatar={authenticatedUser.photo}
                          text={msg.text}
                          photos={msg.images.map((image) => image.image)}
                          documents={docs ? docs : null}
                          time={newText}
                          modalPhoto={modalPh}
                          photoData={photoData}
                          // reactionMessage={openReactions}
                          // isOpenReactions={isOpenReactions}
                        />
                        </>
                      ) : (
                        <Message
                          text={msg.text}
                          time={newText}
                          photos={msg.images.map((image) => image.image)}
                          documents={docs ? docs : null}
                          avatar={otherUserAvatar}
                          modalPhoto={modalPh}
                          photoData={photoData}
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
