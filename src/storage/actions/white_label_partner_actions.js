import {
  WHITE_LABEL_PARTNERS_LOAD,
  WHITE_LABEL_PARTNERS_ADD,
  WHITE_LABEL_PARTNERS_DROP
} from '../constants';

function whiteLabelPartnersLoad(storage) {
  return function (whiteLabelPartners) {
    storage.dispatch({type: WHITE_LABEL_PARTNERS_LOAD, payload: whiteLabelPartners});
  };
}

function whiteLabelPartnersAdd(storage) {
  return function (whiteLabelPartner) {
    storage.dispatch({type: WHITE_LABEL_PARTNERS_ADD, payload: whiteLabelPartner});
  };
}

function whiteLabelPartnersDrop(storage) {
  return function (whiteLabelPartner) {
    storage.dispatch({type: WHITE_LABEL_PARTNERS_DROP, payload: whiteLabelPartner});
  };
}

export default {whiteLabelPartnersLoad, whiteLabelPartnersAdd, whiteLabelPartnersDrop};
