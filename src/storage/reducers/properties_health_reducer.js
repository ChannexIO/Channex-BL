import {
  PROPERTIES_HEALTH_LOAD
} from '../constants';

const initialState = null;
const ACTION_HANDLERS = {
  [PROPERTIES_HEALTH_LOAD]: (state, action) => {
    const entities = Object.assign(
      {},
      state || {},
      action.payload.stats
        .reduce((acc, el) => {
          acc[el.id] = el.attributes;
          return acc;
        }, {})
    );

    return {
      entities,
      meta: action.payload.meta
    };
  }
};

export default function propertiesHealthReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}
