import { useEffect } from "react"
import {useState} from "react"
import { Navigate } from "react-router-dom"

const withAuthentication = (wrappedComponents ) =>{
    return function AuthComponents(props){
        const [isAuthetication, setIsAuthetication] = useState(false)

        useEffect(()=>
        {
         const token = localStorage.getItem('token');
         console.log(token)
         if(token){
            setIsAuthetication(true);

         }else{
            setIsAuthetication(false);
         }
        },[]);
        if(isAuthetication){
           return <wrappedComponents {...props}/>
        }else{
            console.log(localStorage.getItem('token'))
            return <Navigate to='login/'/>
        }
    }
}
export default withAuthentication
