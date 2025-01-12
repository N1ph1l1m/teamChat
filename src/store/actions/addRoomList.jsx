import { getDataRedux } from "../../Entities/api/GetServerData";

export const addRoomList = async (dispatch) => {
  try {
    const data = await getDataRedux("chat/rooms");
    dispatch({ type: "ADD_ROOMLIST", payload: data });
  } catch (error) {
    console.log(error);
  }
};
