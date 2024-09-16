import React from "react"
import Message from "../../Shared/Message/message";
import MessageInput from "../../Shared/inputMessage/messageInput";
import "../chatArea/chatArea.scss"
    function ChatArea(){

    return(
        <div className='chat-area'>
            <div className="chat-header">
                <div className="chat-header-item">
                    <p></p>
                </div>
                <div className="messages">
                <Message text="Hey, how are you doing?" sent />
                <Message text="I'm good, thanks! How about you?" received />
                <Message text="Doing well! Just working on a project." sent />
                <Message text="That sounds interesting. What project is it?" received />
                <Message text="It's a new web app using React and Django." sent />
                <Message text="Wow, that sounds cool! Need any help?" received />
                <Message text="Maybe later! I'm still figuring out some routing issues." sent />
                <Message text="I know how that can be. React Router can be tricky." received />
                <Message text="Yeah, especially with authentication routes." sent />
                <Message text="I've been there. Are you using PrivateRouter for that?" received />
                <Message text="Exactly! But still trying to make it work smoothly." sent />
                <Message text="You’ll get it. Let me know if you run into trouble." received />
                <Message text="Thanks, appreciate the support!" sent />
                <Message text="No problem! Anytime." received />
                <Message text="I'll keep you posted on how it goes." sent />
                </div>
            </div>
            <MessageInput/>
        </div>
    )
}
export default ChatArea;
