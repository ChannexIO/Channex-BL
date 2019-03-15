import { CHANNEL_ACTIONS_LOAD } from '../constants';

const initialState = {
  entities: null,
  meta: null
};
const ACTION_HANDLERS = {
  [CHANNEL_ACTIONS_LOAD]: (state, action) => {
    const entities = action.payload.channelActions.reduce((acc, el) => {
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

export default function channelActionsReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}
