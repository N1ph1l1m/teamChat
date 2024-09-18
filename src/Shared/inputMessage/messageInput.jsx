import React, { useState } from "react";
import "../inputMessage/inputMessage.scss"
import Message from "../Message/message";


export default function MessageInput({onSend}){
    const [inputValue, setInputValue] = useState("");

    const handleInputChange = (e) =>{
        setInputValue(e.target.value);
    };

    function sendMessage(){
        onSend(inputValue)
        setInputValue("")
    }
        return(
        <>
            <div className="message-input">

            <textarea
                placeholder="Type your message"
                value={inputValue}
                onChange={(e)=> handleInputChange(e)}

            />
            <button  onClick={sendMessage}>Send</button>
            </div>
        </>
    )
}
