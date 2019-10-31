import {
  CANCELLATION_POLICIES_LOAD,
  CANCELLATION_POLICIES_ADD,
  CANCELLATION_POLICIES_DROP
} from '../constants';

function cancellationPoliciesLoad(storage) {
  return function (records, meta) {
    storage.dispatch({type: CANCELLATION_POLICIES_LOAD, payload: {records, meta}});
  };
}

function cancellationPoliciesAdd(storage) {
  return function (cancellationPolicy) {
    storage.dispatch({type: CANCELLATION_POLICIES_ADD, payload: cancellationPolicy});
  };
}

function cancellationPoliciesDrop(storage) {
  return function (cancellationPolicy) {
    storage.dispatch({type: CANCELLATION_POLICIES_DROP, payload: cancellationPolicy});
  };
}

export default {cancellationPoliciesLoad, cancellationPoliciesAdd, cancellationPoliciesDrop};
