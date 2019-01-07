import {
  RATE_CATEGORIES_LOAD,
  RATE_CATEGORIES_ADD,
  RATE_CATEGORIES_DROP
} from '../constants';

function rateCategoriesLoad(storage) {
  return function (rateCategories) {
    storage.dispatch({type: RATE_CATEGORIES_LOAD, payload: rateCategories});
  };
}

function rateCategoriesAdd(storage) {
  return function (rateCategory) {
    storage.dispatch({type: RATE_CATEGORIES_ADD, payload: rateCategory});
  };
}

function rateCategoriesDrop(storage) {
  return function (rateCategory) {
    storage.dispatch({type: RATE_CATEGORIES_DROP, payload: rateCategory});
  };
}

export default {rateCategoriesLoad, rateCategoriesAdd, rateCategoriesDrop};
