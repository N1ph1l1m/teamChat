import axios from "axios";

export default  async function UpdateActivity(id){

    const dataNow = new Date();
    const updateActivity = {
        id : id,
        last_active:  dataNow
    }
try{
  console.log("Update");
  const url = `http://127.0.0.1:8000/users/activity/${id}/`;
  const response  =   await axios.put(url,updateActivity)
  if (response.status === 200 || response.status === 201) {
    console.log("Response data:", response.data);
    localStorage.setItem("last_active", dataNow); // Корректное использование localStorage
  } else {
    console.error("Unexpected response status:", response.status);
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
