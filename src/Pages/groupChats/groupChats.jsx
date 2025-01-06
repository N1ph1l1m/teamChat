import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import ChatArea from "../../Widgets/chatArea/chatArea";
import Message from "../../Widgets/Message/message";
import Icon from "../../Shared/icon/icon";
import { BiMessageAltX } from "react-icons/bi";
import { getData } from "../../Entities/api/getUserList";
import { getRoomData } from "../../Entities/api/getRoomData";
import { ReadMessageAll } from "../../Entities/api/ReadAllMessage";
import { Parameters } from "../../App/Parameters/Parametrs";
import {
  createNewMessageForward,
  sendForward,
} from "../../Entities/api/forwardMessage";
import { GroupProfile } from "../../Shared/UserProfile/UserProfile";
import { createReaction } from "../../Entities/api/ReactionToMessage";
import styles from "../../App/Styles/chats.module.css";
import ModalPhoto from "../../Widgets/modalPhoto/modalPhoto";
import ModalSendMessage from "../../Widgets/modalSendMessage/modalSendMessage";
import ModalForwardMessage from "../../Widgets/ModalForwardMessage/modalForwardMessage";
import { RoomList } from "../../Entities/Lists/roomList";
import { Loader } from "../../Shared/loader/loader";
import { GroupRoomList } from "../../Entities/Lists/roomList";
import {
  handlerInputTextChange,
  handlerInputImages,
  handlerInputDocuments,
} from "../../Features/inputHandlerEvents/handlersChat";
import {
  fetchData,
  fetchDataRoomList,
  getMessageData,
  showMessageAvatar,
  webSocket,
} from "../../Features/getServerData/getServerData";
import { addRoomList } from "../../store/actions/addRoomList";
import userLogo from "../../App/images/userAvatar.png";

