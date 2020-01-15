import {
  CHANNELS_HEALTH_LOAD
} from '../constants';

function channelsHealthLoad(storage) {
  return function (stats, meta) {
    storage.dispatch({type: CHANNELS_HEALTH_LOAD, payload: {stats, meta}});
  };
}

export default {channelsHealthLoad};
