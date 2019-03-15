import {
  CHANNEL_ACTIONS_LOAD
} from '../constants';

function channelActionsLoad(storage) {
  return function (channelActions, meta) {
    storage.dispatch({type: CHANNEL_ACTIONS_LOAD, payload: {channelActions, meta}});
  };
}

export default {channelActionsLoad};
