import {
  PROPERTIES_HEALTH_LOAD
} from '../constants';

function propertiesHealthLoad(storage) {
  return function (stats, meta) {
    storage.dispatch({type: PROPERTIES_HEALTH_LOAD, payload: {stats, meta}});
  };
}

export default {propertiesHealthLoad};
