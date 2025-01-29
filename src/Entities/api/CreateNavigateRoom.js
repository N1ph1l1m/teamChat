import axios from "axios";
import { Parameters } from "../../App/Parameters/Parametrs";
async function CreateRoom(username) {
  let token = localStorage.getItem("token");
  let urls = `${Parameters.url}chat/room/`;
  return axios
    .post(
      urls,
      {
        name: username,
        current_users: [username],
      },
      {
        headers: {
          Authorization: ` token ${token}`,
          "Content-Type": "application/json",
        },
      }
    )
    .then((response) => {
      if (response.status === 200 || response.status === 201) {
        let pkRoom = response.data.pk;
        return pkRoom;
      } else {
        console.log("Error: " + response.data.detail);
      }
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}

async function createNavigate(contact, navigate) {
  let navigateRoom = await CreateRoom(contact.username);
  navigate(`/chats/${navigateRoom}`);
}

export function linkToMessage(userlist, id, Parameters, roomList, navigate) {
  const contact = userlist.find((user) => user.id === id);

  const authUsr = userlist.find(
    (user) => user.username === Parameters.authUser
  );

  if (!contact) {
    console.error("User not found");
    return;
  }
  if (!authUsr) {
    console.error("Authorized user not found");
    return;
  }

  const filteredRooms = roomList.filter(
    (current) =>
      current.current_users.length === 2 &&
      current.current_users.some(
        (user) => user.username === contact.username
      ) &&
      current.current_users.some((user) => user.username === authUsr.username)
  );

  if (filteredRooms && filteredRooms.length === 0) {
    createNavigate(contact, navigate);
  }

  if (filteredRooms.length === 1) {
    navigate(`/chats/${filteredRooms[0].pk}`);
  }
}
