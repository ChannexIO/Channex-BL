import {
  GROUPS_LOAD,
  GROUPS_ADD,
  GROUPS_DROP
} from '../constants';

function groupsLoad(storage) {
  return function (groups) {
    storage.dispatch({type: GROUPS_LOAD, payload: groups});
  };
}

function groupsAdd(storage) {
  return function (group) {
    storage.dispatch({type: GROUPS_ADD, payload: group});
  };
}

function groupsDrop(storage) {
  return function (group) {
    storage.dispatch({type: GROUPS_DROP, payload: group});
  };
}

export default {groupsLoad, groupsAdd, groupsDrop};
