import {
  BOOKINGS_LOAD,
  BOOKINGS_ADD
} from '../constants';

function bookingsLoad(storage) {
  return function (bookings, meta) {
    storage.dispatch({type: BOOKINGS_LOAD, payload: {bookings, meta}});
  };
}

function bookingsAdd(storage) {
  return function (booking) {
    storage.dispatch({type: BOOKINGS_ADD, payload: booking});
  };
}

export default {bookingsLoad, bookingsAdd};
