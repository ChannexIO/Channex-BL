import {
  CANCELLATION_POLICIES_LOAD,
  CANCELLATION_POLICIES_ADD,
  CANCELLATION_POLICIES_DROP
} from '../constants';

const initialState = null;
const ACTION_HANDLERS = {
  [CANCELLATION_POLICIES_LOAD]: (state, action) => {
    const entities = action.payload.records.reduce((acc, { id, attributes }) => {
      acc[id] = attributes;
      return acc;
    }, {});

    return {
      entities,
      meta: action.payload.meta
    };
  },
  [CANCELLATION_POLICIES_ADD]: (state, action) => {
    const state_entities = state && state.entities ? state.entities : {};
    const { id, attributes } = action.payload;

    const entities = Object.assign({}, state_entities, { [id]: attributes });

    return Object.assign({}, state, { entities });
  },
  [CANCELLATION_POLICIES_DROP]: (state, action) => {
    if (state && state.entities) {
      delete state.entities[action.payload.id];
    }
    return Object.assign({}, state || {}, {});
  }
};

export default function cancellationPoliciesReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}
