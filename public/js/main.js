const chatForm = document.getElementById('chat-form');
const socket = io();

socket.on('message', message => {
  console.log(message);
});

//on submitting the message
chatForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const message = e.target.elements.msg.value;
  console.log(message);

  socket.emit('chat-message', message);
});