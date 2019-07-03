const Datastore = require('nedb-promises')
const datastore = Datastore.create('../../db.db')

module.exports = {
  datastore
}
