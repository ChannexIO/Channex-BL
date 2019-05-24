import {
  USER_ADD
} from '../constants';

const CACHE_KEY = 'CHANNEX_USER';
const cache = localStorage.getItem(CACHE_KEY);
const initialState = cache ? JSON.parse(cache) : null;
const ACTION_HANDLERS = {
  [USER_ADD]: (state, action) => {
    return action.payload;
  }
};

export default function usersReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  const updated_state = handler ? handler(state, action) : state;

  localStorage.setItem(CACHE_KEY, JSON.stringify(updated_state));

  return updated_state;
}
