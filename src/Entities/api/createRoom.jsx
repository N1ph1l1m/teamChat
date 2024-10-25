import React,  { useState } from 'react';
import axios from 'axios';


 function CreateRoom(username) {
    let token  = localStorage.getItem('token');
    localStorage.setItem('roomName', username)
    let urls = `http://127.0.0.1:8000/chat/roomg/`
    axios.post(urls,
        {
            name:  username,
            current_users: [username]},
        {
            headers: {
                'Authorization': ` token ${token}`,
                'Content-Type': 'application/json'
            }
        }
    )
        .then((response) => {
            if (response.status === 200 || response.status === 201 ) {
                console.log("Error: " + response.data);
                localStorage.setItem('requestApi', JSON.stringify(response.data));

            } else {
                console.log("Error: " + response.data.detail);
            }
        })
        .catch((error) => {
            console.error("Error fetching data:", error);
            console.log("username " + username);

        });

}

// function CreateRoom(username) {
//     let token  = localStorage.getItem('token')
//     let urls = `http://127.0.0.1:8000/chat/room/`
//     axios.post(urls,
//         { name: username,
//         current_users: [username]},
//         {
//             headers: {
//                 'Authorization': ` token ${token}`, // Передаем токен в заголовке
//                 'Content-Type': 'application/json'
//             }
//         }
//     )
//         .then((response) => {
//             if (response.status === 200) {
//                 console.log("Room is created");
//                 console.log("Error: " + response.data);

//             } else {
//                 console.log("Error: " + response.data.detail);
//             }
//         })
//         .catch((error) => {
//             console.error("Error fetching data:", error);
//             console.log("username " + username);

//         });

// }



// function CreateRoom(username,setRoomName,setCurrentUser,setRoomData) {
//     let token  = localStorage.getItem('token');

//     let urls = `http://127.0.0.1:8000/chat/room/`
//     axios.post(urls,
//         {
//             name: setRoomName(username),
//             current_users: setCurrentUser(username)
//         },
//         {
//             headers: {
//                 'Authorization': ` token ${token}`, // Передаем токен в заголовке
//                 'Content-Type': 'application/json'
//             }
//         }
//     )
//         .then((response) => {
//             if (response.status === 200) {
//                 console.log("Error: " + response.data);
//                 setRoomData(response.data)

//             } else {
//                 console.log("Error: " + response.data.detail);
//             }
//         })
//         .catch((error) => {
//             console.error("Error fetching data:", error);
//             console.log("username " + username);

//         });

// }
export default  CreateRoom

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
