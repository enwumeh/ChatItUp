
const chatForm = document.getElementById('chat-form');
const socket = io();
const messagesBox = document.querySelector('.chat-messages');

//getting username and room fom the url
const { username, room } = Qs.parse(location.search, {
  ignoreQueryPrefix: true
});
  
console.log(username, room);
socket.on('message', message => {
  console.log(message);
  outputMessage(message)

  //scrollTop = the new location its gonna scroll to
  //scrollHeight = as much height as needed to fit whole element on screen
  messagesBox.scrollTop = messagesBox.scrollHeight;
});

//on submitting the message
chatForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const message = e.target.elements.msg.value;
  console.log(message);

  socket.emit('chatMessage', msg);

  const inputValue = e.target.elements.msg.value;
  // inputValue = '';
  // inputValue = inputValue.trim();
  // inputValue.focus();

});

//outOut message to dom
function outputMessage(message) {
  const div = document.createElement('div');
  //adding a class to a div. 
  //so itll be div classList = "message"
  div.classList.add('message');
  div.innerHTML = `<p class="meta">${message.username} <span>${message.time}</span></p>
  <p class="text">
  ${message.text}
  </p>`;
  document.querySelector('.chat-messages').appendChild(div);
}