import {
  HOTEL_POLICIES_LOAD,
  HOTEL_POLICIES_ADD,
  HOTEL_POLICIES_DROP
} from '../constants';

const initialState = null;
const ACTION_HANDLERS = {
  [HOTEL_POLICIES_LOAD]: (state, action) => {
    const entities = action.payload.records.reduce((acc, { id, attributes }) => {
      acc[id] = attributes;
      return acc;
    }, {});

    return {
      entities,
      meta: action.payload.meta
    };
  },
  [HOTEL_POLICIES_ADD]: (state, action) => {
    const state_entities = state && state.entities ? state.entities : {};
    const { id, attributes } = action.payload;

    const entities = Object.assign({}, state_entities, { [id]: attributes });

    return Object.assign({}, state, { entities });
  },
  [HOTEL_POLICIES_DROP]: (state, action) => {
    if (state && state.entities) {
      delete state.entities[action.payload.id];
    }
    return Object.assign({}, state || {}, {});
  }
};

export default function hotelPoliciesReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}
