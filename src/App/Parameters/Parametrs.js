export const Parameters = {
  authUser: localStorage.getItem("username"),
  authUserId: parseInt(localStorage.getItem("id")),
  token: localStorage.getItem("token"),
  request_id: 1,
  url: "http://127.0.0.1:8000/",
  url2: "http://127.0.0.1:8000",
  urlWebSocket: "ws://localhost:8000/ws/",
};
