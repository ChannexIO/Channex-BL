import {
  TAX_SETS_LOAD,
  TAX_SETS_ADD,
  TAX_SETS_DROP
} from '../constants';

const initialState = null;
const ACTION_HANDLERS = {
  [TAX_SETS_LOAD]: (state, action) => {
    const entities = action.payload.records.reduce((acc, { id, attributes }) => {
      acc[id] = attributes;
      return acc;
    }, {});

    return {
      entities,
      meta: action.payload.meta
    };
  },
  [TAX_SETS_ADD]: (state, action) => {
    const state_entities = state && state.entities ? state.entities : {};
    const { id, attributes } = action.payload;

    const entities = Object.assign({}, state_entities, { [id]: attributes });

    return Object.assign({}, state, { entities });
  },
  [TAX_SETS_DROP]: (state, action) => {
    if (state && state.entities) {
      delete state.entities[action.payload.id];
    }
    return Object.assign({}, state || {}, {});
  }
};

export default function taxSetsReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}
