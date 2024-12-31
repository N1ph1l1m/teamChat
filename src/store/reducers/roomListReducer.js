const defaultState = {
  roomList: [],
};

export function roomListReducer(state = defaultState, action) {
  switch (action.type) {
    case "ADD_ROOMLIST":
      return { ...state, roomList: action.payload };

    default:
      return state;
  }
}
