const chatForm = document.getElementById("chat-form");
const messagesBox = document.querySelector(".chat-messages");
const roomName = document.getElementById("room-name");
const usersList = document.getElementById("users");
//getting username and room fom the url
const { username, room } = Qs.parse(location.search, {
  ignoreQueryPrefix: true,
});

const socket = io();

socket.emit("joinRoom", { username, room });
// console.log(msg);

// console.log(username, room);

socket.on("roomUsers", ({ room, users }) => {
  returnRoomName(room);
  addUsers(users);
});
//whenever u get the message event
socket.on("message", (message) => {
  console.log(message);
  outputMessage(message);

  //scrollTop = the new location its gonna scroll to
  //scrollHeight = as much height as needed to fit whole element on screen
  messagesBox.scrollTop = messagesBox.scrollHeight;
});

//on submitting the message
chatForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const msg = e.target.elements.msg.value;

  msg.trim();

  if (!msg) {
    return false;
  }


  socket.emit("chatMessage", msg);
  e.target.elements.msg.value = "";

  e.target.elements.msg.focus();

  //
});

//outOut message to dom
function outputMessage(message) {
  const div = document.createElement("div");
  //adding a class to a div.
  //so itll be div classList = "message"
  div.classList.add("message");
  const p = document.createElement("p");
  p.classList.add("meta");
  p.innerText = message.username;
  p.innerHTML = p.innerHTML + `<span>${message.time}</span>`;
  div.appendChild(p);
  const p2 = document.createElement('p');
  p2.classList.add('text');
  p2.innerText = message.text;
  div.appendChild(p2);
  document.querySelector(".chat-messages").appendChild(div);
}

function returnRoomName(room) {
  roomName.innerText = room;
}

function addUsers(users) {
  usersList.innerHTML = "";
  users.forEach((user) => {
    const list = document.createElement("li");
    list.innerText = user.username;
    usersList.appendChild(list);
  });
}
