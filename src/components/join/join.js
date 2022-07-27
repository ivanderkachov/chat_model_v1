import React, { useState } from "react";
import { Link } from "react-router-dom";



import './join.css'

const Join = () => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");

  return (
    <div className="joinOuterContainer">
      <div className="joinInnerContainer">
        <h1 className="heading">Join</h1>
        <div>
          <input
            className="joinInput"
            placeholder="name"
            type="text"
            onChange={(e) => {setName(e.target.value)}}
          />
        </div>
        <div>
          <input
            className="joinInput mt-20"
            placeholder="room"
            type="text"
            onChange={(e) => {setRoom(e.target.value)}}
          />
        </div>
        <Link onClick = {(e) => (!name || !room) ? e.preventDefault() : null } to={`/chat?name=${name}&room=${room}`}>
          <button className="button mt-20" type="submit">Sign IN</button>
        </Link>
      </div>
    </div>
  );
};

export default Join;
