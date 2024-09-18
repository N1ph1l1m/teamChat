function joinRoom(pk) {
  const room_pk = pk; // Замените на реальный pk комнаты
  const request_id = 1;
  const token = localStorage.getItem("token").trim(); // Убедитесь, что токен без пробелов
  const chatSocket = new WebSocket(
    `ws://localhost:8000/ws/chat/${room_pk}/?token=${token}`
  );

  chatSocket.onopen = function () {
    console.log("WebSocket Open");
    // chatSocket.send(
    //   JSON.stringify({
    //     pk: room_pk,
    //     action: "join_room",
    //     request_id: request_id,
    //   })
    // );

    chatSocket.send(
      JSON.stringify({
        action: "create_room_if_not_exists",
        pk: room_pk,
        request_id: request_id,
        chat_room: room_pk,
      })
    );
  };

  chatSocket.onerror = function (error) {
    console.error("WebSocket Error: ", error);
    console.log(room_pk);
  };

  chatSocket.onclose = function () {
    console.log("WebSocket connection closed");
  };
}

export default joinRoom;
