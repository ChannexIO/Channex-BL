import {
  PROPERTIES_LOAD,
  PROPERTIES_ADD
} from '../constants';

function propertiesLoad(storage) {
  return function (properties) {
    storage.dispatch({type: PROPERTIES_LOAD, payload: properties});
  };
}

function propertiesAdd(storage) {
  return function (property) {
    storage.dispatch({type: PROPERTIES_ADD, payload: property});
  };
}

export default {propertiesLoad, propertiesAdd};
