const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});
io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("join", (username) => {
    socket.username = username;
    socket.join("chatRoom");
    console.log(username);
    io.to("chatRoom").emit("message", {
      username: "Server",
      message: `${username} has joined the chat`,
    });
  });

  socket.on("message", (message) => {
    io.to("chatRoom").emit("message", { username: socket.username, message });
    console.log(message);
  });

  socket.on("disconnect", () => {
    if (socket.username) {
      io.to("chatRoom").emit("message", {
        username: "Server",
        message: `${socket.username} has left the chat`,
      });
    }
  });
});

server.listen(3001, () => {
  console.log("SERVER IS RUNNING");
});
