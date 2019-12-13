import { processItems } from '../processItems';

const processSelectedTaskType = (io, task) => {
  processItems(io, task);
};

export {
  processSelectedTaskType
};
