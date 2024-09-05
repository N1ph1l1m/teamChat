import React from "react";
import Icon from "../icon/icon";
import { BsFillBellFill } from "react-icons/bs";
import { FaRegUserCircle } from "react-icons/fa";
import '../../App/Styles/navItem.scss';
import {useNavigate} from 'react-router-dom';
import axios from "axios";
function UserItem(props) {
  const history = useNavigate();


  function logOut() {


    // Получаем токен из localStorage
    var token = localStorage.getItem('token');
    if (!token) {
        console.log("No token found. User might not be logged in.");
        return;
    }

    var url = "http://127.0.0.1:8000/auth/token/logout/";

    axios.post(url, {}, {
        headers: {
            'Authorization': `Token ${token}`
        }
    })
    .then((response) => {
        if (response.status === 204) {  // 204 No Content indicates successful logout
            // Очистка локального хранилища
            localStorage.removeItem("login");
            localStorage.removeItem("username");
            localStorage.removeItem("token");

            console.log("Logout successful!");
            // Перенаправление на страницу входа
            history("/login");
        } else {
            console.log("Logout failed.");
        }
    })
    .catch((err) => {
        console.log("An error occurred: " + err.message);
        console.log(err);
    });
  }

  return (
    <div className="wrap">
      <div className="menuWrap">
        <div className="iconText">
          <Icon>
            <FaRegUserCircle color="white" size="20" />
          </Icon>
          <p className="tittle">{props.tittle}</p>
        </div>

        <div className="bell">
          <Icon onClick={logOut}>
            <BsFillBellFill color="white" size="20" />
          </Icon>
        </div>
      </div>
    </div>
  );
}

export default UserItem;
