import {
  HOTELS_STATS_LOAD
} from '../constants';

const initialState = null;
const ACTION_HANDLERS = {
  [HOTELS_STATS_LOAD]: (state, action) => {
    return Object.assign(
      {},
      state || {},
      action.payload
        .reduce((acc, el) => {
          acc[el.id] = el.attributes;
          return acc;
        }, {})
    );
  }
};

export default function hotelsStatsReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}
