const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;

const { SOCKET_INITIALIZATION_START, SOCKET_GET_USER_LIKES,
  SOCKET_GET_USER_FOLLOWINGS } = require('./socketEvents');

// Event handler
const { getUserLikes } = require('./eventsHandler/persistedUsersDataLoding');
const { init } = require('./eventsHandler/inizialization/initialization');

io.on('connection', socket => {
  console.log('--- CLIENT CONNECTED ---');

  socket.on(SOCKET_INITIALIZATION_START, msg => init(io, msg));

  socket.on(SOCKET_GET_USER_LIKES, data => getUserLikes(io, data));
});

http.listen(port, function () {
  console.log('listening on localhost:' + port);
});
