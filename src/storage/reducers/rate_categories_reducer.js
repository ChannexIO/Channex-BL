import { RATE_CATEGORIES_LOAD, RATE_CATEGORIES_ADD, RATE_CATEGORIES_DROP } from '../constants';

const initialState = null;
const ACTION_HANDLERS = {
  [RATE_CATEGORIES_LOAD]: (state, action) => {
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
  [RATE_CATEGORIES_ADD]: (state, action) => {
    let item = {};

    item[action.payload.id] = action.payload.attributes;
    if (action.payload.relationships) {
      Object.keys(action.payload.relationships).forEach(key => {
        item[action.payload.id][`${key}_id`] =
          action.payload.relationships[key].data.id;
      });
    }
    return Object.assign({}, state || {}, item);
  },
  [RATE_CATEGORIES_DROP]: (state, action) => {
    return Object.keys(state)
      .filter(key => {
        return (
          key !== action.payload.id &&
          state[key].parent_rate_category_id !== action.payload.id
        );
      })
      .reduce((acc, key) => {
        acc[key] = state[key];
        return acc;
      }, {});
  }
};

export default function rateCategoriesReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}
