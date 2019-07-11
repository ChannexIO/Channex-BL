import {
  ROOM_TYPES_LOAD,
  ROOM_TYPES_ADD,
  ROOM_TYPES_DROP
} from '../constants';
import extractRelationships from '../../utils/relationships_extractor';

const initialState = null;
const ACTION_HANDLERS = {
  [ROOM_TYPES_LOAD]: (state, action) => {
    return {
      entities: extractRelationships(action.payload.records),
      meta: action.payload.meta
    };
  },
  [ROOM_TYPES_ADD]: (state, action) => {
    const state_entities = state && state.entities ? state.entities : {};
    const entities = Object.assign({}, state_entities || {}, {
      [action.payload.id]: extractRelationships(action.payload)
    });

    return Object.assign({}, state || {}, {entities: entities});
  },
  [ROOM_TYPES_DROP]: (state, action) => {
    if (state && state.entities) {
      delete state.entities[action.payload.id];
    }
    return Object.assign({}, state || {}, {});
  }
};

export default function roomTypesReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}
