const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const route = require("./route");
const { addUser, findUser, getRoomUsers, removeUser } = require("./users");

const app = express();

app.use(cors({ origin: "*" }));
app.use(route);

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  }
});

const handleUserJoin = (socket, { name, room }) => {
  socket.join(room);
  const { user, isExist } = addUser({ name, room });
  const userMessage = isExist
    ? `${user.name} here you go again!`
    : `Hey, ${user.name}`;
  socket.emit("message", {
    data: {
      user: {
        name: "admin",
        message: userMessage
      }
    }
  });
  socket.broadcast.to(user.room).emit("message", {
    data: {
      user: {
        name: "admin",
        message: `User ${user.name} has joined`
      }
    }
  });
  io.to(user.room).emit("room", {
    data: {
      users: getRoomUsers(user.room)
    }
  });
};

const handleSendMessage = (socket, { message, params }) => {
  const user = findUser(params);
  if (user) {
    io.to(user.room).emit("message", { data: { user, message } });
  }
};

const handleUserLeftRoom = (socket, { params }) => {
  const user = removeUser(params);
  if (user) {
    const { room, name } = user;
    io.to(user.room).emit("message", {
      data: { user: { name: "admin" }, message: `${name} has left` }
    });
    io.to(user.room).emit("room", {
      data: { users: getRoomUsers(room) }
    });
  }
};

io.on("connection", (socket) => {
  socket.on("join", (data) => handleUserJoin(socket, data));
  socket.on("sendMessage", (data) => handleSendMessage(socket, data));
  socket.on("leftRoom", (data) => handleUserLeftRoom(socket, data));

  socket.on("disconnect", () => {
    console.log("Disconnect");
  });
});

server.listen(4000, () => {
  console.log("Server is running");
});
