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
function Chats() {
  const { id } = useParams();
  const [userlist, setUserList] = useState([]);

  useEffect(() => {
    //  joinroom(id)
  }, [id]);


  return (
    <>
    <ChatArea/>
    </>

  );
}

export default  Chats;
