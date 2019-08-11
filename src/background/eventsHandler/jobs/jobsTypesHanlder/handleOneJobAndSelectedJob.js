const { processItems } = require('../processItems');

const processOneAndSelectedJob = async (io, job) => {
  processItems(io, job);
};

module.exports = {
  processOneAndSelectedJob
};
