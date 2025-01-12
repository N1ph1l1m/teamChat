import { Parameters } from "../../App/Parameters/Parametrs";
import axios from "axios";

export function logout(history) {
  var token = localStorage.getItem("token");
  if (!token) {
    console.log("No token found. User might not be logged in.");
    return;
  }

  var url = `${Parameters.url}auth/token/logout/`;

  axios
    .post(
      url,
      {},
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    )
    .then((response) => {
      if (response.status === 204) {
        console.log("Logout successful!");
      } else {
        console.log("Logout failed.");
      }
    })
    .catch((err) => {
      console.log("An error occurred: " + err.message);
      console.log(err);
    })
    .finally(() => {
      localStorage.removeItem("login");
      localStorage.removeItem("username");
      localStorage.removeItem("token");
      localStorage.removeItem("id");
      localStorage.removeItem("last_active");

      history("/login");
    });
}
