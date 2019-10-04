const { processItems } = require('../processItems');

const processOneAndSelectedTask = async (io, task) => {
  processItems(io, task);
};

module.exports = {
  processOneAndSelectedTask
};
