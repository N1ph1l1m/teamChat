import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDataTest } from "../../../Entities/api/getUserList";

export const  addRoomList =  async(dispatch) => {
    try{
        const data = await getDataTest("chat/rooms");
        dispatch({type:"ADD_ROOMLIST",payload:data});

    }catch(error){
        console.log(error);
    }
}

export default function Recipe(){
    const dispatch = useDispatch()
    const cash = useSelector(state => state.cash.cash )
    const roomList  = useSelector(state=>state.roomList.roomList)
    console.log(cash)





    const addCash = () =>{
        dispatch({type:"ADD_CASH",payload:5})
    }
    const getCash = () => {
        dispatch({type:"GET_CASH",payload:1})
    }



return (<div style={{display:"flex"}}>
        <button onClick={ ()=>addCash()}style={{marginRight:"20px"}}>Пополнить счет</button>
        <h2>{cash}</h2>
        <button onClick={ ()=>getCash()}  style={{marginLeft:"20px"}} >Снять со счета</button>
        <button onClick={ ()=> addRoomList(dispatch)}  style={{marginLeft:"20px"}} >Получить комнаты</button>
        {/* <p>{roomList}</p> */}
        <pre>{JSON.stringify(roomList, null, 2)}</pre>

</div>)
}
