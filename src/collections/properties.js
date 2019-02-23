let transport;
let storage;
const ENDPOINT = 'properties';

export default class Properties {
  constructor(container) {
    transport = container.transport;
    storage = container.storage;
  }

  list(filters = {}) {
    return transport
      .send('GET', ENDPOINT, {filter: filters})
      .then(response => {
        storage.propertiesLoad(response.data);
        return response.data;
      });
  }

  health() {
    return transport
      .send('GET', `${ENDPOINT}/health`)
      .then(response => {
        storage.propertiesHealthLoad(response.data);
        return response.data;
      });
  }

  find(id) {
    return transport
      .send('GET', `${ENDPOINT}/${id}`)
      .then(response => {
        storage.propertiesAdd(response.data);
        return response;
      });
  }

  create(attrs) {
    return transport
      .send('POST', ENDPOINT, {property: attrs})
      .then(response => {
        storage.properiesAdd(response.data);
        return response;
      });
  }

  update(attrs) {
    return transport
      .send('PUT', `${ENDPOINT}/${attrs.id}`, {property: attrs})
      .then(response => {
        storage.properiesAdd(response.data);
        return response;
      });
  }
}
