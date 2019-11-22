import {
  TAXES_LOAD,
  TAXES_ADD,
  TAXES_DROP
} from '../constants';

function taxesLoad(storage) {
  return function (records, meta) {
    storage.dispatch({type: TAXES_LOAD, payload: {records, meta}});
  };
}

function taxesAdd(storage) {
  return function (payload) {
    storage.dispatch({type: TAXES_ADD, payload});
  };
}

function taxesDrop(storage) {
  return function (payload) {
    storage.dispatch({type: TAXES_DROP, payload});
  };
}

export default {taxesLoad, taxesAdd, taxesDrop};
