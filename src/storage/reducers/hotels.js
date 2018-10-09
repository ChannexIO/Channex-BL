function hotels(
  state = {},
  action
) {
  switch (action.type) {
    case 'HOTELS_BATCH':
      return action.payload
        .reduce((acc, el) => {
          acc[el.id] = el.attributes;
          return acc;
        }, state);
    case 'HOTELS_ADD':
      state[action.payload.id] = action.payload;
      return state;
    case 'HOTELS_DROP':
      delete state[action.payload.id];
      return state;
    default:
      return state;
  }
};

export default hotels;
