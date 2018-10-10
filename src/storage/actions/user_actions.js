import {
  USERS_LOAD,
  USERS_ADD,
  USERS_DROP
} from '../constants';

function usersLoad(storage) {
  return function (users) {
    storage.dispatch({type: USERS_LOAD, payload: users});
  };
}

function usersAdd(storage) {
  return function (user) {
    storage.dispatch({type: USERS_ADD, payload: user});
  };
}

function usersDrop(storage) {
  return function (user) {
    storage.dispatch({type: USERS_DROP, payload: user});
  };
}

export default {usersLoad, usersAdd, usersDrop};
