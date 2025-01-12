import axios from "axios";
import { Parameters } from "../../App/Parameters/Parametrs";
export async function getRoomData(setRoomList, authUsr, setAuthUserId, id) {
  try {
    let authenticatedUser = authUsr;
    const data = await axios.get(`${Parameters.url}chat/rooms/${id}/`);
    if (data) {
      setRoomList(data.data);

      data.data.current_users.map((user) => {
        if (user.username === authenticatedUser) {
          setAuthUserId(user.id);
        } else {
          return null;
        }
      });
      return data;
    }
  } catch (error) {
    console.error(error);
  }
}
