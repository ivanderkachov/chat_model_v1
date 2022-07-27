import React from "react";

import './users.css'

const Users = ({roomData}) => {

  return (
    <div className="users">
      <div> Users in room </div>
      {roomData.map((it, index) => {
        return <div key={index}>{it.name}</div>;
      })}
    </div>
  );
};

export default Users;
