import { SESSION_ADD, CHOOSE_PROPERTY, CHOOSE_GROUP } from '../constants';

const CACHE_KEY = 'CHANNEX_SESSION';
const cache = localStorage.getItem(CACHE_KEY);
const initialState = cache ? JSON.parse(cache) : null;
const ACTION_HANDLERS = {
  [SESSION_ADD]: (state, action) => {
    return action.payload;
  },
  [CHOOSE_PROPERTY]: (state, action) => {
    let result = null;

    switch (state) {
      case null:
        result = state;
        break;

      default:
        result = Object.assign({}, state, { activeProperty: action.payload });
        break;
    }

    return result;
  },
  [CHOOSE_GROUP]: (state, action) => {
    let result = null;

    switch (state) {
      case null:
        result = state;
        break;

      default:
        result = Object.assign({}, state, { activeGroup: action.payload });
        break;
    }

    return result;
  }
};

export default function sessionReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  const updated_state = handler ? handler(state, action) : state;

  localStorage.setItem(CACHE_KEY, JSON.stringify(updated_state));

  return updated_state;
}
