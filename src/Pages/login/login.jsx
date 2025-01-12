import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../Shared/button/button";
import Input from "../../Shared/input/input";
import styles from "../../App/Styles/login.module.css";
import { LoginSubmit } from "../../Entities/api/LoginSubmit";
import { useDispatch } from "react-redux";
import { addRoomList } from "../../store/actions/addRoomList";
import { loadUserData } from "../../Entities/api/GetServerData";
function Login(props) {
  const [username, setusername] = useState("");
  const [password, setpassword1] = useState("");
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");
  const history = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(function () {
      setMsg("");
    }, 15000);
  }, [msg]);

  async function NextPage(response) {
    var token = response.data.auth_token;
    setMsg("Авторизация успешна!");
    localStorage.setItem("login", true);
    localStorage.setItem("username", username);
    localStorage.setItem("token", token);
    await loadUserData();
    history("/");
    console.log("dis log");
    await addRoomList(dispatch);
    window.location.reload();
  }

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

  const keyDown = (e) => {
    if (e.code === "Enter" && !e.shiftKey) {
      e.preventDefault();
      LoginSubmit(
        username,
        password,
        NextPage,
        setError,
        setusername,
        setpassword1
      );
    }
  };

  return (
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
          <Button
            type="submit"
            className={styles.newSize}
            onClick={() => {
              LoginSubmit(
                username,
                password,
                NextPage,
                setError,
                setusername,
                setpassword1
              );
            }}
          >
            Login
          </Button>
        </div>
      </div>
    </div>
  );
}
export default Login;
