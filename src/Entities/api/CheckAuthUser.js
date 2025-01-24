import axios from "axios";
import { Parameters } from "../../App/Parameters/Parametrs";

async function newToken(username){
    const user = {username};
  const url = `${Parameters.url}chat/create-token/`;
    const response =  await axios.post(url,user);
    if(response.status === 201 || response.status === 200){
        localStorage.setItem("token", response.data.key);
        Parameters.token = response.data.key;
        window.location.reload();
    }else{
        console.error(response.status)
    }

}
export async function CheckAuthUser(id){
try{
    const getTokens = `${Parameters.url}chat/tokens/`;
    const response  = await axios.get(getTokens);
    let  dataTokens = response.data
    let filterToken =  dataTokens.filter((user) => user.user == id)

    if(dataTokens.length === 0 ){
      newToken(Parameters.authUser)
    }else if(filterToken.length === 0){
      newToken(Parameters.authUser)
    }else if(filterToken.length  !== 0 && filterToken.key  !== Parameters.token){
        newToken(Parameters.authUser)
    }else{
          console.error('Error')
    }

}catch(error){
    console.error(error)
}
}
