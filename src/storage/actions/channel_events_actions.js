import {
  CHANNEL_EVENTS_LOAD
} from '../constants';

function channelEventsLoad(storage) {
  return function (channelEvents, meta) {
    storage.dispatch({type: CHANNEL_EVENTS_LOAD, payload: {channelEvents, meta}});
  };
}

export default {channelEventsLoad};
