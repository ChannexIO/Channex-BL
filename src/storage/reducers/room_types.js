function roomTypes(
  state = null,
  action
) {
  switch (action.type) {
    case 'ROOM_TYPES_LOAD':
      if (state === null) {state = {};}
      return action.payload
        .reduce((acc, el) => {
          acc[el.id] = el.attributes;
          return acc;
        }, state);

    case 'ROOM_TYPES_ADD':
      if (state === null) {state = {};}
      state[action.payload.id] = action.payload;
      return state;

    case 'ROOM_TYPES_DROP':
      if (state[action.payload.id]) {
        delete state[action.payload.id];
      }
      return state;

    default:
      return state;
  }
};

export default roomTypes;
