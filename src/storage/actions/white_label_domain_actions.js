import {
  WHITE_LABEL_DOMAINS_LOAD,
  WHITE_LABEL_DOMAINS_ADD,
  WHITE_LABEL_DOMAINS_DROP
} from '../constants';

function whiteLabelDomainsLoad(storage) {
  return function (whiteLabelDomains) {
    storage.dispatch({type: WHITE_LABEL_DOMAINS_LOAD, payload: whiteLabelDomains});
  };
}

function whiteLabelDomainsAdd(storage) {
  return function (whiteLabelDomain) {
    storage.dispatch({type: WHITE_LABEL_DOMAINS_ADD, payload: whiteLabelDomain});
  };
}

function whiteLabelDomainsDrop(storage) {
  return function (whiteLabelDomain) {
    storage.dispatch({type: WHITE_LABEL_DOMAINS_DROP, payload: whiteLabelDomain});
  };
}

export default {whiteLabelDomainsLoad, whiteLabelDomainsAdd, whiteLabelDomainsDrop};
