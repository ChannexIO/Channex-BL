function roomTypes(
  state = {},
  action
) {
  switch (action.type) {
    case 'ROOM_TYPES_BATCH':
      return action.payload
        .reduce((acc, el) => {
          acc[el.id] = el.attributes;
          return acc;
        }, state);
    case 'ROOM_TYPES_ADD':
      state[action.payload.id] = action.payload;
      return state;
    case 'ROOM_TYPES_DROP':
      delete state[action.payload.id];
      return state;
    default:
      return state;
  }
};

export default roomTypes;
