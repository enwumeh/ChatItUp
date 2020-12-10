const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketio(server);


//when u reload on client side this will log "Welcome to chat it up!"
io.on('connection', socket => {
  // console.log("New Websocket connection...")
  //io.emit == to ALL the clients in general

  //announces to the single client when they are connected
  socket.emit('message', 'Welcome to Chat It Up!')

  //announces when a user connects.. emits to everyone EXCEPT the user connecting
  socket.broadcast.emit('message', 'a new user has joined the chat!');
  
  socket.on('disconnect', () => {
    io.emit('message', 'a user has exited the chat');
  })
});
app.use(express.static(path.join(__dirname, 'public')));

const PORT = 3000 || process.env.PORT;

server.listen(PORT, () => console.log(`Server is running on port number ${PORT}`));