import { configureStore } from "@reduxjs/toolkit";
import { reducerCash } from "./reducers/cashReducer";
import { roomListReducer } from "./reducers/roomListReducer";
import { webSocketReducer } from "./reducers/webSocketReducer";
import { thunk } from "redux-thunk";
import { composeWithDevTools } from "@redux-devtools/extension";

export const store = configureStore({
  reducer: {
    cash: reducerCash,
    roomList: roomListReducer,
    isOpenSocket: webSocketReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
  devTools: composeWithDevTools(),
});
