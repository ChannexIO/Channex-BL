import {
  ISSUES_LOAD,
  ISSUES_ADD
} from '../constants';

function issuesLoad(storage) {
  return function (issues) {
    storage.dispatch({type: ISSUES_LOAD, payload: issues});
  };
}

function issuesAdd(storage) {
  return function (issue) {
    storage.dispatch({type: ISSUES_ADD, payload: issue});
  };
}

export default {
  issuesLoad,
  issuesAdd
};
