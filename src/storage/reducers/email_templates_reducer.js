import {
  EMAIL_TEMPLATES_LOAD,
  EMAIL_TEMPLATES_ADD,
  EMAIL_TEMPLATES_DROP
} from '../constants';

const initialState = null;
const ACTION_HANDLERS = {
  [EMAIL_TEMPLATES_LOAD]: (state, action) => {
    return action.payload.reduce((acc, el) => {
      acc[el.id] = el.attributes;
      if (el.relationships) {
        Object.keys(el.relationships).forEach(key => {
          acc[el.id][`${key}_id`] = el.relationships[key].data.id;
        });
      }
      return acc;
    }, {});
  },
  [EMAIL_TEMPLATES_ADD]: (state, action) => {
    let item = {};

    item[action.payload.id] = action.payload.attributes;
    return Object.assign(
      {},
      state || {},
      item
    );
  },
  [EMAIL_TEMPLATES_DROP]: (state, action) => {
    delete state[action.payload.id];
    return Object.assign({}, state || {}, {});
  }
};

export default function emailTemplatesReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}
