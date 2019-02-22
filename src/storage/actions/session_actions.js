import {
  SESSION_ADD,
  CHOOSE_PROPERTY,
  CHOOSE_GROUP
} from '../constants';

function sessionAdd(storage) {
  return function (session) {
    storage.dispatch({type: SESSION_ADD, payload: session});
  };
}

function chooseProperty(storage) {
  return function (property) {
    storage.dispatch({type: CHOOSE_PROPERTY, payload: property});
  };
}

function chooseGroup(storage) {
  return function (group) {
    storage.dispatch({type: CHOOSE_GROUP, payload: group});
  };
}

export default {sessionAdd, chooseProperty, chooseGroup};
