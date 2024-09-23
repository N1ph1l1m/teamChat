import React , { useState } from "react"
//import Message from "../../Shared/Message/message";
//import MessageInput from "../../Shared/inputMessage/messageInput";
import "../chatArea/chatArea.scss"
//import "../inputMessage/inputMessage.scss"
    function ChatArea(props){
        // const [message,setMessage] = useState([]);
        // const [inputValue, setInputValue] = useState("");


        // const handleSendMessage = (text)=>{
        //     if(text.trim()){
        //         setMessage([...message, text])
        //     }
        // }
        // function showMessage(){
        //     return(
        //     <>
        //         { message.map((msg,index)=>(
        //                 <Message key={index} text={msg} sent />
        //             ))
        //         }
        //     </>
        //     )
        // }

        // const handleInputChange = (e) =>{
        //     setInputValue(e.target.value);
        // };

        // function sendMessage(){
        //     setInputValue("")
        // }

    return(
        <div className='chat-area'>
            <div className="chat-header">
                <div className="chat-header-item">
                    <p>{props.title}</p>
                </div>
                <div className="messages">
                    {props.content}
                </div>
            </div>
            <div className="message-input">

                <textarea
                    placeholder="Type your message"
                    value={props.inputValue}
                    onChange={props.input}

                />
                <button  onClick={props.sendmessage}>Send</button>
                </div>
                        </div>
    )
}
export default ChatArea
