import React from "react";

import "./styles.css";

export default function PeopleList({ room, me }) {
  return (
    <div className="peopleContainer">
      <h1>Pessoas na sala</h1>

      <table className="paleBlueRows">
        <thead>
          <tr>
            <th>Nome</th>
            <th>ID</th>
          </tr>
        </thead>

        <tbody>
          {room?.users?.map((user) => (
            <tr>
              <td>{user.id === me ? "Voce" : user.name}</td>
              <td>{user.id}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
