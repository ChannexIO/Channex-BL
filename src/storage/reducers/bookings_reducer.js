import { BOOKINGS_LOAD } from '../constants';

const initialState = null;
const ACTION_HANDLERS = {
  [BOOKINGS_LOAD]: (state, action) => {
    const entities = action.payload.bookings.reduce((acc, el) => {
      acc[el.id] = el.attributes;
      if (el.relationships) {
        Object.keys(el.relationships).forEach(key => {
          acc[el.id][`${key}_id`] = el.relationships[key].data.id;
        });
      }
      return acc;
    }, {});

    return {
      entities,
      meta: action.payload.meta
    };
  }
};

export default function groupsReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}
