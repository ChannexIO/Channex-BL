import {
  SESSION_ADD,
  CHOOSE_HOTEL,
  CHOOSE_GROUP
} from '../constants';

function sessionAdd(storage) {
  return function (session) {
    storage.dispatch({type: SESSION_ADD, payload: session});
  };
}

function chooseHotel(storage) {
  return function (hotel) {
    storage.dispatch({type: CHOOSE_HOTEL, payload: hotel});
  };
}

function chooseGroup(storage) {
  return function (group) {
    storage.dispatch({type: CHOOSE_GROUP, payload: group});
  };
}

export default {sessionAdd, chooseHotel, chooseGroup};
