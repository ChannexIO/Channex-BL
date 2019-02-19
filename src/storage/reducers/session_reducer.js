import { SESSION_ADD, CHOOSE_HOTEL, CHOOSE_GROUP } from '../constants';

const initialState = null;
const ACTION_HANDLERS = {
  [SESSION_ADD]: (state, action) => {
    return action.payload;
  },
  [CHOOSE_HOTEL]: (state, action) => {
    let result = null;

    switch (state) {
      case null:
        result = state;
        break;

      default:
        result = Object.assign({}, state, { activeHotel: action.payload });
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

  return handler ? handler(state, action) : state;
}
