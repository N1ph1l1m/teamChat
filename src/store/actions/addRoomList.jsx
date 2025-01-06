import { getDataTest } from "../../Entities/api/getUserList";

export const addRoomList = async (dispatch) => {
  try {
    console.log("dispatch");
    const data = await getDataTest("chat/rooms");
    dispatch({ type: "ADD_ROOMLIST", payload: data });
  } catch (error) {
    console.log(error);
  }
};
