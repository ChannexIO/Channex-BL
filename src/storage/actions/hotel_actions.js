import {
  HOTELS_LOAD,
  HOTELS_ADD
} from '../constants';

function hotelsLoad(storage) {
  return function (hotels) {
    storage.dispatch({type: HOTELS_LOAD, payload: hotels});
  };
}

function hotelsAdd(storage) {
  return function (hotel) {
    storage.dispatch({type: HOTELS_ADD, payload: hotel});
  };
}

export default {hotelsLoad, hotelsAdd};
