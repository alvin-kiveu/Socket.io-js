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
  console.log(" Sucessfuly Connected id :" + socket.id);

  socket.on("disconnected", () => {
    console.log("user disconnected");
  });

  //reciving data fromthe clent
  socket.on("massage", (msg) => {
    console.log(msg);
  });

  //sending data from the server to client
  socket.emit("serverMsg", "Hey Client");
});

http.listen(port, () => {
  console.log("litening to the client on port 3000");
});
