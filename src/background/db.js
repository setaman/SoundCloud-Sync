const Datastore = require('nedb-promises');
const datastore = Datastore.create('../../../db.db');

const clear = () => datastore.remove({}, { multi: true });

clear()
  .then(() => console.log('DATABASE CLEARED'))
  .catch((e) => console.error('ERROR WHILE DELETING DB', e));

module.exports = {
  datastore,
  clear
};
