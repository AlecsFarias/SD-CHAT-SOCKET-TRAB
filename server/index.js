const express = require("express");
const socket = require("socket.io");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());

let rooms = [
  /*  {
    id: 123,
    users: [{
      id: 123,
      name: "teste"
    }],
    messages: [{
      user: {
        id: 123,
        name: "teste"
      }
      message: {
        type: 'text',
        value: 'teste'
      }
    }],
  }, */
];

app.get("/:room", (req, res) => {
  const { room } = req.params;

  const findRoom = rooms.find((oldRoom) => oldRoom.id === room);

  return res.status(200).json(findRoom);
});

const server = app.listen("3002", () => {});

io = socket(server);

io.on("connection", (socket) => {
  socket.on("join-room", (data) => {
    socket.join(data.room);

    const existingRomm = rooms.findIndex((room) => room.id === data.room);

    if (existingRomm !== -1) {
      rooms[existingRomm].users.push({ id: socket.id, ...data.user });

      socket.to(data.room).emit("update-room", rooms[existingRomm]);
    } else {
      rooms.push({
        id: data.room,
        users: [{ id: socket.id, ...data.user }],
        messages: [],
      });

      socket.to(data.room).emit("update-room", {
        id: data.room,
        users: [{ id: socket.id, ...data.user }],
        messages: [],
      });
    }
  });

  socket.on("send-message", (data) => {
    const existingRomm = rooms.findIndex((room) => room.id === data.room);

    if (existingRomm !== -1) {
      rooms[existingRomm].messages = [
        ...rooms[existingRomm].messages,
        {
          user: {
            ...data.user,
            id: socket.id,
          },
          message: data.message,
        },
      ];

      socket.to(data.room).emit("update-room", rooms[existingRomm]);
    }
  });

  socket.on("disconnect", () => {
    rooms = rooms.map((room) => ({
      ...room,
      users: room.users.filter((user) => user.id !== socket.id),
    }));

    rooms.forEach((room) => {
      socket.to(room.id).emit("update-room", room);
    });
  });
});
