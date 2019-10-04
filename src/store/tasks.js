import { setValue, getValue } from './electron-store';

const state = {
  tasks: getValue('tasks') || []
};

const getters = {
  someTasksIsProcessing: state => state.tasks.some(task => task.processing || task.pending)
};

const persistTasks = () => setValue('tasks', state.tasks);

const ADD_TASK = 'ADD_TASK';
const REMOVE_TASK = 'REMOVE_TASK';
const CLEAR_TASKS = 'CLEAR_TASKS';
const UPDATE_TASK = 'UPDATE_TASK';

const mutations = {
  [ADD_TASK] (state, task) {
    state.tasks.unshift(task);
    persistTasks();
  },
  [REMOVE_TASK] (state, task) {
    const taskIndex = state.tasks.findIndex(j => j.id === task.id);
    state.tasks.splice(taskIndex, 1);
    persistTasks();
  },
  [UPDATE_TASK] (state, task) {
    const taskIndex = state.tasks.findIndex(j => j.id === task.id);
    state.tasks.splice(taskIndex, 1, task);
    persistTasks();
  },
  [CLEAR_TASKS] (state) {
    state.tasks = [];
    persistTasks();
  }
};

const actions = {
  addTask ({ commit }, task) {
    commit(ADD_TASK, task);
  },
  removeTask ({ commit }, task) {
    commit(REMOVE_TASK, task);
  },
  updateTask ({ commit }, task) {
    commit(UPDATE_TASK, task);
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
