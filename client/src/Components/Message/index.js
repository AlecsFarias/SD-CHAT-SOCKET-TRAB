import React from "react";

import "./styles.css";

export default function Message({ data, isMe }) {
  const name = isMe ? "Voce" : `${data?.user?.name} - ${data?.user?.id}`;

  if (data.message.type === "text") {
    return (
      <div className={`message ${isMe ? "me" : ""}`}>
        <strong>{name}</strong>

        <p>{data?.message?.value}</p>
      </div>
    );
  }

  if (data.message.type === "file") {
    console.log(data.message);

    const link = "data:application/octet-stream;base64," + data.message.value;

    return (
      <div className={`message ${isMe ? "me" : ""}`}>
        <strong>{name}</strong>

        <a download={data.message.data.name} href={link}>
          {data.message.data.name}
        </a>
      </div>
    );
  }

  return <div></div>;
}
