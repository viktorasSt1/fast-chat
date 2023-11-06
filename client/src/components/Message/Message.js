import React, { createContext, useContext, useState } from 'react';
import ReactEmoji from 'react-emoji';

import './Message.css';

const Message = ({name, message: { user, text }}) => {
    
    let isSentByCurrentUser = false; //TODO fix, neranda name
    const trimmedName = name ? name.trim().toLowerCase() : '';
    console.log("user:", user);
    console.log("name:", trimmedName);
    
    //TODO fix, neranda name
    if (user === trimmedName) {
        isSentByCurrentUser = true;
    }

        //Kadangi neranda name, neveikia p tag'as "sentText" kur yra {trimmedName}, 
        //neatskiria siuntejo teksto ir nepritaiko HTML ir CSS
    return isSentByCurrentUser ? (
        <div className="messageContainer">
            <p className="sentText pr-10">{trimmedName}</p>
            <div className="messageBox backgroundBlue">
                <p className="messageText colorWhite">{ReactEmoji.emojify(text)}</p>
            </div>
        </div>
    ) : (
        <div className="messageContainer justifyStart">
            <div className="messageBox backgroundLight">
                <p className="messageText colorDark">{text}</p>
            </div>
            <p className="sentText pl-10">{user}</p>
        </div>
    );
}

export default Message;