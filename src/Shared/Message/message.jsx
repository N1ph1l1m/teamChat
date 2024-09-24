import React from "react";
import "../Message/message.scss"

export default function Message({text,sent,time}){
    return(
        <div className={`message ${sent ? 'sent':'received'}`}>
            <div className="message-bubble">
                <div className="bubble-text">{text}</div>
                <div className="bubble-time-wrap"><span className="bubble-time-text">{time}</span></div>
             </div>
        </div>
    )
}
