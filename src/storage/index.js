import { createStore, compose, applyMiddleware } from 'redux';
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
    compose(
      applyMiddleware(localStorageCache),
      window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
  );

  return assignActions(storage);
};

export default Storage;
