import axios from "axios";
import { addRoomList } from "../../store/actions/addRoomList";
import { Parameters } from "../../App/Parameters/Parametrs";
import UpdateActivity from "./UpdateActivity";

export async function getData(url, setData) {
  let urls = Parameters.url + url;
  const data = await axios.get(urls);
  if (data) {
    setData(data.data);
  } else {
    console.log("Error: " + data.detail);
  }
}

export async function loadUserData() {
  let urls = `${Parameters.url}users/`;
  const data = await axios.get(urls);
  if (data) {
    let user = localStorage.getItem("username");
    let userData = await data.data.find(
      (authUser) => authUser.username === user
    );
    let userId = userData.id;
    localStorage.setItem("id", userId);
    let newActiveDate = new Date();
    localStorage.setItem("last_active", newActiveDate);
    UpdateActivity(userData.id);
  } else {
    console.log("Error: " + data.detail);
  }
}

export async function getDataRedux(url) {
  let urls = Parameters.url + url;
  try {
    const response = await axios.get(urls);
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function fetchData(setAuthUser) {
  try {
    return await getData("users/", setAuthUser);
  } catch (error) {
    console.error(error);
  }
}

export async function userAuthId(userlist) {
  if (!userlist) return;
  try {
    if (!localStorage.getItem("id")) {
      let user = Parameters.authUser;
      let userData = userlist.find((authUser) => authUser.username === user);
      localStorage.setItem("id", userData.id);
    }
  } catch (error) {
    console.log(error);
  }
}

export async function fetchDataRoomList(setRoomListForwardModal) {
  try {
    const data = await getData("chat/rooms", setRoomListForwardModal);
    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function showMessageAvatar(
  roomList,
  autUsr,
  setOtherUserId,
  setOtherUserAvatar
) {
  if (roomList.data) {
    const otherUser = roomList.data.current_users.find(
      (user) => user.username !== autUsr
    );
    setOtherUserId(otherUser.id);
    if (otherUser) setOtherUserAvatar(otherUser.photo);
  } else {
    console.error("roomList или current_users отсутствуют или пусты");
  }
}

export async function getMessageData(setMessages) {
  return await getData(`chat/room/message/`, setMessages);
}

export function GlobalWebSocket(token, dispatch) {
  const socketUrl = `${Parameters.urlWebSocket}chat/?token=${token}`;
  let socket = new WebSocket(socketUrl);

  socket.onopen = () => {
    dispatch({ type: "OPEN_WEBSOCKET" });
    socket.send(
      JSON.stringify({
        action: "subscribe_to_global_notifications",
        request_id: 1,
      })
    );
  };

  socket.onclose = function (event) {
    dispatch({ type: "CLOSE_WEBSOCKET" });
  };

  socket.onmessage = (event) => {
    addRoomList(dispatch);
  };
  return socket;
}

export function webSocket(
  ROOM_PK,
  TOKEN,
  reconnectInterval,
  setIsWebSocketOpen,
  REQUEST_ID,
  setMessages,
  setChatSocket
) {
  // console.log("websocket");
  const socketUrl = `${Parameters.urlWebSocket}chat/${ROOM_PK}/?token=${TOKEN}`;
  let socket = new WebSocket(socketUrl);
  socket.onopen = function () {
    console.log("WebSocket открыт");
    reconnectInterval = 1000;
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
          getMessageData(setMessages);
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
                      reaction.id_user.photo = `${Parameters.url2}${reaction.id_user.photo}`;
                    }
                    return reaction;
                  }
                );
              }
              if (updatedMessage.images) {
                updatedMessage.images = updatedMessage.images.map((image) => {
                  if (image.image && !image.image.startsWith("http")) {
                    image.image = `${Parameters.url2}{image.image}`;
                  }
                  return image;
                });
              }
              if (updatedMessage.reply_to) {
                if (updatedMessage.reply_to.images) {
                  updatedMessage.reply_to.images =
                    updatedMessage.reply_to.images.map((image) => {
                      if (image.image && !image.image.startsWith("http")) {
                        image.image = `${Parameters.url2}${image.image}`;
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
                      image.original_message.user.photo = `${Parameters.url2}${image.original_message.user.photo}`;
                    }

                    image.original_message.images.map((img) => {
                      if (img.image && !img.image.startsWith("http")) {
                      img.image = `${Parameters.url2}${img.image}`;
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
