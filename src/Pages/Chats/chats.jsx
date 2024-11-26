import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ChatArea from "../../Widgets/chatArea/chatArea";
import Message from "../../Widgets/Message/message";
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
  const REQUEST_ID = 1;
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [sendImage, setSendImage] = useState("");
  const [sendingPhoto, setSendingPhoto] = useState([]);
  const [sendDocument, setSendDocument] = useState("");
  const [isWebSocketOpen, setIsWebSocketOpen] = useState(false);
  const [chatSocket, setChatSocket] = useState(null);
  const [roomList, setRoomList] = useState(null);
  const [inputPrew, setInputPrew] = useState({});
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
  const [messageMenu, setMessageMenu] = useState(true);
  const [replyMessage, setReplyMessage] = useState([]);
  const [replyMessagePrew, setReplyMessagePrew] = useState([]);
  const [emojiWindow, setEmojiWindow] = useState(false);
  const [selectReactionEmoji, setReactionEmoji] = useState([]);
  const [focusMessage, setFocusMessage] = useState();

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
            request_id: REQUEST_ID,
          })
        );
        socket.send(
          JSON.stringify({
            pk: room_pk,
            action: "retrieve",
            request_id: REQUEST_ID,
          })
        );
        socket.send(
          JSON.stringify({
            pk: room_pk,
            action: "subscribe_to_messages_in_room",
            request_id: REQUEST_ID,
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
          case "update":
            setMessages((prevMessages) => {
              const updatedMessages = prevMessages.map((msg) => {
                if (msg.id === data.data.id) {
                  const updatedMessage = { ...msg, ...data.data };
                  if (updatedMessage.reactions) {
                    updatedMessage.reactions = updatedMessage.reactions.map(
                      (reaction) => {
                        if (
                          reaction.id_user.photo &&
                          !reaction.id_user.photo.startsWith("http")
                        ) {
                          reaction.id_user.photo = `http://127.0.0.1:8000${reaction.id_user.photo}`;
                        }
                        return reaction;
                      }
                    );
                  }
                  if(updatedMessage.images){
                    updatedMessage.images = updatedMessage.images.map(
                      (image) => {
                       if (
                          image.image &&
                          !image.image.startsWith("http")
                      ){
                        image.image = `http://127.0.0.1:8000${image.image}`;
                        }
                        return image
                      }
                    )
                  }
                  if (updatedMessage.reply_to) {
                    if (updatedMessage.reply_to.images) {
                      updatedMessage.reply_to.images = updatedMessage.reply_to.images.map((image) => {
                        if (image.image && !image.image.startsWith("http")) {
                          image.image = `http://127.0.0.1:8000${image.image}`;
                        }
                        return image;
                      });
                    }
                  }
                  return updatedMessage;
                }
                return msg;
              });
              return updatedMessages;
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
    e.preventDefault();
    setMessage(e.target.value);
  };

  function inputEmoji(emojiObject) {
    const sys = emojiObject.unified.split("_");
    const codeArray = [];
    sys.forEach((el) => codeArray.push("0x" + el));
    let emoji = String.fromCodePoint(...codeArray);

    setMessage((prevInput) => prevInput + emoji);
  }

  const handleInputImages = (e) => {
    try {
      if (e.target.files.length > 10) {
        alert("Можно отправить только 10 файлов");
        setModel(false);
        setSendImage("");
        return null;
      }

      setModel(true);
      setSelectTypeFile(false);
      const files = Array.from(e.target.files);
      console.log(files);
      const fileType = e.target.files;
      console.log(fileType);
      setSendImage(files);
      console.log("Выбранный файл изображения:", files);

      const prewImages = [];
      files.forEach((file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          const previewData = {
            content: reader.result,
            type: file.type,
          };
          prewImages.push(previewData);
          console.log(previewData);
          setInputPrew((prev) => ({
            ...prev,
            preview: [...(prev.preview || []), previewData],
          }));
        };

        reader.readAsDataURL(file);
      });

      if (inputPrew && inputPrew.preview) {
        console.log("Предпросмотр изображений:", inputPrew.previews);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const handleInputDocuments = (e) => {
    try {
      if (e.target.files.length > 10) {
        alert("Можно отправить только 10 файлов");
        setModel(false);
        setSendDocument("");
        return null;
      }

      setModel(true);
      setSelectTypeFile(false);
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
          // console.log(previewData);

          setInputPrew((prev) => ({
            ...prev,
            preview: [...(prev.preview || []), previewData],
          }));
        };

        reader.readAsDataURL(file);
      });

      if (prewImages.length > 0) {
        // console.log("Предпросмотр изображений с типами:", prewImages);
      }
    } catch (error) {
      console.error(error);
    }
  };

  function handleCancelAddPhoto() {
    setModel(false);
    setInputPrew("");
    setProgressBar(0);
  }

  function handleCancelPhoto() {
    setPhotoModal(false);
  }

  function updateProgress(loaded, total) {
    const percentLoaded = Math.round((loaded / total) * 100);
    setProgressBar(percentLoaded);
    return percentLoaded;
  }

  async function sendMess() {
    if (isSending) return;

    setIsSending(true);

    try {
      let imageData = [];
      let documentsData = [];
      if (sendImage) {
        if (Array.isArray(sendImage) && sendImage.length > 0) {
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
            setSendingPhoto(response.data);
            return response.data.id;
          });

          // Дожидаемся всех завершенных запросов
          imageData = await Promise.all(uploadPromises);
        }
        if (!isWebSocketOpen || !chatSocket) {
          console.log("WebSocket не открыт. Сообщение не отправлено.");
          return;
        }

        const messageData = {
          message: message || "",
          images: imageData || [],
          action: "create_message",
          request_id: REQUEST_ID,
        };

        // Отправляем сообщение через WebSocket
        chatSocket.send(JSON.stringify(messageData));
      } else if (sendDocument) {
        // console.log(sendDocument);
        if (Array.isArray(sendDocument) && sendDocument.length > 0) {
          const uploadPromises = Array.from(sendDocument).map(
            async (documents) => {
              if (!documents || documents.size === 0) {
                alert(` Пустой  "${documents.name}" не может быть отправлен`);
                setMessage("");
                setSendImage("");
                setInputPrew("");
                setModel(false);
                return null;
              }

              // console.log("Отправка документов");
              const formData = new FormData();
              formData.append("document", documents);
              // console.log(formData);

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
                  console.log(`Документа: ${percentCompleted}% завершено`);
                },
              });

              console.log(response.data);
              setSendDocument(response.data);
              return response.data.id;
            }
          );
          documentsData = await Promise.all(uploadPromises);
        }
        if (!isWebSocketOpen || !chatSocket) {
          console.log("WebSocket не открыт. Сообщение не отправлено.");
          return;
        }
        const messageData = {
          message: message || "",
          documents: documentsData || [],
          action: "create_message",
          request_id: REQUEST_ID,
        };
        chatSocket.send(JSON.stringify(messageData));
      } else {
        if (!isWebSocketOpen || !chatSocket) {
          console.log("WebSocket не открыт. Сообщение не отправлено.");
          return;
        }

        if (!message) return null;
        if (!message && replyMessage) return null;
        const messageData = {
          message: message || "",
          images: imageData || [],
          documents: documentsData || [],
          action: "create_message",
          request_id: REQUEST_ID,
          reply_to: replyMessage ? replyMessage : null,
        };

        chatSocket.send(JSON.stringify(messageData));
      }

      setMessage("");
      setSendImage("");
      setInputPrew("");
      setModel(false);
      setSelectTypeFile(false);
      setReplyMessage("");
      setReplyMessagePrew("");
    } catch (error) {
      console.error("Error sending message:", error);

      if (error.response) {
        console.log("Error data:", error.response.data); // Данные об ошибке от сервера
        console.log("Error status:", error.response.status); // Статус ошибки
        console.log("Error headers:", error.response.headers); // Заголовки ошибки
      } else {
        console.log("Error message:", error.message);
      }
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
  function removeElementModal(inputPrew) {
    console.log("remove " + inputPrew);
  }

  const keyDownEvent = (e) => {
    if (e.code === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMess();
    }
  };

  function setMenu(msg) {
    setFocusMessage(msg);
    setMessageMenu(!messageMenu);
  }

  function hideMenu() {
    setMessageMenu(false);
  }

  function repMessage(message) {
    setReplyMessage(message.id);

    setReplyMessagePrew([
      {
        id: message.id,
        user: message.user,
        text: message.text,
        photos: message.images,
        documents: message.documents,
      },
    ]);
  }

  function closeReply() {
    setReplyMessage("");
    setReplyMessagePrew("");
  }

  function selectTypeSendFile() {
    setSelectTypeFile(!selectTypeFile);
    setEmoji(false);
  }
  function showEmojiWindows() {
    setEmojiWindow(!emojiWindow);
  }
  const userAuth = autUsr;
  const authenticatedUser = authUser.find((user) => user.username === userAuth);

  async function sendReaction(messageId, reactionId) {
    try {
      const messageData = {
        message_id: messageId,
        reaction_id: reactionId,
        request_id: REQUEST_ID,
        action: "update_message_reactions",
      };

      chatSocket.send(JSON.stringify(messageData));
    } catch (error) {
      console.error(
        "Ошибка при отправке реакции:",
        error.response?.data || error.message
      );
    }
  }

  async function deleteReaction(reactionId, messageId, requestion) {
    try {
      if (!reactionId) return null;

      if (requestion.id_user.username === autUsr) {
        const messageData = {
          message_id: messageId,
          reaction_id: reactionId,
          request_id: REQUEST_ID,
          action: "delete_reaction",
        };
        chatSocket.send(JSON.stringify(messageData));
        const url = `http://127.0.0.1:8000/chat/reaction/destroy/${reactionId}/`;
        const response = await axios.delete(url);
        if (response.status === 204) {
        } else {
          console.error("Непредвиденный ответ от сервера", response.status);
        }
      }
    } catch (error) {
      console.error(
        "Ошибка при отправке реакции:",
        error.response?.data || error.message
      );
    }
  }

  async function handleEmojiSelect(selectReactionEmoji) {
    const reactionData = {
      id_user: authenticatedUser.id,
      emoji: selectReactionEmoji,
    };

    try {
      const url = "http://127.0.0.1:8000/chat/reaction/";
      const response = await axios.post(url, reactionData);
      if (response.status === 201 || response.status === 200) {
        const newReaction = {
          id: response.data.id, // Получаем ID из ответа
          emoji: response.data.emoji,
          id_user: response.data.id_user,
        };
        setReactionEmoji(newReaction);
        await sendReaction(focusMessage, newReaction.id);
        showEmojiWindows();
        return response;
      } else {
        console.error(
          "Ошибка: Непредвиденный ответ от сервера",
          response.status
        );
      }
    } catch (error) {
      if (error.response) {
        console.error("Ошибка сервера:", error.response.data);
      } else if (error.request) {
        console.error("Ошибка сети. Сервер не отвечает:", error.request);
      } else {
        console.error("Неизвестная ошибка:", error.message);
      }
    }
  }
  const NoMessages = () => (
    <div className={styles.nullMessageWrap}>
      <Icon>
        <BiMessageAltX color="gray" size="25" />
      </Icon>
      <p className={styles.nullMessageText}>Сообщений пока нет</p>
    </div>
  );

  const MessageGroup = ({
    msg,
    photoData,
    isNewDay,
    authenticatedUser,
    otherUserAvatar,
    localUser,
  }) => {
    const messageDate = msg.created_at.substring(0, 10);
    const messageTime = msg.created_at.substring(11, 16);
    const isAuthored = msg.user.username === localUser;
    return (
      <div>
        {isNewDay && <p className={styles.dataTimeMessage}>{messageDate}</p>}
        <Message
          sent={isAuthored}
          text={msg.text}
          time={messageTime}
          photos={msg.images.map((image) => image.image)}
          documents={msg.documents}
          avatar={isAuthored ? authenticatedUser.photo : otherUserAvatar}
          modalPhoto={modalPh}
          photoData={photoData}
          setMenu={() => setMenu(msg.id)}
          isShowMenu={messageMenu}
          hiddenMenu={hideMenu}
          replyMessage={() => repMessage(msg)}
          reply={msg}
          setEmojiWindow={showEmojiWindows}
          emojiWindow={emojiWindow}
          reactions={msg}
          onEmojiSelect={handleEmojiSelect}
          authUsers={authUser}
          onDestroyReaction={deleteReaction}
        />
      </div>
    );
  };

  const filteredMessages = messages.filter(
    (msg) => msg.room && msg.room.id === parseInt(id)
  );
  return (
    <>
      <ModalSendMessage
        title="Отправить сообщение "
        onCancel={handleCancelAddPhoto}
        onSubmit={sendMess}
        inputPrewiew={inputPrew.preview}
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
        replyMessage={replyMessagePrew}
        closeReplyMenu={closeReply}
        setSelect={selectTypeSendFile}
        content={
          <>
            {filteredMessages.length === 0 ? (
              <NoMessages />
            ) : (
              filteredMessages.map((msg, index, arr) => {
                const previousMessage = arr[index - 1];
                const previousDate = previousMessage
                  ? previousMessage.created_at.substring(0, 10)
                  : null;
                const isNewDay =
                  previousDate !== msg.created_at.substring(0, 10);
                const photoData = msg.images.map((image) => image);
                return (
                  <MessageGroup
                    key={index}
                    msg={msg}
                    previousDate={previousDate}
                    photoData={photoData}
                    isNewDay={isNewDay}
                    authenticatedUser={authenticatedUser}
                    otherUserAvatar={otherUserAvatar}
                    localUser={autUsr}
                  />
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
