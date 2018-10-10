import {STORAGE_CACHE_KEY} from '../constants';

function localStorageCache({ getState }) {
  return next => action => {
    const returnValue = next(action);

    localStorage.setItem(STORAGE_CACHE_KEY, JSON.stringify(getState()));

    return returnValue;
  };
}

export default localStorageCache;
