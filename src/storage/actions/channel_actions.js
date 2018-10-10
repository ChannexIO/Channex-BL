import {
  CHANNELS_LOAD,
  CHANNELS_ADD,
  CHANNELS_DROP
} from '../constants';

function channelsLoad(storage) {
  return function (channels) {
    storage.dispatch({type: CHANNELS_LOAD, payload: channels});
  };
}

function channelsAdd(storage) {
  return function (channel) {
    storage.dispatch({type: CHANNELS_ADD, payload: channel});
  };
}

function channelsDrop(storage) {
  return function (channel) {
    storage.dispatch({type: CHANNELS_DROP, payload: channel});
  };
}

export default {channelsLoad, channelsAdd, channelsDrop};
