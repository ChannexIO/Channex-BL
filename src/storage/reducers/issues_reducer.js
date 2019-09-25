import { ISSUES_LOAD, ISSUES_ADD } from '../constants';

const initialState = null;

const ACTION_HANDLERS = {
  [ISSUES_LOAD]: (state, action) => {
    return action.payload.reduce((acc, el) => {
      acc[el.id] = el.attributes;
      if (el.relationships) {
        Object.keys(el.relationships).forEach(key => {
          if (Array.isArray(el.relationships[key].data)) {
            acc[el.id][key] = el.relationships[key].data
              .map(el => el.attributes)
              .reduce((acc, el) => {
                acc[el.id] = el;
                return acc;
              }, {});
          } else {
            acc[el.id][`${key}_id`] = el.relationships[key].data.id;
          }
        });
      }
      return acc;
    }, {});
  },
  [ISSUES_ADD]: (state, action) => {
    let item = {};

    item[action.payload.id] = action.payload.attributes;
    return Object.assign(
      {},
      state || {},
      item
    );
  }
};

export default function issuesReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}
