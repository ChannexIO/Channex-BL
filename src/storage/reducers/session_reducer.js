import {
  SESSION_ADD
} from '../constants';

const initialState = null;
const ACTION_HANDLERS = {
  [SESSION_ADD]: (state, action) => {
    return action.payload;
  }
};

export default function sessionReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}
