import React , { useState } from "react"
import Message from "../../Shared/Message/message";
import MessageInput from "../../Shared/inputMessage/messageInput";
import "../chatArea/chatArea.scss"
    function ChatArea(){
        const [message,setMessage] = useState([]);


        const handleSendMessage = (text)=>{
            if(text.trim()){
                setMessage([...message, text])
            }
        }
        function showMessage(){
            return(
            <>
                { message.map((msg,index)=>(
                        <Message key={index} text={msg} sent />
                    ))
                }
            </>
            )
        }

    return(
        <div className='chat-area'>
            <div className="chat-header">
                <div className="chat-header-item">
                    <p>Ttte</p>
                </div>
                <div className="messages">
                <Message text={'Testtt'}  />
                    {showMessage()}
                </div>
            </div>
            <MessageInput onSend={handleSendMessage}/>
        </div>
    )
}
export default ChatArea;
