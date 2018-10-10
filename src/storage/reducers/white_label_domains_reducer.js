import {
  WHITE_LABEL_DOMAINS_LOAD,
  WHITE_LABEL_DOMAINS_ADD,
  WHITE_LABEL_DOMAINS_DROP
} from '../constants';

const initialState = null;
const ACTION_HANDLERS = {
  [WHITE_LABEL_DOMAINS_LOAD]: (state, action) => {
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
  [WHITE_LABEL_DOMAINS_ADD]: (state, action) => {
    let item = {};

    item[action.payload.id] = action.payload.attributes;
    return Object.assign(
      {},
      state || {},
      item
    );
  },
  [WHITE_LABEL_DOMAINS_DROP]: (state, action) => {
    delete state[action.payload.id];
    return Object.assign({}, state || {}, {});
  }
};

export default function whiteLabelDomainsReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}
