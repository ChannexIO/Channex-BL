import {
  RATE_PLANS_LOAD,
  RATE_PLANS_ADD,
  RATE_PLANS_DROP
} from '../constants';

function ratePlansLoad(storage) {
  return function (ratePlans) {
    storage.dispatch({type: RATE_PLANS_LOAD, payload: ratePlans});
  };
}

function ratePlansAdd(storage) {
  return function (ratePlan) {
    storage.dispatch({type: RATE_PLANS_ADD, payload: ratePlan});
  };
}

function ratePlansDrop(storage) {
  return function (ratePlan) {
    storage.dispatch({type: RATE_PLANS_DROP, payload: ratePlan});
  };
}

export default {ratePlansLoad, ratePlansAdd, ratePlansDrop};
