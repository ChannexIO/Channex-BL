import {
  HOTELS_STATS_LOAD
} from '../constants';

function hotelsStatsLoad(storage) {
  return function (stats) {
    storage.dispatch({type: HOTELS_STATS_LOAD, payload: stats});
  };
}

export default {hotelsStatsLoad};
