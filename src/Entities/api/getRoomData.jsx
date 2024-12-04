import React from "react";
import axios from "axios";

export async function getRoomData( setRoomList, authUsr, setAuthUserId,id) {
    try {
        let authenticatedUser = authUsr
      // console.log("getRoomData");
      const data = await axios.get(`http://127.0.0.1:8000/chat/rooms/${id}/`);
      if (data) {
        setRoomList(data.data);

        data.data.current_users.map((user)=>{
          if(user.username === authenticatedUser){
         setAuthUserId(user.id)
          }else{
            return null;
          }
        })
        // console.log("setRoomList");
        return data;
      }
    } catch (error) {
      console.error(error);
    }
  }
