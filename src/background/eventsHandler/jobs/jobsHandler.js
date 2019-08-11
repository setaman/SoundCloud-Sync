const { JOB_TYPE_ALL, JOB_TYPE_ONE, JOB_TYPE_ONE_USER, JOB_TYPE_SELECTED } = require('../../const/const');
const { processAllJob } = require('./jobsTypesHanlder/handleAllJob');
const { processOneAndSelectedJob } = require('./jobsTypesHanlder/handleOneJobAndSelectedJob');
const { processOneUserJob } = require('./jobsTypesHanlder/handleOneUserJob');
const { addQueueJob } = require('./queue');

const processJob = async (io, job) => {
  switch (job.type) {
    case JOB_TYPE_ALL:
      processAllJob(io, job);
      break;
    case JOB_TYPE_ONE:
      processOneAndSelectedJob(io, job);
      break;
    case JOB_TYPE_SELECTED:
      processOneAndSelectedJob(io, job);
      break;
    case JOB_TYPE_ONE_USER:
      processOneUserJob(io, job);
      break;
  }
};

const handleJob = (io, job) => addQueueJob(io, job, () => processJob(io, job));

module.exports = {
  handleJob
};
