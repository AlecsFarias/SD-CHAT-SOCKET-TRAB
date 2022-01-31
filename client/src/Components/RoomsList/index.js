import React, { useState } from "react";

import "./styles.css";

export default function RoomsList({
  rooms,
  addRoom,
  setSelectedRoom,
  selectedRoom,
}) {
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
          .map((room) => {
            const lastMessage = room.messages?.[room.messages?.length - 1];

            return (
              <button
                className={`room ${selectedRoom === room.id && "selected"}`}
                onClick={() => setSelectedRoom(room.id)}
              >
                <strong style={{ fontSize: 22 }}>Sala: {room?.id}</strong>

                {room.messages?.length > 0 && (
                  <p>
                    <strong style={{ marginLeft: 5 }}>
                      {lastMessage?.user?.name}:
                    </strong>

                    {lastMessage.message.type === "text"
                      ? lastMessage.message.value
                      : "Arquivo"}
                  </p>
                )}
              </button>
            );
          })}
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
