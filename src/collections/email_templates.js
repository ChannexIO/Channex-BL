import handleError from '../utils/handle_error';

let transport;
let storage;
const ENDPOINT = 'email_templates';

export default class EmailTemplates {
  constructor(container) {
    transport = container.transport;
    storage = container.storage;
  }

  list(filters = {}) {
    return transport
      .send('GET', ENDPOINT, {filter: filters})
      .then(response => {
        storage.emailTemplatesLoad(response.data);
        return response.data;
      })
      .catch((error) => handleError(error, storage, transport));
  }

  find(id) {
    return transport
      .send('GET', `${ENDPOINT}/${id}`)
      .then(response => {
        storage.emailTemplatesAdd(response.data);
        return response;
      })
      .catch((error) => handleError(error, storage, transport));
  }

  create(attrs) {
    return transport
      .send('POST', ENDPOINT, {email_template: attrs})
      .then(response => {
        storage.emailTemplatesAdd(response.data);
        return response;
      })
      .catch((error) => handleError(error, storage, transport));
  }

  update(attrs) {
    return transport
      .send('PUT', `${ENDPOINT}/${attrs.id}`, {email_template: attrs})
      .then(response => {
        storage.emailTemplatesAdd(response.data);
        return response;
      })
      .catch((error) => handleError(error, storage, transport));
  }
}
