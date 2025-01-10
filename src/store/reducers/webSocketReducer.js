const defaultState = {
    isOpenSocket: false,
  };

  export function webSocketReducer(state = defaultState, action) {
    switch (action.type) {
    case "OPEN_WEBSOCKET":
        return { ...state, isOpenSocket:true};

    case "CLOSE_WEBSOCKET":
            return { ...state, isOpenSocket: false};

      default:
        return state;
    }
  }
