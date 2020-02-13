import { BOOKINGS_LOAD, BOOKINGS_ADD } from '../constants';

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
  },
  [BOOKINGS_ADD]: (state, action) => {
    let item = {};

    item[action.payload.id] = action.payload.attributes;
    if (action.payload.relationships) {
      Object.keys(action.payload.relationships)
        .forEach(
          key => {
            item[action.payload.id][`${key}_id`] = action.payload.relationships[key].data.id;
          }
        );
    }
    const entities = Object.assign(
      {},
      state ? state.entities || {} : {},
      item
    );

    return {
      entities,
      meta: state ? state.meta : {}
    };
  }
};

export default function groupsReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}
