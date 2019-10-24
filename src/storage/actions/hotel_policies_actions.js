import {
  HOTEL_POLICIES_LOAD,
  HOTEL_POLICIES_ADD,
  HOTEL_POLICIES_DROP
} from '../constants';

function hotelPoliciesLoad(storage) {
  return function (records, meta) {
    storage.dispatch({type: HOTEL_POLICIES_LOAD, payload: {records, meta}});
  };
}

function hotelPoliciesAdd(storage) {
  return function (hotelPolicy) {
    storage.dispatch({type: HOTEL_POLICIES_ADD, payload: hotelPolicy});
  };
}

function hotelPoliciesDrop(storage) {
  return function (hotelPolicy) {
    storage.dispatch({type: HOTEL_POLICIES_DROP, payload: hotelPolicy});
  };
}

export default {hotelPoliciesLoad, hotelPoliciesAdd, hotelPoliciesDrop};
