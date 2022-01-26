import React, { useState } from "react";
import "./App.css";

import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";

export default function App() {
  const [userData, setUserData] = useState(null);

  return (
    <div className="App">
      {userData ? (
        <Dashboard userData={userData} singOut={() => setUserData(null)} />
      ) : (
        <Login setUserData={setUserData} />
      )}
    </div>
  );
}

/* import React, { useState, useEffect } from "react";
import io from "socket.io-client";


let socket;
const CONNECTION_PORT = "localhost:3002/";

function App() {
  // Before Login
  const [loggedIn, setLoggedIn] = useState(false);
  const [room, setRoom] = useState("");
  const [userName, setUserName] = useState("");

  // After Login
  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

  const [peopleOnline, setPeopleOnline] = useState([]);

  useEffect(() => {
    socket = io(CONNECTION_PORT);
  }, [CONNECTION_PORT]);

  useEffect(() => {
    if (loggedIn) {
      socket.on("receive_message", (data) => {
        setMessageList([...messageList, data]);
      });

      socket.on("update-people", function (data) {
        console.log({ data });

        setPeopleOnline(data);
      });

      //socket.emit("force-update-people", { room: room });
    }
  }, [loggedIn]);

  const connectToRoom = () => {
    setLoggedIn(true);

    socket.emit("join_room", {
      room,
      user: userName,
    });
  };

  const sendMessage = async () => {
    let messageContent = {
      room: room,
      content: {
        author: userName,
        message: message,
      },
    };

    await socket.emit("send_message", messageContent);
    setMessageList([...messageList, messageContent.content]);
    setMessage("");
  };

  return (
    <div className="App">
      {!loggedIn ? (
        <div className="logIn">
          <div className="inputs">
            <input
              type="text"
              placeholder="Name..."
              onChange={(e) => {
                setUserName(e.target.value);
              }}
            />
            <input
              type="text"
              placeholder="Room..."
              onChange={(e) => {
                setRoom(e.target.value);
              }}
            />
          </div>
          <button onClick={connectToRoom}>Enter Chat</button>
        </div>
      ) : (
        <>
          <div className="chatContainer">
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
          </div>
        </>
      )}
    </div>
  );
}

export default App;
 */
