import {
  ISSUES_LOAD
} from '../constants';

function issuesLoad(storage) {
  return function (issues) {
    storage.dispatch({type: ISSUES_LOAD, payload: issues});
  };
}

export default {issuesLoad};
