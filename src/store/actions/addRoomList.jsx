import { getDataRedux } from "../../Features/getServerData/getServerData";

export const addRoomList = async (dispatch) => {
  try {
    console.log("dispatch");
    const data = await getDataRedux("chat/rooms");
    dispatch({ type: "ADD_ROOMLIST", payload: data });
  } catch (error) {
    console.log(error);
  }
};
