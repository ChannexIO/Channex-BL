import {
  USER_ADD
} from '../constants';

const initialState = null;
const ACTION_HANDLERS = {
  [USER_ADD]: (state, action) => {
    return action.payload;
  }
};

export default function usersReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}
