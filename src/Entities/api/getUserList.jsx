import axios from 'axios';


    function getData(url, setData) {
        let urls = "http://127.0.0.1:8000/" + url
        axios.get(urls)
            .then((response) => {
                if (response.status === 200) {
                    setData(response.data);
                    console.log(response.data);
                } else {
                    console.log("Error: " + response.data.detail);
                }
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }

    function webList(sentdata) {
        let token = localStorage.getItem('token')
        const ws = new WebSocket(
             `ws://localhost:8000/ws/?token=${token}`
          );

        ws.onopen = function(e){
            console.log('WebSocket Open');
            ws.send(
                JSON.stringify({
                    action:"list",
                    request_id: new Date().getTime(),
                })
            );
        }

        ws.onmessage = function (e) {
            const response = JSON.parse(e.data);
            if (response && response.data) {
                sentdata(response.data); // Set the array from `data` field
            }
        };

        ws.onerror = function(error) {
            console.error('WebSocket Error: ', error);
        };

        // Обработчик закрытия соединения
        ws.onclose = function() {
            sentdata("")
            console.log('WebSocket connection closed');
        };
    };


export default webList
