import React, { useEffect } from "react";
import InputMessage from "../../Shared/inputMessage/inputMessage";
import "../../App/Styles/inputMessage.scss";
import { useParams } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import ChatArea from "../../Widgets/chatArea/chatArea";
import MessageInput from "../../Shared/inputMessage/messageInput";


function Chats() {




  const { id } = useParams();
  const [userlist, setUserList] = useState([]);

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/users/${id}/`)
      .then((response) => {
        if (response.status === 200) {
          setUserList(response.data);
          console.log(response.data);
        } else {
          console.log("Error: " + response.data.detail);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [id]);

  return (
    // <div>
    //   <p>Hello</p>
    //   {userlist && (
    //     <>
    //       <p>{userlist.id}</p>
    //       <p>{userlist.username}</p>
    //     </>
    //   )}
    // </div>
    <>

    <ChatArea/>

    </>

  );
}

export default Chats;
