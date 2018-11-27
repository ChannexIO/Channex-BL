import {
  SESSION_ADD,
  CHOOSE_HOTEL
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

export default {sessionAdd, chooseHotel};
