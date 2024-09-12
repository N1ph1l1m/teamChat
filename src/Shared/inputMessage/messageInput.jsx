import React, { useState } from "react";
import "../inputMessage/inputMessage.scss"


export default function MessageInput(){
    const {inputValue,setInputValue} = useState('')

    const handleInputChange = ()=>{

        setInputValue()


    }
    const handleSendMessage = () =>{
        console.log("MESSAGE SEND")
        setInputValue()

    }
        return(
        <>
            <div className="message-input">
            <textarea
                placeholder="Type your message"
                value={inputValue}
                onChange={handleInputChange}

            />
            <button  onClick={handleSendMessage}>Send</button>
            </div>
        </>
    )
}
