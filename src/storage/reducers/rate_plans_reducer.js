import {
  RATE_PLANS_LOAD,
  RATE_PLANS_ADD,
  RATE_PLANS_DROP
} from '../constants';

const initialState = null;
const ACTION_HANDLERS = {
  [RATE_PLANS_LOAD]: (state, action) => {
    return Object.assign(
      {},
      state || {},
      action.payload
        .reduce((acc, el) => {
          acc[el.id] = el.attributes;
          return acc;
        }, {})
    );
  },
  [RATE_PLANS_ADD]: (state, action) => {
    let item = {};

    item[action.payload.id] = action.payload.attributes;
    return Object.assign(
      {},
      state || {},
      item
    );
  },
  [RATE_PLANS_DROP]: (state, action) => {
    delete state[action.payload.id];
    return Object.assign({}, state || {}, {});
  }
};

export default function ratePlansReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}
