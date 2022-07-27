import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import io from "socket.io-client";

import './chat.css'
import InfoBar from "../infobar/infobar"
import Input from "../input/input";
import Messages from "../messages/messages"
import Users from "../users/users";


let socket;

const Chat = () => {
  const [searchParams] = useSearchParams();
  const [name, setName] = useState('')
  const [room, setRoom] = useState('')
  const [roomData, setRoomData] = useState([]);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const ENDPOINT = "localhost:8090";

  useEffect(() => {
    const currentParams = Object.fromEntries([...searchParams]);
    setName(currentParams.name);
    setRoom(currentParams.room);
    socket = io(ENDPOINT);
    socket.emit(
      "join",
      { name: currentParams.name, room: currentParams.room },
      (error) => {
        if (error) {
          return alert(error)
        }
      }
    );
    return () => {
      socket.disconnect();
      socket.off();
    };
  }, [searchParams]);

  useEffect(() => {
    socket.on('message', (message) => {
      setMessages([...messages, message]);
    });
    socket.on('roomData', (roomInfo) => {
      setRoomData([...roomInfo.users])
    })
  }, [messages]);

  const sendMessage = (event) => {
    event.preventDefault();
    if (message) {
      // setMessages([...messages, message])
      socket.emit('sendMessage', message, () => setMessage(''));
    }
  };

console.log(roomData)

  return (
    <div className="outerContainer">
      <div className="container">
          <InfoBar room={room}/>
          <Users roomData={roomData}/>
          <Messages messages={messages} name={name}/>
          <Input message={message} sendMessage={sendMessage} setMessage={setMessage}/>
      </div>
    </div>
  );
};

export default Chat;
