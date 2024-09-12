import React from "react";
import "../Message/message.scss"

export default function Message({text,sent}){
    return(
        <div className={`message ${sent ? 'sent':'received'}`}>
            <div className="message-bubble">
                {text}
             </div>
        </div>
    )
}
