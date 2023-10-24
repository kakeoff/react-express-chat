import express from "express";
import http from "http";
import { Server, Socket } from "socket.io";
import cors from "cors";
import route from "./route";
import { addUser, findUser, getRoomUsers, removeUser } from "./users";

const app = express();

app.use(cors({ origin: "*" }));
app.use(route);

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

const handleUserJoin = (socket: Socket, { name, room }: { name: string; room: string }) => {
  socket.join(room);
  const { user, isExist } = addUser({ name, room });
  const userMessage = isExist
    ? `${user.name} here you go again!`
    : `Hey, ${user.name}`;
  socket.emit("message", {
    data: {
      message: userMessage,
      user: {
        name: "admin",
        room: room

      },
    },
  });
  socket.broadcast.to(user.room).emit("message", {
    data: {
      message: `User ${user.name} has joined`,
      user: {
        name: "admin",
        room: user.room
      },
    },
  });
  io.to(user.room).emit("room", {
    data: {
      users: getRoomUsers(user.room),
    },
  });
};

const handleSendMessage = (socket: Socket, { message, params }: { message: string; params: { name: string; room: string } }) => {
  const user = findUser(params);
  if (user) {
    io.to(user.room).emit("message", { data: { user, message } });
  }
};

const handleUserLeftRoom = (socket: Socket, { params }: { params: { name: string; room: string } }) => {
  const user = removeUser(params);
  if (user) {
    const { room, name } = user;
    io.to(user.room).emit("message", {
      data: { user: { name: "admin", room: room }, message: `${name} has left` },
    });
    io.to(user.room).emit("room", {
      data: { users: getRoomUsers(room) },
    });
  }
};

io.on("connection", (socket: Socket) => {
  socket.on("join", (data: { name: string; room: string  }) => handleUserJoin(socket, data));
  socket.on("sendMessage", (data: { message: string, params: { name: string; room: string } }) => handleSendMessage(socket, data));
  socket.on("leftRoom", (data: { params: { name: string; room: string } }) => handleUserLeftRoom(socket, data));

  socket.on("disconnect", () => {
    console.log("Disconnect");
  });
});

server.listen(4001, () => {
  console.log("Server is running");
});
