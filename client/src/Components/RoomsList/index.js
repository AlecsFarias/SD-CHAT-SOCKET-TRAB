import React, { useState } from "react";

import "./styles.css";

export default function RoomsList({ rooms, addRoom, setSelectedRoom }) {
  const [room, setRoom] = useState("");

  function submit() {
    if (!room) {
      alert("Please enter a room");

      return;
    }

    addRoom(room);
    setRoom("");
  }

  return (
    <div className="roomsListContainer">
      <div className="rooms">
        {rooms
          .filter((room) => room)
          .map((room) => (
            <button className="room" onClick={() => setSelectedRoom(room.id)}>
              Sala: {room?.id}
            </button>
          ))}
      </div>

      <div className="bottomContainer">
        <input
          type="text"
          placeholder="ID da sala..."
          value={room}
          onChange={(e) => {
            setRoom(e.target.value);
          }}
        />

        <button onClick={submit}>Entrar</button>
      </div>
    </div>
  );
}
