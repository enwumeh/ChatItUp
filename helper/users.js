const allUsers = [];

function connectUser(username, room, id) {
  const aUser = { username, room, id };
  allUsers.push(aUser);

  return aUser;
}

function getCurrentUser(id) {
  return allUsers.find((aUser) => aUser.id === id);
}

function exitUser(id) {
  const idx = allUsers.findIndex((aUser) => aUser.id === id);

  if (idx !== -1) {
    return allUsers.splice(idx, 1)[0];
  }
}

function getRoomUsers(room) {
  return allUsers.filter((user) => user.room === room);
}

module.exports = {
  connectUser,
  getCurrentUser,
  exitUser,
  getRoomUsers,
};
