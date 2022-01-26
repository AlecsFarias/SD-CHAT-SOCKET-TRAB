import React, { useState, useEffect } from "react";

import "./styles.css";

import Header from "../../Components/Header";
import RoomsList from "../../Components/RoomsList";
import Chat from "../../Components/Chat";
import PeopleList from "../../Components/PeopleList";

import io from "socket.io-client";

import axios from "axios";

let socket;
const CONNECTION_PORT = "localhost:3002/";

export default function Dashboard({ userData, singOut }) {
  const [rooms, setRooms] = useState([
    ,/*   {
      id: 123,
      users: [
        {
          id: 123,
          name: "teste",
        },
      ],
      messages: [
        {
          user: {
            id: 123,
            name: "teste",
          },
          message: {
            type: "text",
            value: "teste",
          },
        },
      ],
    } */
  ]);

  const [loading, setLoading] = useState(false);

  const [selectedRoom, setSelectedRoom] = useState(null);

  async function getChat(room) {
    try {
      setLoading(true);

      const response = await axios.get(`http://localhost:3002/${room}`);

      if (response.data) {
        setRooms((rooms) => {
          const existingRoomIndex = rooms.findIndex(
            (oldRoom) => oldRoom?.id === room
          );

          if (existingRoomIndex) {
            const newRooms = [...rooms];
            newRooms[existingRoomIndex] = response.data;

            return newRooms;
          }

          return rooms;
        });
      }
    } catch (err) {
    } finally {
      setLoading(false);
    }
  }

  async function addRoom(room) {
    if (rooms.find((oldRoom) => oldRoom?.id === room)) {
      alert("Room already exists");

      return;
    }

    await socket.emit("join-room", {
      room,
      user: userData,
    });

    setRooms((prev) => [...prev, { id: room, users: [], messages: [] }]);

    socket.on("update-room", function (data) {
      setRooms((rooms) => {
        const existingRoomIndex = rooms.findIndex(
          (room) => room?.id === data?.id
        );

        if (existingRoomIndex) {
          const newRooms = [...rooms];
          newRooms[existingRoomIndex] = data;

          return newRooms;
        } else {
          return [...rooms, data];
        }
      });
    });

    setTimeout(function () {
      getChat(room);
    }, 10);
  }

  async function addMessage({ room, message }) {
    try {
      setLoading(true);

      await socket.emit("send-message", {
        room,
        message,
        user: userData,
      });

      const existingRoomIndex = rooms.findIndex(
        (oldRoom) => oldRoom?.id === room
      );

      if (existingRoomIndex) {
        setRooms((prev) => {
          let newRooms = [...prev];

          newRooms[existingRoomIndex].messages = [
            ...newRooms[existingRoomIndex].messages,
            { message, user: { ...userData, id: socket.id } },
          ];

          return newRooms;
        });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    socket = io(CONNECTION_PORT);
  }, []);

  return (
    <div className="container">
      <Header userData={userData} singOut={singOut} />

      <div className="containerContent">
        <div className="content">
          <RoomsList
            selectedRoom={selectedRoom}
            setSelectedRoom={setSelectedRoom}
            rooms={rooms}
            addRoom={addRoom}
          />
          <Chat
            selectedRoom={rooms?.find((room) => room?.id === selectedRoom)}
            me={socket?.id}
            loading={loading}
            addMessage={addMessage}
          />
        </div>

        {selectedRoom && (
          <PeopleList
            room={rooms?.find((room) => room?.id === selectedRoom)}
            me={socket?.id}
          />
        )}
      </div>

      {/* <div className="chatContainer">
        <div className="messages">
          {messageList.map((val, key) => {
            return (
              <div
                className="messageContainer"
                id={val.author == userName ? "You" : "Other"}
              >
                <div className="messageIndividual">
                  <strong>
                    {val.author == userName ? "You" : val.author}{" "}
                  </strong>
                  <div>{val.message}</div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="messageInputs">
          <input
            type="text"
            placeholder="Message..."
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
            }}
          />
          <button onClick={sendMessage} disabled={!message}>
            Send
          </button>
        </div>
      </div>

      <div>
        <h1 style={{ color: "#fff" }}>Pessoas online na sala</h1>
        {peopleOnline.map((user) => (
          <h3 style={{ color: "#fff" }}>
            {user.id !== socket.id ? "Voce" : user.name} - {user.id}
          </h3>
        ))}
      </div> */}
    </div>
  );
}
