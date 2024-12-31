import { createStore, combineReducers, applyMiddleware } from "redux";
import { reducerCash } from "./reducers/cashReducer";
import { roomListReducer } from "./reducers/roomListReducer";
import { thunk } from "redux-thunk";
import { composeWithDevTools } from "@redux-devtools/extension";

const rootReducer = combineReducers({
  cash: reducerCash,
  roomList: roomListReducer,
});
export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);
