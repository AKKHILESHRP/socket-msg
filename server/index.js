const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    methods: ["GET", "POST"],
    origin: "http://localhost:3000",
  },
});
io.on("connection", (socket) => {
  console.log("User connected", socket.id);
  socket.on("join-room", (data) => {
    socket.join(data);
  })
  socket.on("send-message", (data) => {
    socket.to(data.joinroom).emit("receive-message", data);
  });
});
server.listen(5000, () => console.log("Server is up and running"));
