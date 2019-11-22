import {
  TAX_SETS_LOAD,
  TAX_SETS_ADD,
  TAX_SETS_DROP
} from '../constants';

function taxSetsLoad(storage) {
  return function (records, meta) {
    storage.dispatch({type: TAX_SETS_LOAD, payload: {records, meta}});
  };
}

function taxSetsAdd(storage) {
  return function (payload) {
    storage.dispatch({type: TAX_SETS_ADD, payload});
  };
}

function taxSetsDrop(storage) {
  return function (payload) {
    storage.dispatch({type: TAX_SETS_DROP, payload});
  };
}

export default {taxSetsLoad, taxSetsAdd, taxSetsDrop};
