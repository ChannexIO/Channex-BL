import Groups from './groups';
let transport;
let storage;
const ENDPOINT = 'properties';

export default class Properties {
  constructor(container) {
    transport = container.transport;
    storage = container.storage;
  }

  list(filter = {}, pagination = {}, order = {}) {
    return transport
      .send('GET', ENDPOINT, {filter, pagination, order})
      .then(response => {
        storage.propertiesLoad(response.data);
        return response.data;
      });
  }

  health(filter = {}, pagination = {}, order = {}) {
    return transport
      .send('GET', `${ENDPOINT}/health`, {filter, pagination, order})
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
        storage.propertiesAdd(response.data);

        if (response.data.relationships && response.data.relationships.groups) {
          response.data.relationships.groups.data.forEach(group => {
            (new Groups({transport, storage})).find(group.id);
          });
        }

        return response;
      });
  }

  update(attrs) {
    return transport
      .send('PUT', `${ENDPOINT}/${attrs.id}`, {property: attrs})
      .then(response => {
        storage.propertiesAdd(response.data);
        return response;
      });
  }
}
