import axios from "axios";

export async function getData(url, setData) {
  let urls = "http://127.0.0.1:8000/" + url;
  const data = await axios.get(urls);
  if (data) {
    setData(data.data);
  } else {
    console.log("Error: " + data.detail);
  }
}

export async function getDataTest(url) {
  let urls = "http://127.0.0.1:8000/" + url;

try{
  const response  = await axios.get(urls);
  return response.data;
}catch(error){
  console.log(error)
  return null
}
}


export async function getRoomLostWebSocket(
  TOKEN,
  REQUEST_ID,
  setIsWebSocketOpen,
  setRoomList,
  setChatSocket,
  getRoomList,
) {
  console.log("WebSocket соединение для списка комнат");

  const socket = new WebSocket(
    `ws://localhost:8000/ws/room-list/?token=${TOKEN}`
  );

  // Открытие WebSocket соединения
  socket.onopen = function () {
    console.log("WebSocket открыт");
    setIsWebSocketOpen(true);

    // Запрос полного списка
    socket.send(
      JSON.stringify({
        action: "list",
        request_id: REQUEST_ID,
      })
    );
  };

  // Обработка входящих сообщений
  socket.onmessage = async (e) => {
    const data = JSON.parse(e.data);

    switch (data.action) {
      case "create":

        setRoomList((prevMessages) => {
          const messageExists = prevMessages.some(
            (msg) => msg.id === data.data.id
          );
          getRoomList();
          if (!messageExists) {
            return [...prevMessages, data.data];
          }
          return prevMessages;
        });
        break;

      case "update":
        // Обновление существующих данных
        setRoomList((prevRooms) =>
          prevRooms.map((room) =>
            room.id === data.data.id ? { ...room, ...data.data } : room
          )
        );
        break;

      case "delete":
        // Удаление данных
        setRoomList((prevRooms) =>
          prevRooms.filter((room) => room.id !== data.data.id)
        );
        break;

      case "list":
        // Полный список данных
        setRoomList(data.data);
        break;

      default:
        console.log("Неизвестное действие:", data.action);
        break;
    }
  };

  // Обработка ошибок
  socket.onerror = (error) => {
    console.error("Ошибка WebSocket:", error);
  };

  // Закрытие WebSocket
  socket.onclose = () => {
    console.log("WebSocket закрыт");
    setIsWebSocketOpen(false);
  };

  // Сохранение WebSocket в состояние
  setChatSocket(socket);
}
