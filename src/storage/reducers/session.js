function session(
  state = null,
  action
) {
  switch (action.type) {
    case 'SESSION_ADD':
      return action.payload;
    default:
      return state;
  }
};

export default session;
