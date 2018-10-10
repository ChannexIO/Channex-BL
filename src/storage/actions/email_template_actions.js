import {
  EMAIL_TEMPLATES_LOAD,
  EMAIL_TEMPLATES_ADD,
  EMAIL_TEMPLATES_DROP
} from '../constants';

function emailTemplatesLoad(storage) {
  return function (emailTemplates) {
    storage.dispatch({type: EMAIL_TEMPLATES_LOAD, payload: emailTemplates});
  };
}

function emailTemplatesAdd(storage) {
  return function (emailTemplate) {
    storage.dispatch({type: EMAIL_TEMPLATES_ADD, payload: emailTemplate});
  };
}

function emailTemplatesDrop(storage) {
  return function (emailTemplate) {
    storage.dispatch({type: EMAIL_TEMPLATES_DROP, payload: emailTemplate});
  };
}

export default {emailTemplatesLoad, emailTemplatesAdd, emailTemplatesDrop};
