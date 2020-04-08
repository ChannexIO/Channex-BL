import { RATE_PLANS_LOAD, RATE_PLANS_ADD, RATE_PLANS_DROP } from '../constants';

import extractRelationships from 'utils/relationships_extractor';

const initialState = null;
const ACTION_HANDLERS = {
  [RATE_PLANS_LOAD]: (state, action) => {
    return extractRelationships(action.payload);
  },
  [RATE_PLANS_ADD]: (state, action) => {
    const item = extractRelationships(action.payload);

    return { ...state, [item.id]: item };
  },
  [RATE_PLANS_DROP]: (state, action) => {
    return Object.keys(state)
      .filter(key => {
        return (
          key !== action.payload.id &&
          state[key].parent_rate_plan_id !== action.payload.id
        );
      })
      .reduce((acc, key) => {
        acc[key] = state[key];
        return acc;
      }, {});
  }
};

export default function ratePlansReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}
