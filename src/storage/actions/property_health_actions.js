import {
  PROPERTIES_HEALTH_LOAD
} from '../constants';

function propertiesHealthLoad(storage) {
  return function (stats) {
    storage.dispatch({type: PROPERTIES_HEALTH_LOAD, payload: stats});
  };
}

export default {propertiesHealthLoad};
