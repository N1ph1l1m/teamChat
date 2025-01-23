import axios from "axios";
import { Parameters } from "../../App/Parameters/Parametrs";

async function newToken(username){
    const user = {username};
    console.log(user);

  const url = `${Parameters.url}chat/create-token/`;
    const response =  await axios.post(url,user);
    if(response.status === 201 || response.status === 200){
        console.log(response.data);
        localStorage.setItem("token", response.data.key);
        Parameters.token = response.data.key;
        window.location.reload();
    }else{
        console.error(response.status)
    }

}
export async function CheckAuthUser(id){
try{
    const urls = `${Parameters.url}chat/tokens/`;
      await axios
        .get(urls)
        .then((response) => {
          let data = response.data;
          if(data.length === 0 ){
            newToken(Parameters.authUser)
          }else if(data.length >0){
            data
            .filter((user) => user.user === id)
            .map((user) => {

                // if(user.key.length === 0){
                //     console.log("New token 2 ");
                //     newToken(Parameters.authUser)
                // }

              if (user.key !== Parameters.token) console.log("Смена токена");
              localStorage.setItem("token", user.key);
              Parameters.token = user.key;
              window.location.reload();
            });
          }else{
            console.error('error');
          }

        })
        .catch((err) => {
          console.error(
            "Error fetching token:",
            err.response?.data || err.message
          );
        });
}catch(error){
    console.error(error)
}
}
