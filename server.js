const express = require("express");
const http = require("http");
const socketio = require("socket.io");
const path = require("path");
const formMessage = require("./helper/messages");
const {
  connectUser,
  getCurrentUser,
  exitUser,
  getRoomUsers,
} = require("./helper/users");

const app = express();
const server = http.createServer(app);
const io = socketio(server);
const userBot = "Chat It Up Bot";

//when u reload on client side this will log "Welcome to chat it up!"

app.use(express.static(path.join(__dirname, "public")));

io.on('connection', socket => {
  socket.on('joinRoom', ({ username, room }) => {
    const user = connectUser(username, room, socket.id);
    socket.join(user.room);
    console.log("HEREEEEEE", socket.id, user);

    //welcome current user
    socket.emit("message", formMessage(userBot, "Welcome to Chat It Up!"));

    //announces when a user connects.. emits to everyone EXCEPT the user connecting
    socket.broadcast
      .to(user.room)
      .emit(
        "message",
        formMessage(userBot, `${user.username} has joined the chat!`)
    );
    
    io.to(user.room).emit('roomUsers', {
      room: user.room,
      users: getRoomUsers(user.room)
    });
  });
  console.log("New Websocket connection...");

  // io.emit == to ALL the clients in general
  

  socket.on("chatMessage", msg => {
    const user = getCurrentUser(socket.id);
    // console.log("HEREEEEEE", socket.id, user);
    console.log(msg);

    io.to(user.room).emit("message", formMessage(user.username, msg));
  });

  socket.on("disconnect", () => {
    const user = exitUser(socket.id);
    if (user) {
      io.to(user.room).emit(
        "message",
        formMessage(userBot, `${user.username} has just exited the chatroom`)
      );

      io.to(user.room).emit('roomUsers', {
        room: user.room,
        users: getRoomUsers(user.room)
      });
    }
  });

  
  
});
// console.log("jlgfihuytuihj");

// app.use(express.static(path.join(__dirname, 'public')));

const PORT = 3000 || process.env.PORT;

server.listen(PORT, () =>
  console.log(`Server is running on port number ${PORT}`)
);
