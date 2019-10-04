const { processItems } = require('../processItems');

const processSelectedTaskType = async (io, task) => {
  processItems(io, task);
};

module.exports = {
  processSelectedTaskType
};
