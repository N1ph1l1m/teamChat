import { Parameters } from "../../App/Parameters/Parametrs";
import axios from "axios";

export function LoginSubmit(
  username,
  password,
  NextPage,
  setError,
  setusername,
  setpassword1
) {
  if (username !== "" && password !== "") {
    var data = {
      username: username,
      password: password,
    };

    var url = `${Parameters.url}auth/token/login/`;

    axios
      .post(url, data)
      .then((response) => {
        if (response.status === 200) {
          NextPage(response);
        } else {
          setError("Login failed: " + response.data.detail);
          console.log("Login failed: " + response.data.detail);
        }
      })
      .catch((err) => {
        if (err.response && err.response.status === 400) {
          setError("Неверный логин или пароль");
          console.log(err.response.data.detail);
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
