import React, { useState, useEffect } from "react";
import queryString from 'query-string';
import io from 'socket.io-client';
import { useLocation } from 'react-router-dom';

import './Chat.css';

import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';
import Messages from '../Messages/Messages';


const ENDPOINT = 'http://localhost:5000';

let socket;

const Chat = () => {
    const [name, setName] = useState('');//TODO ??
    const [room, setRoom] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const location = useLocation();

    useEffect(() => {
        const { name, room } = queryString.parse(location.search);
    
        socket = io(ENDPOINT);

        setName(name);
        setRoom(room);

        socket.emit('join', {name, room});

        return () => {
            socket.emit('disconnect');
            socket.off();
        }
    }, [location.search]);

    useEffect(() => {
        socket.on('message', (message) => {
            setMessages([...messages, message]);
        })
    }, [messages]);

    const sendMessage = (event) => {
        event.preventDefault();

        if (message) {
            socket.emit('sendMessage', message, () => setMessage(''));
        }
    }

//Renderinimas i ekrana
    return (
        <div className="outerContainer">
            <div className="container">
                <InfoBar room={room} />
                <Messages messages={messages}/>
                <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
            </div>
        </div>
    )
}

export default Chat;