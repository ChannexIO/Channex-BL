import { GROUPS_LOAD, GROUPS_ADD, GROUPS_DROP } from '../constants';

const initialState = null;
const ACTION_HANDLERS = {
  [GROUPS_LOAD]: (state, action) => {
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
  [GROUPS_ADD]: (state, action) => {
    let item = {};

    item[action.payload.id] = action.payload.attributes;
    if (action.payload.relationships) {
      Object.keys(action.payload.relationships).forEach(key => {
        if (Array.isArray(action.payload.relationships[key].data)) {
          item[action.payload.id][key] = action.payload.relationships[key].data
            .map(el => el.attributes)
            .reduce((acc, el) => {
              acc[el.id] = el;
              return acc;
            }, {});
        } else {
          item[action.payload.id][`${key}_id`] =
            action.payload.relationships[key].data.id;
        }
      });
    }
    return Object.assign({}, state || {}, item);
  },
  [GROUPS_DROP]: (state, action) => {
    return Object.keys(state)
      .filter(key => {
        return (
          key !== action.payload.id
        );
      })
      .reduce((acc, key) => {
        acc[key] = state[key];
        return acc;
      }, {});
  }
};

export default function groupsReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}
