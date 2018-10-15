import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import localStorageCache from './middlewares/local_storage_cache';

import actions from './actions';
import rootReducer from './reducers';
import {STORAGE_CACHE_KEY} from './constants';

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
  let savedState = localStorage.getItem(STORAGE_CACHE_KEY);

  let storage = createStore(
    rootReducer,
    savedState ? JSON.parse(savedState) : preloadedState,
    composeWithDevTools(
      applyMiddleware(localStorageCache)
    )
  );

  return assignActions(storage);
};

export default Storage;
