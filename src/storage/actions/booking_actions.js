import {
  BOOKINGS_LOAD
} from '../constants';

function bookingsLoad(storage) {
  return function (groups) {
    storage.dispatch({type: BOOKINGS_LOAD, payload: groups});
  };
}

export default {bookingsLoad};
