import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';

import actions from './actions';
import rootReducer from './reducers';

function assignActions(target) {
  Object
    .keys(actions)
    .forEach(function (action) {
      if (typeof target[action] === 'undefined') {
        target[action] = actions[action](target);
      } else {
        throw new Error(`${action} is present at storage object`);
      }
    });

  return target;
}

const Storage = preloadedState => {
  let storage = createStore(
    rootReducer,
    preloadedState,
    composeWithDevTools()
  );

  return assignActions(storage);
};

export default Storage;
