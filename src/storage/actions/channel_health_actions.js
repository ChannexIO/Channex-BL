import {
  CHANNELS_HEALTH_LOAD
} from '../constants';

function channelsHealthLoad(storage) {
  return function (stats) {
    storage.dispatch({type: CHANNELS_HEALTH_LOAD, payload: stats});
  };
}

export default {channelsHealthLoad};
