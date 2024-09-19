import axios from 'axios';

export function createRoom(username) {
    let token  = localStorage.getItem('token')
    let urls = `http://127.0.0.1:8000/chat/room/`
    axios.post(urls,
        { name: username,
        current_users: [username]},
        {
            headers: {
                'Authorization': ` token ${token}`, // Передаем токен в заголовке
                'Content-Type': 'application/json'
            }
        }
    )
        .then((response) => {
            if (response.status === 200) {
                console.log("Room is created");
                console.log("Error: " + response.data);

            } else {
                console.log("Error: " + response.data.detail);
            }
        })
        .catch((error) => {
            console.error("Error fetching data:", error);
            console.log("username " + username);

        });

}


// var url = "http://127.0.0.1:8000/auth/token/login/";

// axios.post(url, data)
//     .then((response) => {
//         if (response.status === 200) {
//             var token = response.data.auth_token;  // Получаем токен из ответа
//             setMsg("Login successful!");

//             // Сохраняем токен и имя пользователя в localStorage
//             localStorage.setItem("login", true);
//             localStorage.setItem('username', username);
//             localStorage.setItem('token', token);  // Сохраняем токен

//             // Перенаправление на страницу задач
//             setTimeout(() => {
//                 history("/");
//             }, 1000);
//         } else {
//             setError("Login failed: " + response.data.detail);
//         }
//     })
//     .catch((err) => {
//         if (err.response && err.response.status === 400) {
//             setError("Bad Request: " + err.response.data.detail);
//         } else {
//             setError("An error occurred: " + err.message);
//         }
//         console.log(err);
//     });
