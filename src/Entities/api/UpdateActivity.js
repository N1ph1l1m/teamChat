import axios from "axios";
import { Data } from "emoji-mart";

export default function UpdateActivity(id){

    const dataNow = new Date();
    const updateActivity = {
        id : id,
        last_active:  dataNow
    }
try{
  const url = `http://127.0.0.1:8000/users/activity/${id}/`;
  const response  =  axios.put(url,updateActivity)
  if(response.status === 201 || response.status === 200){
  }
}catch(error){
    if (error.response) {
        console.error("Ошибка сервера:", error.response.data);
      } else if (error.request) {
        console.error("Ошибка сети. Сервер не отвечает:", error.request);
      } else {
        console.error("Неизвестная ошибка:", error.message);
      }
}
}
