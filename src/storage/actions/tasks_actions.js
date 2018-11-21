import {
  TASKS_LOAD
} from '../constants';

function tasksLoad(storage) {
  return function (tasks, meta) {
    storage.dispatch({type: TASKS_LOAD, payload: {tasks, meta}});
  };
}

export default {tasksLoad};
