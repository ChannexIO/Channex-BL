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
      });
  }

  find(id) {
    return transport
      .send('GET', `${ENDPOINT}/${id}`)
      .then(response => {
        storage.emailTemplatesAdd(response.data);
        return response;
      });
  }

  create(attrs) {
    return transport
      .send('POST', ENDPOINT, {email_template: attrs})
      .then(response => {
        storage.emailTemplatesAdd(response.data);
        return response;
      });
  }

  update(attrs) {
    return transport
      .send('PUT', ENDPOINT, {email_template: attrs})
      .then(response => {
        storage.emailTemplatesAdd(response.data);
        return response;
      });
  }
}
