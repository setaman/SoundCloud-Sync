const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;

const { SOCKET_INITIALIZATION_START, SOCKET_LIKES_GET,
  SOCKET_SYNC_STAT_GET, SOCKET_JOB_ADD, SOCKET_JOB_EXEC_CANCEL } = require('./const/socketEvents');

// Event handler
const { getPaginatedUserItems } = require('./eventsHandler/persistedUsersDataLoding');
const { init } = require('./eventsHandler/inizialization/initialization');
const { getSyncStatus } = require('./eventsHandler/syncStatus');
const { handleJob } = require('./eventsHandler/jobs/jobsHandler');

io.on('connection', socket => {
  console.log('--- CLIENT CONNECTED ---');

  socket.on(SOCKET_INITIALIZATION_START, msg => init(io, msg));

  socket.on(SOCKET_LIKES_GET, data => getPaginatedUserItems(io, data));

  socket.on(SOCKET_SYNC_STAT_GET, () => getSyncStatus(io));

  socket.on(SOCKET_JOB_ADD, job => handleJob(io, job));

  socket.on(SOCKET_JOB_EXEC_CANCEL, () => getSyncStatus(io));
});

http.listen(port, function () {
  console.log('listening on localhost:' + port);
});
