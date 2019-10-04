import { setValue, getValue } from './electron-store';

const state = {
  jobs: getValue('jobs') || []
};

const getters = {
  someTasksIsProcessing: state => state.jobs.some(job => job.processing || job.pending)
};

const persistJobs = () => setValue('jobs', state.jobs);

const ADD_JOB = 'ADD_JOB';
const REMOVE_JOB = 'REMOVE_JOB';
const CLEAR_TASKS = 'CLEAR_TASKS';
const UPDATE_JOB = 'UPDATE_JOB';

const mutations = {
  [ADD_JOB] (state, job) {
    state.jobs.unshift(job);
    persistJobs();
  },
  [REMOVE_JOB] (state, job) {
    const jobIndex = state.jobs.findIndex(j => j.id === job.id);
    state.jobs.splice(jobIndex, 1);
    persistJobs();
  },
  [UPDATE_JOB] (state, job) {
    const jobIndex = state.jobs.findIndex(j => j.id === job.id);
    state.jobs.splice(jobIndex, 1, job);
    persistJobs();
  },
  [CLEAR_TASKS] (state) {
    state.jobs = [];
    persistJobs();
  }
};

const actions = {
  addJob ({ commit }, job) {
    commit(ADD_JOB, job);
  },
  removeJob ({ commit }, job) {
    commit(REMOVE_JOB, job);
  },
  updateJob ({ commit }, job) {
    commit(UPDATE_JOB, job);
  },
  clearTasks ({ commit }) {
    commit(CLEAR_TASKS);
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
