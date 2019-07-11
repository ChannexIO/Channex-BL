import { PROPERTIES_LOAD, PROPERTIES_ADD, PROPERTIES_DROP } from '../constants';
import extractRelationships from '../../utils/relationships_extractor';

const initialState = null;
const ACTION_HANDLERS = {
  [PROPERTIES_LOAD]: (state, action) => {
    return {
      entities: extractRelationships(action.payload.properties),
      meta: action.payload.meta
    };
  },
  [PROPERTIES_ADD]: (state, action) => {
    const entities = Object.assign({}, state.entities, {
      [action.payload.id]: extractRelationships(action.payload)
    });

    return Object.assign({}, state || {}, {entities: entities});
  },
  [PROPERTIES_DROP]: (state, action) => {
    delete state.entities[action.payload.id];
    return Object.assign({}, state || {}, {});
  }
};

export default function propertiesReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}
