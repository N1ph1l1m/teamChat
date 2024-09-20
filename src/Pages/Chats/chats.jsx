import React, { useEffect } from "react";
import InputMessage from "../../Shared/inputMessage/inputMessage";
import "../../App/Styles/inputMessage.scss";
import { useParams } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import ChatArea from "../../Widgets/chatArea/chatArea";
import MessageInput from "../../Shared/inputMessage/messageInput";
import withAuthentication from "../../App/Utils/withAuthentication";
import joinroom from "../../Entities/api/joinroom";
import Message from "../../Shared/Message/message";

const Text = styled.div`
 color:red;
 font-size:14px;
`;


function Chats() {
  const { id } = useParams();
  const [userlist, setUserList] = useState([]);

  const [roomName, setRoomName] = useState("");
  const  [currentUsers,setCurrentUser] = useState([]);
  const [roomData, setRoomData] = useState([]);


  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/users/${id}/`)
      .then((response) => {
        if (response.status === 200) {
          setUserList(response.data);
          console.log( "userList " + userlist.username);
        } else {
          console.log("Error: " + response.data.detail);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [id]);


  return (
    <>

    <ChatArea title = {userlist.username}
      content={<>
      <Message text={'Testtt'}  />
      <Message text={'Testtt'}  />
      <Message text={'Testtt'}  />
      </>}
    />
    </>

  );
}

export default  Chats;
