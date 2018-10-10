import {
  USERS_LOAD,
  USERS_ADD,
  USERS_DROP
} from '../constants';

const initialState = null;
const ACTION_HANDLERS = {
  [USERS_LOAD]: (state, action) => {
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
  [USERS_ADD]: (state, action) => {
    let item = {};

    item[action.payload.id] = action.payload.attributes;
    return Object.assign(
      {},
      state || {},
      item
    );
  },
  [USERS_DROP]: (state, action) => {
    delete state[action.payload.id];
    return Object.assign({}, state || {}, {});
  }
};

export default function usersReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}
