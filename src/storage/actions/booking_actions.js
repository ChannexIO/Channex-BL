import {
  BOOKINGS_LOAD
} from '../constants';

function bookingsLoad(storage) {
  return function (bookings, meta) {
    storage.dispatch({type: BOOKINGS_LOAD, payload: {bookings, meta}});
  };
}

export default {bookingsLoad};
