import { getDataTest } from "../../Entities/api/getUserList";

export const addRoomList = async (dispatch) => {
  try {
    const data = await getDataTest("chat/rooms");
    dispatch({ type: "ADD_ROOMLIST", payload: data });
  } catch (error) {
    console.log(error);
  }
};
