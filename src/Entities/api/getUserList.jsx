import axios from "axios";

export async function getData(url, setData) {
  let urls = "http://127.0.0.1:8000/" + url;
  const data = await axios.get(urls);
  if (data) {
    setData(data.data);
  } else {
    console.log("Error: " + data.detail);
  }
}
