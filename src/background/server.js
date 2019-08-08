const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;

const { SOCKET_INITIALIZATION_START, SOCKET_GET_USER_LIKES,
  SOCKET_SYNC_STATUS_GET, SOCKET_ADD_JOB, SOCKET_CANCEL_JOB } = require('./const/socketEvents');

// Event handler
const { getUserLikes } = require('./eventsHandler/persistedUsersDataLoding');
const { init } = require('./eventsHandler/inizialization/initialization');
const { getSyncStatus } = require('./eventsHandler/syncStatus');

io.on('connection', socket => {
  console.log('--- CLIENT CONNECTED ---');

  socket.on(SOCKET_INITIALIZATION_START, msg => init(io, msg));

  socket.on(SOCKET_GET_USER_LIKES, data => getUserLikes(io, data));

  socket.on(SOCKET_SYNC_STATUS_GET, () => getSyncStatus(io));

  socket.on(SOCKET_ADD_JOB, () => getSyncStatus(io));

  socket.on(SOCKET_CANCEL_JOB, () => getSyncStatus(io));
});

http.listen(port, function () {
  console.log('listening on localhost:' + port);
});
