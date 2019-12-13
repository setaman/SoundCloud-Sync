const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.NODE_ENV === 'dev' ? 3000 : 0;

import {
  SOCKET_CONNECTION_ERROR,
  SOCKET_INITIALIZATION_START,
  SOCKET_ITEMS_GET,
  SOCKET_SYNC_STAT_GET,
  SOCKET_TASK_ADD,
  SOCKET_TASK_EXEC_CANCEL
} from './const/socketEvents';

// Events handler
import { getPaginatedUserItems } from './eventsHandler/persistedUsersDataLoding';
import init from './eventsHandler/inizialization/initialization';
import { getSyncStatus } from './eventsHandler/syncStatus';
import { handleTask } from './eventsHandler/tasks/tasksHandler';

io.on('connection', socket => {
  console.log('--- CLIENT CONNECTED ---');

  socket.on(SOCKET_CONNECTION_ERROR, msg => init(io, msg));

  socket.on(SOCKET_INITIALIZATION_START, msg => init(io, msg));

  socket.on(SOCKET_ITEMS_GET, data => getPaginatedUserItems(io, data));

  socket.on(SOCKET_SYNC_STAT_GET, () => getSyncStatus(io));

  socket.on(SOCKET_TASK_ADD, task => handleTask(io, task));

  socket.on(SOCKET_TASK_EXEC_CANCEL, () => ({/* implement this */}));

  socket.on('disconnect', () => {
    console.log('--- CLIENT DISCONNECTED ---');
  });
});

io.on('error', () => io.emit(SOCKET_CONNECTION_ERROR));

app.get('/', (req, res) => res.send('[SoundCloudSync server check]'));

const server = http.listen(port, () => {
  console.log('listening on localhost:' + server.address().port);
});

export default () => server.address().port;
