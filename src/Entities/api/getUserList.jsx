import axios from "axios";

// export function getData(url, setData) {
//   let urls = "http://127.0.0.1:8000/" + url;
//   axios
//     .get(urls)
//     .then((response) => {
//       if (response.status === 200) {
//         setData(response.data);
//         // console.log(response.data);
//       } else {
//         console.log("Error: " + response.data.detail);
//       }
//     })
//     .catch((error) => {
//       console.error("Error fetching data:", error);
//     });
// }

export async function getData(url, setData) {
  let urls = "http://127.0.0.1:8000/" + url;
  const data = await axios.get(urls);
  if (data) {
    setData(data.data);
  } else {
    console.log("Error: " + data.detail);
  }
}
