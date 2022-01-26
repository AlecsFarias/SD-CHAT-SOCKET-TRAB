import React from "react";
import { useState } from "react";

export default function Login({ setUserData }) {
  const [userName, setUserName] = useState("");

  function signIn() {
    if (!userName) {
      alert("Please enter a username");

      return;
    }

    setUserData({ name: userName });
  }

  return (
    <div className="logIn">
      <div className="inputs">
        <input
          type="text"
          placeholder="Name..."
          value={userName}
          onChange={(e) => {
            setUserName(e.target.value);
          }}
        />
      </div>
      <button onClick={signIn}>Entrar</button>
    </div>
  );
}
