import {
  USER_ADD
} from '../constants';

function userAdd(storage) {
  return function (user) {
    storage.dispatch({type: USER_ADD, payload: user});
  };
}

export default {userAdd};
