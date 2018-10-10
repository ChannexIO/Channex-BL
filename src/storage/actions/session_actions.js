import {
  SESSION_ADD
} from '../constants';

function sessionAdd(storage) {
  return function (session) {
    storage.dispatch({type: SESSION_ADD, payload: session});
  };
}

export default {sessionAdd};
