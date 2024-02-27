import React from 'react';
import InputMessage from '../../Shared/inputMessage/inputMessage';
import '../../App/Styles/inputMessage.scss';

function Chats(props) {
    return (
        <div>
           <h1>Chats</h1> 
           <InputMessage type="text" placeholder="Сообщение..."/>
         
       
        </div>
    );
}

export default Chats;