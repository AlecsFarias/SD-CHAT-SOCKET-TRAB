import React, { useState } from "react";

import "./styles.css";

import Message from "../../Components/Message";

export default function Chat({ selectedRoom, loading, addMessage, me }) {
  const [message, setMessage] = useState("");
  const inputRef = React.useRef();

  function sendMessage() {
    if (!message) {
      alert("Please insert a message");
      return;
    }

    addMessage({
      room: selectedRoom.id,
      message: {
        type: "text",
        value: message,
      },
    });
    setMessage("");
  }

  async function handleSendfile(e) {
    const file = e.target.files?.[0];

    if (!file) {
      return;
    }

    var reader = new FileReader();
    reader.onloadend = function () {
      const base64String = reader.result
        .replace("data:", "")
        .replace(/^.+,/, "");

      addMessage({
        room: selectedRoom.id,
        message: {
          type: "file",
          value: base64String,
          data: {
            name: file.name,
          },
        },
      });
    };

    reader.readAsDataURL(file);
  }

  return (
    <div className="ChatContainer">
      {loading || !selectedRoom ? (
        <div className="loadingContainer">
          {!selectedRoom ? "Escolha uma sala" : "Carregando ..."}
        </div>
      ) : (
        <>
          <div className="messagesContainer">
            {selectedRoom?.messages?.map((message) => {
              return <Message data={message} isMe={me === message?.user?.id} />;
            })}
          </div>

          <div className="inputContainer">
            <input
              name="message"
              type="text"
              placeholder="Mensagem"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />

            <button onClick={sendMessage}>Enviar</button>

            <button
              className="buttonFile"
              onClick={() => {
                inputRef.current.click();
              }}
            >
              File
            </button>

            <input
              type="file"
              id="file"
              name="file"
              ref={inputRef}
              onChange={handleSendfile}
              hidden
            />
          </div>
        </>
      )}
    </div>
  );
}
