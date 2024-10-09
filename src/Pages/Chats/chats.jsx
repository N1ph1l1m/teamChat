import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ChatArea from "../../Widgets/chatArea/chatArea";
import Message from "../../Shared/Message/message";
import Icon from "../../Shared/icon/icon";
import { BiMessageAltX } from "react-icons/bi";
import { getData } from "../../Entities/api/getUserList";
import  styles from "../../App/Styles/chats.module.css"


function Chats() {
  const { id } = useParams();
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [image, setImage] = useState("");
  const [isWebSocketOpen, setIsWebSocketOpen] = useState(false);
  const [chatSocket, setChatSocket] = useState(null);
  const [roomList, setRoomList] = useState(null);

  const [otherUserAvatar, setOtherUserAvatar] = useState(null);
  const [authUser, setAuthUser] = useState([]);

  const autUsr = localStorage.getItem("username");

  useEffect(() => {
    async function getRoomData() {
      try {
        console.log("getRoomData");
        const data = await axios.get(`http://127.0.0.1:8000/chat/rooms/${id}/`);
        if (data) {
          setRoomList(data.data);
          console.log("setRoomList");
          return data;
        }
      } catch (error) {
        console.error(error);
      }
    }

    async function fetchData() {
      try {
        console.log("fentchData");
        const data = await getData("users/", setAuthUser);
        return data;
      } catch (error) {
        console.error(error);
      }
    }

    async function getMessageData() {
      console.log("Message");
      const data = await getData(`chat/room/message/`, setMessages);
      return data;
    }

    const room_pk = id;
    const request_id = 1;
    const token = localStorage.getItem("token").trim();

    function webSocket() {
      console.log("websocket");
      const socket = new WebSocket(
        `ws://localhost:8000/ws/chat/${room_pk}/?token=${token}`
      );
      socket.onopen = function () {
        console.log("WebSocket открыт");
        setIsWebSocketOpen(true);

        socket.send(
          JSON.stringify({
            pk: room_pk,
            action: "join_room",
            request_id: request_id,
          })
        );
        socket.send(
          JSON.stringify({
            pk: room_pk,
            action: "retrieve",
            request_id: request_id,
          })
        );
        socket.send(
          JSON.stringify({
            pk: room_pk,
            action: "subscribe_to_messages_in_room",
            request_id: request_id,
          })
        );
      };

      socket.onmessage = function (e) {
        const data = JSON.parse(e.data);
        switch (data.action) {
          case "create":
            setMessages((prevMessages) => {
              const messageExists = prevMessages.some(
                (msg) => msg.id === data.data.id
              );
              if (!messageExists) {
                return [...prevMessages, data.data];
              }
              return prevMessages;
            });
            break;
          default:
            break;
        }
      };

      setChatSocket(socket);
    }




    function showMessageAvatar(roomList) {
      console.log("avatar");
      if (roomList.data) {
        const otherUser = roomList.data.current_users.find(
          (user) => user.username !== autUsr
        );
        if (otherUser) setOtherUserAvatar(otherUser.photo);
      } else {
        console.error("roomList или current_users отсутствуют или пусты");
      }
    }

    async function go() {
      fetchData();
      const dataRoom = await getRoomData();
      webSocket();
      showMessageAvatar(dataRoom);
      await getMessageData();
    }
    go();
  }, [id]);


  useEffect(() => {

    console.log("Messages изменились:", messages);

//

  }, [messages]);

  const handleInputChange = (e) => {
    setMessage(e.target.value);
    console.log(message);
  };


  const sendMessage = () => {
    if (isWebSocketOpen && chatSocket) {
      const request_id = 1;
      chatSocket.send(
        JSON.stringify({
          message: message,
          action: "create_message",
          request_id: request_id,
        })
      );
      console.log(message);
      setMessage("");
    } else {
      console.log("WebSocket не открыт. Сообщение не отправлено.");
    }

  };
  // const handleFileChange = (e)=>{
  //   console.log(e.target.files)
  //   setMessage(e.target.files);
  //   console.log(message)

  // }

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      console.log(e.target.files);
      setImage(e.target.files[0]); // Сохраняем только первый файл
      console.log(e.target.files[0]);
    } else {
      console.log("No file selected");
    }
  };



  // const sendMessagePhoto = () => {
  //   if(!message){
  //     console.log("Please select a file");
  //     return
  //   }
  //   const url = `http://127.0.0.1:8000/chat/room/${id}/user/${autUsr}/message/`
  //   const formData = new FormData();
  //   formData.append('file',message);

  //   axios.post(url,formData,{
  //     headers:{
  //       'Content-Type':"multipart/form-data"
  //     }
  //   }).then(response=>{
  //     console.log("Файл загружен",response.data);

  //     if (isWebSocketOpen && chatSocket) {
  //       const request_id = 1;
  //       chatSocket.send(
  //         JSON.stringify({
  //           message: formData,
  //           action: "create_message",
  //           request_id: request_id,
  //         })
  //       );
  //       console.log(message);
  //       setMessage("");
  //     } else {
  //       console.log("WebSocket не открыт. Сообщение не отправлено.");
  //     }
  //   }).catch(error =>{
  //     console.error('Ошибка при загрузке файла:',error)
  //   })
  // };

  // async function  sendMessagePhoto(){
  //   try{
  //     if(message && !image){
  //       if (isWebSocketOpen && chatSocket) {
  //         const request_id = 1;
  //         chatSocket.send(
  //           JSON.stringify({
  //             message: message,
  //             action: "create_message",
  //             request_id: request_id,
  //           })
  //         );
  //         console.log(message);
  //         setMessage("");
  //       } else {
  //         console.log("WebSocket не открыт. Сообщение не отправлено.");
  //       }
  //     }

  //     if ( !image && !message) {
  //       console.log("Please select a file");
  //       return;
  //     }
  //     console.log(image)
  //     const url = `http://127.0.0.1:8000/chat/room/${id}/user/${autUsr}/message/`;
  //     const formData = new FormData();
  //     formData.append('image', image);
  //     formData.append('text', message);
  //     console.log("Отправляемые файлы " + formData.data)

  //     const response = await axios.post(url, formData, {
  //       headers: {
  //          'Content-Type': "multipart/form-data",
  //        },
  //     })
  //       console.log("Файл загружен", response.data.image);

  //       if (isWebSocketOpen && chatSocket) {
  //         const request_id = 1;
  //         chatSocket.send(
  //           JSON.stringify({
  //               action: "create_message",
  //               message: response.data.text, // Текст сообщения
  //               image: response.data.image,   // Изображение
  //               request_id: request_id,
  //           })
  //       );
  //       setMessages((prevMessages) => [
  //         ...prevMessages,
  //         {
  //            id: response.data.id, // assuming response includes id
  //           text: response.data.text,
  //           image: response.data.image, // assuming response includes the image URL
  //           created_at: new Date().toISOString(), // Use the current date
  //           user: { username: autUsr, photo: authenticatedUser.photo }, // Use current user data
  //         },
  //       ]);
  //         console.log(response.data); // Используем данные из ответа
  //         setMessage(""); // Очищаем сообщение
  //         setImage("")
  //       } else {
  //         console.log("WebSocket не открыт. Сообщение не отправлено.");
  //       }
  //     }catch(error){
  //         console.error('Ошибка при загрузке файла:', error);
  //     }
  //     chatSocket.onmessage = function (e) {
  //       const data = JSON.parse(e.data);
  //       switch (data.action) {
  //         case "create":
  //           setMessages((prevMessages) => {
  //             const messageExists = prevMessages.some(
  //               (msg) => msg.id === data.data.id
  //             );
  //             if (!messageExists) {
  //               return [...prevMessages, data.data];
  //             }
  //             return prevMessages;
  //           });
  //           break;
  //         default:
  //           break;
  //       }
  //     };
  // };

  async function sendMessagePhoto() {
    try {
      // Check for empty message and image
      if (message && !image) {
        if (isWebSocketOpen && chatSocket) {
          const request_id = 1;
          chatSocket.send(
            JSON.stringify({
              message: message,
              action: "create_message",
              request_id: request_id,
            })
          );
          setMessage("");
        }
      } else if (!image && !message) {
        console.log("Please select a file");
        return;
      }

      // Prepare the FormData
      const url = `http://127.0.0.1:8000/chat/room/${id}/user/${autUsr}/message/`;
      const formData = new FormData();
      formData.append("image", image);
      formData.append("text", message);

      // Send the request
      const response = await axios.post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // After the response, check if WebSocket is open and send the data
      if (isWebSocketOpen && chatSocket) {
        const request_id = 1;
        chatSocket.send(
          JSON.stringify({
            action: "create_message",
            message: response.data.text, // Use the text message
            image: response.data.image,   // Use the image URL from the response
            request_id: request_id,
          })
        );
        setMessage(""); // Clear the message
        setImage(""); // Clear the image
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  }

  function formatRoomName(roomName) {
    try {
      const username = autUsr;
      const newName = roomName
        .replace(username, "")
        .replace(/^_+|_+$/g, "")
        .trim();
      return newName.charAt(0).toUpperCase() + newName.slice(1);
    } catch (error) {
      console.log(error);
    }
  }

  const userAuth = autUsr;
  const authenticatedUser = authUser.find((user) => user.username === userAuth);
  return (
    <>
      <ChatArea
        title={roomList ? formatRoomName(roomList.name) : ""}
        inputValue={message}
        input={handleInputChange}
        file = {handleFileChange}
        sendmessage={sendMessagePhoto}
        content={
          <>
    {messages.filter((msg) => msg.room && msg.room.id === parseInt(id)).length === 0 ? (
  <div className={styles.nullMessageWrap}>
    <Icon>
      <BiMessageAltX color="gray" size="25" />
    </Icon>
    <p className={styles.nullMessageText}>Сообщений пока нет</p>
  </div>
) : (
  messages
    .filter((msg) => msg.room && msg.room.id === parseInt(id))
    .map((msg, index, arr) => {
      const newText = msg.created_at.substring(11, 16);
      const messageDate = msg.created_at.substring(0, 10);
      const previousMessage = arr[index - 1];
      const previousDate = previousMessage
        ? previousMessage.created_at.substring(0, 10)
        : null;
      const isNewDay = previousDate !== messageDate;

      return (
        <div key={index}>
          {isNewDay && <p className={styles.dataTimeMessage}>{messageDate}</p>}
          {msg.user.username === localStorage.getItem("username") ? (
            <Message
              text={msg.text}
              photos={msg.image}
              time={newText}
              sent
              avatar={authenticatedUser.photo}
            />
          ) : (
            <Message
              text={msg.text}
              time={newText}
              photos={msg.image}
              avatar={otherUserAvatar}
            />
          )}
        </div>
      );
    })
)}
        </>
        }
      />
    </>
  );
}

export default Chats;
