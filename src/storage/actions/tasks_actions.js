import {
  TASKS_LOAD
} from '../constants';

function tasksLoad(storage) {
  return function (tasks) {
    storage.dispatch({type: TASKS_LOAD, payload: tasks});
  };
}

export default {tasksLoad};
