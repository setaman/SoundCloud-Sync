const { processItems } = require('../processors');

const processOneAndSelectedJob = async (io, job) => {
  processItems(io, job);
};

module.exports = {
  processOneAndSelectedJob
};
