import React from "react";

import "./styles.css";

export default function Header({ userData, singOut }) {
  return (
    <div className="headerContainer">
      <h1>{userData?.name || ""}</h1>

      <button onClick={singOut}>Sair</button>
    </div>
  );
}
