const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const path = require('path');
const formMessage = require('./helper/messages')
const { connectUser, getCurrentUser }  = require('./helper/users')


const app = express();
const server = http.createServer(app);
const io = socketio(server);
const userBot = 'Chat It Up Bot'


//when u reload on client side this will log "Welcome to chat it up!"

app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', socket => {
  socket.on('joinRoom', ({ username, room }) => {
    socket.emit('message', formMessage(userBot, 'Welcome to Chat It Up!'))

    const newUser = connectUser(socket.id, username, room);

    socket.join(newUser.room);

    //announces when a user connects.. emits to everyone EXCEPT the user connecting
    socket.broadcast.to(newUser.room)
      .emit(
    'message',
    formMessage(userBot, `${newUser.username} has joined the chat!`));
  })
  // console.log("New Websocket connection...")
  //io.emit == to ALL the clients in general

  //announces to the single client(current user) when they are connected

  socket.on('chatMessage', msg => {
    const user = getCurrentUser(socket.id);
    io.to(userName.room).emit('message', formMessage(newUser.username, msg));
  })
  
  socket.on('disconnect', () => {
    io.emit('message', formMessage(userBot, 'a user has exited the chat'));
  })

 
});
app.use(express.static(path.join(__dirname, 'public')));

const PORT = 3000 || process.env.PORT;

server.listen(PORT, () => console.log(`Server is running on port number ${PORT}`));