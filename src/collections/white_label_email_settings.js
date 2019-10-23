import handleError from '../utils/handle_error';

let transport;
let storage;
const ENDPOINT = 'wl_email_settings';

export default class WhiteLabelEmailSettings {
  constructor(container) {
    transport = container.transport;
    storage = container.storage;
  }

  list(filters = {}) {
    return transport
      .send('GET', ENDPOINT, {filter: filters})
      .then(response => {
        storage.whiteLabelEmailSettingsLoad(response.data);
        return response.data;
      })
      .catch((error) => handleError(error, storage, transport));
  }

  find(id) {
    return transport
      .send('GET', `${ENDPOINT}/${id}`)
      .then(response => {
        storage.whiteLabelEmailSettingsAdd(response.data);
        return response;
      })
      .catch((error) => handleError(error, storage, transport));
  }

  create(attrs) {
    return transport
      .send('POST', ENDPOINT, {wl_email_setting: attrs})
      .then(response => {
        storage.whiteLabelEmailSettingsAdd(response.data);
        return response;
      })
      .catch((error) => handleError(error, storage, transport));
  }

  update(attrs) {
    return transport
      .send('PUT', `${ENDPOINT}/${attrs.id}`, {wl_email_setting: attrs})
      .then(response => {
        storage.whiteLabelEmailSettingsAdd(response.data);
        return response;
      })
      .catch((error) => handleError(error, storage, transport));
  }
}
