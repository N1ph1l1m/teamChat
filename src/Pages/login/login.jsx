import React, { useEffect, useState } from "react";
import {useNavigate} from 'react-router-dom';
import Button from '../../Shared/button/button'
import Input from '../../Shared/input/input'
import axios from 'axios';
import styles  from "../../App/Styles/login.module.css"
function Login(props){

    const [username, setusername] = useState("");
    const [password, setpassword1] = useState("");
    const [error, setError] = useState("");
    const [msg, setMsg] = useState("");
    const history = useNavigate();

    useEffect(() => {
      setTimeout(function () {
        setMsg("");
      }, 15000);
    }, [msg]);

    const handleInputChange = (e, type) => {
        switch (type) {
          case "username":
            setError("");
            setusername(e.target.value);
            if (e.target.value === "") {
              setError("Логин не может быть пустым");
            }
            break;
          case "password":
            setpassword1("");
            setpassword1(e.target.value);
            if (e.target.value === "") {
              setError("Пароль не может быть пустым");
            }
            break;
          default:
        }
      };


    function loginSubmit() {
      if (username !== "" && password !== "") {
          var data = {
              username: username,
              password: password,
          };

          var url = "http://127.0.0.1:8000/auth/token/login/";

          axios.post(url, data)
              .then((response) => {
                  if (response.status === 200) {
                      var token = response.data.auth_token;
                      var id = response.data.id;
                      console.log(response)

                      setMsg("Авторизация успешна!");

                      localStorage.setItem("login", true);
                      localStorage.setItem('username', username);
                      localStorage.setItem('id', id);
                      localStorage.setItem('token', token);

                      setTimeout(() => {
                          history("/");
                      }, 1000);
                  } else {
                      setError("Login failed: " + response.data.detail);
                      console.log("Login failed: " + response.data.detail)
                  }
              })
              .catch((err) => {
                  if (err.response && err.response.status === 400) {
                      setError("Неверный логин или пароль");
                      console.log( err.response.data.detail)
                  } else {
                      setError("Произошла ошибка: " + err.message);
                  }
                  console.log(err);
              });
          setusername("");
          setpassword1("");
      } else {
          setError("Все поля обязательны для заполнения!");
      }
  }

  const keyDown = (e) =>{
    if (e.code === "Enter" && !e.shiftKey) {
      e.preventDefault();
      loginSubmit();
    }
  }

    return(
        <div className={styles.wrapContainer}>
          <div className={styles.itemContainer}>
          <h1 className={styles.titleReg}>Login</h1>
          <div className={styles.authStatus}>
            {msg !== "" ? (
              <span className={styles.success}>{msg}</span>
            ) : (
              <span className={styles.error}>{error}</span>
            )}
          </div>
            <div className={styles.wrapInput}>
            <Input
            className={styles.inputNewSize}
            type="text"
            id="username"
            placeholder="Login"
            value={username}
            onChange={(e) => handleInputChange(e, "username")}
          />
          <Input
           className={styles.inputNewSize}
            type="password"
            id="password"
            placeholder="Password"
            value={password}
            onKeyDownCapture={keyDown}
            onChange={(e) => handleInputChange(e, "password")}
          />
             <Button type="submit"
            className={styles.newSize}
            onClick={loginSubmit}>
            Login
          </Button>
            </div>



        </div>
        </div>
    )
}
export default Login;
