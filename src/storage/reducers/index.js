import { combineReducers } from 'redux';

import sessionReducer from './session_reducer';
import hotelsReducer from './hotels_reducer';
import roomTypesReducer from './room_types_reducer';

const rootReducer = combineReducers({
  session: sessionReducer,
  hotels: hotelsReducer,
  roomTypes: roomTypesReducer
});

export default rootReducer;
