import { combineReducers } from 'redux';

import session from './session';
import hotels from './hotels';
import roomTypes from './room_types';

const rootReducer = combineReducers({
  session,
  hotels,
  roomTypes
});

export default rootReducer;
