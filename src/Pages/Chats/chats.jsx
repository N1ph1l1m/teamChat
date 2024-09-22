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
  color: red;
  font-size: 14px;
`;

function Chats() {
  const { id } = useParams();
  const [roomList, setRoomList] = useState([]);

  const [currentUsers, setCurrentUser] = useState([]);
  const [roomData, setRoomData] = useState([]);

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/chat/rooms/${id}/`)
      .then((response) => {
        if (response.status === 200) {
          setRoomList(response.data);
          //console.log(JSON.stringify(response.data));
        } else {
          console.log("Error: " + response.data.detail);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [id]);

  function formatRoomName(roomName) {
    try {
      const username = localStorage.getItem("username");
      const newName = roomName
        .replace(username, "")
        .replace(/^_+|_+$/g, "")
        .trim();
      return newName.charAt(0).toUpperCase() + newName.slice(1);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <ChatArea
        title={formatRoomName(roomList.name)}
        content={
          <>
            <Message text={"Testtt"} />
            <Message text={"Testtt"} />
            <Message
            // text={JSON.stringify(roomList.current_users[1].username)}
            />
            {/* <Message text={roomList.current_users} /> */}
          </>
        }
      />
    </>
  );
}

export default Chats;
