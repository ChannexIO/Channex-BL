import {
  ROOM_TYPES_LOAD,
  ROOM_TYPES_ADD,
  ROOM_TYPES_DROP
} from '../constants';

function roomTypesLoad(storage) {
  return function (roomTypes) {
    storage.dispatch({type: ROOM_TYPES_LOAD, payload: roomTypes});
  };
}

function roomTypesAdd(storage) {
  return function (roomType) {
    storage.dispatch({type: ROOM_TYPES_ADD, payload: roomType});
  };
}

function roomTypesDrop(storage) {
  return function (roomType) {
    storage.dispatch({type: ROOM_TYPES_DROP, payload: roomType});
  };
}

export default {roomTypesLoad, roomTypesAdd, roomTypesDrop};
