

function joinroom() {
    const room_pk = 1;
    const request_id = new Date().getTime();

    if (!room_pk) {
        console.error("room_pk не определен");
        return;
    }

    const chatSocket = new WebSocket(`ws://127.0.0.1:8000/ws/chat/${room_pk}/?token=${localStorage.getItem('token')}`);

    chatSocket.onopen = function () {
        console.log('WebSocket Open');
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

    chatSocket.onclose = function() {
        console.log('WebSocket connection closed');
    };

};
export default joinroom