function GroupChats() {
  const dispatch = useDispatch();
  const autUsr = localStorage.getItem("username");
  const TOKEN = localStorage.getItem("token").trim();
  const { id } = useParams();
  const REQUEST_ID = 1;
  const ROOM_PK = id;
  const [authUserId, setAuthUserId] = useState("");
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [sendImage, setSendImage] = useState("");
  const [sendingPhoto, setSendingPhoto] = useState([]);
  const [sendDocument, setSendDocument] = useState("");
  const [isWebSocketOpen, setIsWebSocketOpen] = useState(false);
  const [chatSocket, setChatSocket] = useState(null);
  const [roomList, setRoomList] = useState(null);
  const [roomListForwardModal, setRoomListForwardModal] = useState(null);
  const [inputPrew, setInputPrew] = useState({});
  const [otherUserAvatar, setOtherUserAvatar] = useState(null);
  const [authUser, setAuthUser] = useState([]);
  const [otherUserId, setOtherUserId] = useState(null);
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
  const [isSelectedMessage, setIsSelectedMessage] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState([]);
  const [isOpenModalForward, setOpenModalForward] = useState(false);
  const [isSelectRoomSendForward, setSelectRoomSendForward] = useState([]);

  useEffect(() => {
    async function getMessageData() {
      // console.log("Message");
      const data = await getData(`chat/room/message/`, setMessages);
      return data;
    }
    let reconnectInterval = 1000;

    function webSocket() {
      // console.log("websocket");
      const socketUrl = `ws://localhost:8000/ws/chat/${ROOM_PK}/?token=${TOKEN}`;
      let socket = new WebSocket(socketUrl);
      socket.onopen = function () {
        console.log("WebSocket открыт");
        setIsWebSocketOpen(true);

        socket.send(
          JSON.stringify({
            pk: ROOM_PK,
            action: "join_room",
            request_id: REQUEST_ID,
          })
        );
        socket.send(
          JSON.stringify({
            pk: ROOM_PK,
            action: "retrieve",
            request_id: REQUEST_ID,
          })
        );
        socket.send(
          JSON.stringify({
            pk: ROOM_PK,
            action: "subscribe_to_messages_in_room",
            request_id: REQUEST_ID,
          })
        );
      };
      function reconnectWebSocket() {
        socket = new WebSocket(socketUrl);
      }
      socket.onclose = function (event) {
        console.log("Соединение закрыто. Попытка переподключиться...");
        setTimeout(reconnectWebSocket(), reconnectInterval);

        reconnectInterval = Math.min(reconnectInterval * 2, 5000);
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
                  if (updatedMessage.images) {
                    updatedMessage.images = updatedMessage.images.map(
                      (image) => {
                        if (image.image && !image.image.startsWith("http")) {
                          image.image = `http://127.0.0.1:8000${image.image}`;
                        }
                        return image;
                      }
                    );
                  }

                  if (updatedMessage.reply_to) {
                    if (updatedMessage.reply_to.images) {
                      updatedMessage.reply_to.images =
                        updatedMessage.reply_to.images.map((image) => {
                          if (image.image && !image.image.startsWith("http")) {
                            image.image = `http://127.0.0.1:8000${image.image}`;
                          }
                          return image;
                        });
                    }
                  }
                  if (updatedMessage.forwarded_messages) {
                    updatedMessage.forwarded_messages =
                      updatedMessage.forwarded_messages.map((image) => {
                        if (
                          image.original_message.user.photo &&
                          !image.original_message.user.photo.startsWith("http")
                        ) {
                          image.original_message.user.photo = `http://127.0.0.1:8000${image.original_message.user.photo}`;
                        }

                        image.original_message.images.map((img) => {
                          console.log(img);
                          if (img.image && !img.image.startsWith("http")) {
                            img.image = `http://127.0.0.1:8000${img.image}`;
                          }
                        });

                        return image;
                      });
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

    async function go() {
      fetchData(setAuthUser);
      fetchDataRoomList(setRoomListForwardModal);
      const dataRoom = await getRoomData(
        setRoomList,
        Parameters.authUser,
        setAuthUserId,
        id
      );
      await showMessageAvatar(
        dataRoom,
        Parameters.authUser,
        setOtherUserId,
        setOtherUserAvatar
      );
      await getMessageData(setMessages);
      webSocket(
        ROOM_PK,
        Parameters.token,
        reconnectInterval,
        setIsWebSocketOpen,
        Parameters.request_id,
        setMessages,
        setChatSocket
      );
    }

    go();
  }, [id]);

  async function ReadMessage() {
    await ReadMessageAll(otherUserId);
  }

  useEffect(() => {
    if (messages.length === 0) {
      const timeout = setTimeout(() => setIsLoading(false), 10);
      ReadMessage();
      return () => clearTimeout(timeout);
    }
    if (messages.length > 0) {
      const timeout = setTimeout(() => setIsLoading(true), 100);
      ReadMessage();
      return () => clearTimeout(timeout);
    }
  }, [messages]);

  function handleCancelModal() {
    setModel(false);
    setInputPrew("");
    setProgressBar(0);
    setOpenModalForward(false);
    setSelectedMessage("");
    setPhotoModal(false);
    setIsSelectedMessage(false);
    setSelectRoomSendForward("");
  }

  function checkAnonimusUser(messageData) {
    try {
      if (!chatSocket || chatSocket.readyState !== WebSocket.OPEN) {
        throw new Error("WebSocket is not open.");
      }
      chatSocket.send(JSON.stringify(messageData));
    } catch (error) {
      const urls = "http://127.0.0.1:8000/chat/tokens/";
      axios
        .get(urls)
        .then((response) => {
          let data = response.data;
          data
            .filter((user) => user.user === authUserId)
            .map((user) => {
              if (user.key !== Parameters.token) console.log("Смена токена");
              localStorage.setItem("token", user.key);
              Parameters.token = user.key;
              window.location.reload();
            });
        })
        .catch((err) => {
          console.error(
            "Error fetching token:",
            err.response?.data || err.message
          );
        });
    }
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
            const formData = new FormData();
            formData.append("image", img);

            const url = "http://127.0.0.1:8000/chat/photo-upload/";
            const response = await axios.post(url, formData, {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            });

            return response.data.id;
          });
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
          request_id: Parameters.request_id,
        };
        checkAnonimusUser(messageData);
      } else if (sendDocument) {
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
              const formData = new FormData();
              formData.append("document", documents);
              const url = "http://127.0.0.1:8000/chat/documents-upload/";
              const response = await axios.post(url, formData, {
                headers: {
                  "Content-Type": "multipart/form-data",
                },
              });
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
          request_id: Parameters.request_id,
        };
        checkAnonimusUser(messageData);
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
          request_id: Parameters.request_id,
          reply_to: replyMessage ? replyMessage : null,
        };

        checkAnonimusUser(messageData);
      }
      addRoomList(dispatch);
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
        console.log("Error data:", error.response.data);
        console.log("Error status:", error.response.status);
        console.log("Error headers:", error.response.headers);
      } else {
        console.log("Error message:", error.message);
      }
    } finally {
      setIsSending(false);
      await ReadMessageAll(otherUserId);
    }
  }

  const modalPh = (photoData) => {
    setCurrentPhotoId(photoData.id);
    // console.log(photoData);
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
    try {
      const newReaction = await createReaction(
        authenticatedUser,
        selectReactionEmoji
      );
      if (newReaction) {
        setReactionEmoji(newReaction);
        await sendReaction(focusMessage, newReaction.id);
        showEmojiWindows();
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

  async function sendForwardMessage() {
    try {
      if (!isSelectRoomSendForward) return null;
      // console.log(isSelectRoomSendForward)
      for (const selectRoom of isSelectRoomSendForward) {
        const forwardedIds = await sendForward(
          selectedMessage,
          authUserId,
          selectRoom
        );

        await createNewMessageForward(
          selectRoom,
          authUserId,
          forwardedIds,
          message
        );
      }
      setIsSelectedMessage(false);
      setSelectedMessage("");
      setSelectRoomSendForward("");
      setOpenModalForward(false);
      setMessage("");
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

  const handleCheckboxChangeMessage = (id) => {
    setSelectedMessage((prevSelectedUsers) => {
      if (!Array.isArray(prevSelectedUsers)) {
        // console.error("prevSelectedUsers is not an array:", prevSelectedUsers);
        return [{ id }];
      }

      if (prevSelectedUsers.some((msg) => msg.id === id)) {
        return prevSelectedUsers.filter((msg) => msg.id !== id);
      } else {
        return [...prevSelectedUsers, { id }];
      }
    });
  };
  const ForwardMessageMenu = () => {
    return (
      <div className={styles.forwardMenuWrap}>
        <button
          className={styles.forwardButton}
          onClick={() => {
            // console.log(authUserId)
            if (selectedMessage.length === 0) return null;
            setOpenModalForward(true);
          }}
        >
          Переслать
        </button>
        <button
          className={styles.forwardButton}
          onClick={() => {
            setIsSelectedMessage(false);
            setSelectedMessage("");
          }}
        >
          Отмена
        </button>
      </div>
    );
  };

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
    const userNameMesage =
      msg.user.username.charAt(0).toUpperCase() + msg.user.username.slice(1);
    return (
      <div>
        {isNewDay && <p className={styles.dataTimeMessage}>{messageDate}</p>}
        <Message
          messageId={() => {
            console.log(msg);
          }}
          username={isAuthored ? null : userNameMesage}
          sent={isAuthored}
          text={msg.text}
          time={messageTime}
          photos={msg.images.map((image) => image.image)}
          documents={msg.documents}
          avatar={msg.user.photo}
          modalPhoto={modalPh}
          photoData={photoData}
          setMenu={() => setMenu(msg.id)}
          isShowMenu={messageMenu}
          hiddenMenu={hideMenu}
          replyMessage={() => repMessage(msg)}
          reply={msg}
          forwardMessage={msg}
          setEmojiWindow={showEmojiWindows}
          emojiWindow={emojiWindow}
          reactions={msg}
          onEmojiSelect={handleEmojiSelect}
          authUsers={authUser}
          isRead={msg.is_read}
          onDestroyReaction={deleteReaction}
          onSelectMessage={() => {
            setIsSelectedMessage(!isSelectedMessage);
          }}
        />
      </div>
    );
  };

  const filteredMessages = messages.filter(
    (msg) => msg.room && msg.room.id === parseInt(id)
  );
  const titleName = roomList ? <GroupProfile room={roomList} /> : "";
  const forwardTitle = isSelectedMessage ? <ForwardMessageMenu /> : "";
  return (
    <>
      <ModalSendMessage
        title="Отправить сообщение "
        onCancel={handleCancelModal}
        onSubmit={sendMess}
        inputPrewiew={inputPrew.preview}
        input={handlerInputTextChange(setMessage)}
        inputValue={message}
        keyDownSend={keyDownEvent}
        isOpen={modal}
        openEmoji={() => {
          setModelEmoji(!isOpenModelEmoji);
        }}
        isOpenEmoji={isOpenModelEmoji}
        progressBar={progressBar}
        removeElement={removeElementModal}
      />
      <ModalForwardMessage
        isOpen={isOpenModalForward}
        openEmoji={() => {
          setModelEmoji(!isOpenModelEmoji);
        }}
        isOpenEmoji={isOpenModelEmoji}
        setMessage={setMessage}
        input={handlerInputTextChange(setMessage)}
        keyDownSend={keyDownEvent}
        onCancel={handleCancelModal}
        onSubmit={sendForwardMessage}
        roomList={
          <GroupRoomList
            authUser={Parameters.authUser}
            roomList={roomListForwardModal}
            userLogo={userLogo}
            selectedRooms={isSelectRoomSendForward}
            setSelectRoomSendForwad={setSelectRoomSendForward}
          />
        }
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
        onCancel={handleCancelModal}
        nextPhoto={nextImg}
        prevPhoto={prevImg}
      />

      <ChatArea
        title={forwardTitle ? forwardTitle : titleName}
        inputValue={message}
        input={handlerInputTextChange(setMessage)}
        documents={handlerInputDocuments(
          setModel,
          setSendDocument,
          setSelectTypeFile,
          setInputPrew
        )}
        images={handlerInputImages(
          setModel,
          setSendImage,
          setSelectTypeFile,
          setInputPrew,
          inputPrew
        )}
        sendmessage={sendMess}
        openEmoji={() => {
          setEmoji(!isOpenEmoji);
        }}
        isOpenEmoji={isOpenEmoji}
        setMessage={setMessage}
        keyDownSend={keyDownEvent}
        selectTypeFile={selectTypeFile}
        replyMessage={replyMessagePrew}
        closeReplyMenu={closeReply}
        setSelect={selectTypeSendFile}
        content={
          <>
            {isLoading && filteredMessages.length === 0 ? (
              <NoMessages text={"Сообщений пока нет"} />
            ) : filteredMessages.length === 0 && isLoading ? (
              <Loader
                custom
                widthLoader={"70px"}
                heightLoader={"70px"}
                borderLoader={"10px solid #f3f3f3"}
                borderTopLoader={"10px solid  #3498db"}
              />
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
                  <label key={index} className={styles.selectedMessageWrap}>
                    <MessageGroup
                      key={index}
                      msg={msg}
                      previousDate={previousDate}
                      photoData={photoData}
                      isNewDay={isNewDay}
                      authenticatedUser={authenticatedUser}
                      otherUserAvatar={otherUserAvatar}
                      localUser={Parameters.authUser}
                    />
                    <input
                      onClick={(e) => {
                        if (!isSelectedMessage) e.preventDefault();
                      }}
                      type="checkbox"
                      onChange={() => handleCheckboxChangeMessage(msg.id)}
                      className={styles.checkboxMessage}
                      id={msg.id}
                      style={
                        isSelectedMessage
                          ? { display: "block" }
                          : { display: "none" }
                      }
                    />
                  </label>
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
