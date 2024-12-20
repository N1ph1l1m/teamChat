
const defaultState = {
    roomList:[],
  };

export const roomListReducer = (state = defaultState , action)=>{
    switch(action.type){
      case "ADD_ROOMLIST":
        return {...state, roomList:action.payload}


    //   case "GET_ROOMLIST":
    //     return {...state, roomList:state.roomList}

      default:
        return state
    }
  }
