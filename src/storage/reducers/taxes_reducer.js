import {
  TAXES_LOAD,
  TAXES_ADD,
  TAXES_DROP
} from '../constants';

const initialState = null;
const ACTION_HANDLERS = {
  [TAXES_LOAD]: (state, action) => {
    const entities = action.payload.records.reduce((acc, { id, attributes }) => {
      acc[id] = attributes;
      return acc;
    }, {});

    return {
      entities,
      meta: action.payload.meta
    };
  },
  [TAXES_ADD]: (state, action) => {
    const state_entities = state && state.entities ? state.entities : {};
    const { id, attributes } = action.payload;

    const entities = Object.assign({}, state_entities, { [id]: attributes });

    return Object.assign({}, state, { entities });
  },
  [TAXES_DROP]: (state, action) => {
    if (state && state.entities) {
      delete state.entities[action.payload.id];
    }
    return Object.assign({}, state || {}, {});
  }
};

export default function taxesReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}
