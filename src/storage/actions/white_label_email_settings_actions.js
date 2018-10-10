import {
  WHITE_LABEL_EMAIL_SETTINGS_LOAD,
  WHITE_LABEL_EMAIL_SETTINGS_ADD,
  WHITE_LABEL_EMAIL_SETTINGS_DROP
} from '../constants';

function whiteLabelEmailSettingsLoad(storage) {
  return function (whiteLabelEmailSettings) {
    storage.dispatch({type: WHITE_LABEL_EMAIL_SETTINGS_LOAD, payload: whiteLabelEmailSettings});
  };
}

function whiteLabelEmailSettingsAdd(storage) {
  return function (whiteLabelEmailSetting) {
    storage.dispatch({type: WHITE_LABEL_EMAIL_SETTINGS_ADD, payload: whiteLabelEmailSetting});
  };
}

function whiteLabelEmailSettingsDrop(storage) {
  return function (whiteLabelEmailSetting) {
    storage.dispatch({type: WHITE_LABEL_EMAIL_SETTINGS_DROP, payload: whiteLabelEmailSetting});
  };
}

export default {whiteLabelEmailSettingsLoad, whiteLabelEmailSettingsAdd, whiteLabelEmailSettingsDrop};
