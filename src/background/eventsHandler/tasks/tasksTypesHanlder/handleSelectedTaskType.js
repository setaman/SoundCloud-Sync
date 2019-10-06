import { processItems } from '../processItems';

const processSelectedTaskType = async (io, task) => {
  processItems(io, task);
};

export {
  processSelectedTaskType
};
