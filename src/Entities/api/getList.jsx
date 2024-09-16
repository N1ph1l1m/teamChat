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


export default getData