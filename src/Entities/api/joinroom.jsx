function joinRoom(pk) {
  const room_pk = pk;
  const request_id = 1;
  const token = localStorage.getItem("token").trim();
  const chatSocket = new WebSocket(
    `ws://localhost:8000/ws/chat/${room_pk}/?token=${token}`
  );

  chatSocket.onopen = function (room) {
    console.log("WebSocket Open");
    chatSocket.send(
      JSON.stringify({
        pk: room_pk,
        action: "join_room",
        request_id: request_id,
      })
    );

    chatSocket.send(
      JSON.stringify({
          pk: room_pk,
          action: "retrieve",
          request_id: request_id,
      })
    );

    chatSocket.send(
      JSON.stringify({
          pk: room_pk,
          action: "subscribe_to_messages_in_room",
          request_id: request_id,
      })
  );
  chatSocket.send(
      JSON.stringify({
          pk: room_pk,
          action: "subscribe_instance",
          request_id: request_id,
      })
  );


  };

  chatSocket.onerror = function (error) {
    console.error("WebSocket Error: ", error);
    console.log("WebSocket room " + room_pk);
  };

  chatSocket.onclose = function () {
    console.log("WebSocket connection closed");
  };
}

export default joinRoom;
