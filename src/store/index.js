
import {createStore , combineReducers, applyMiddleware} from "redux"
import { reducerCash } from "./cashReducer"
import { roomListReducer } from "./custoremReducer"
import {thunk} from 'redux-thunk'
import { composeWithDevTools } from '@redux-devtools/extension';

const rootReducer  = combineReducers({
    cash: reducerCash,
    roomList: roomListReducer,

})
export  const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)), )
