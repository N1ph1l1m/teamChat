import axios from 'axios';


 function CreateRoom(username) {
    let token  = localStorage.getItem('token');
    localStorage.setItem('roomName', username)
    let urls = `http://127.0.0.1:8000/chat/room/`
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
export default  CreateRoom
