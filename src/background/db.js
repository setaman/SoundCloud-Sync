const Datastore = require('nedb-promises');
const datastore = Datastore.create('db.db');

const clear = () => datastore.remove({}, { multi: true });

export {
  datastore,
  clear
};
