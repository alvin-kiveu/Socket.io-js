const express = require("express");
const app = express();
const http = require("http").Server(app);
const path = require("path");
const port = process.env.PORT || 3000;

//attacing http server to a socket.io
const io = require("socket.io")(http);

//route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "src/index.html"));
});

//creating a new connection
io.on("connection", (socket) => {
  console.log("new user connected with the id" + socket.id);

  socket.on("disconnected", () => {
    console.log("user disconnected");
  });

  //reciving data fromthe clent
  socket.on("massage", (msg) => {
    console.log("Client message is: " + msg);
  });

  //sending data from the server to client
  socket.emit("serverMsg", "Hellow client");
});

http.listen(port, () => {
  console.log("litening to the client on port 3000");
});
