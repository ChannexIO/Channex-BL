import Properties from './properties';
import handleError from '../utils/handle_error';

let transport;
let storage;

const ENDPOINT = 'groups';

export default class Groups {
  constructor(container) {
    transport = container.transport;
    storage = container.storage;
  }

  list(filters = {}) {
    return transport
      .send('GET', ENDPOINT, {filter: filters})
      .then(response => {
        storage.groupsLoad(response.data);
        return response.data;
      })
      .catch((error) => handleError(error, storage, transport));
  }

  find(id) {
    return transport
      .send('GET', `${ENDPOINT}/${id}`)
      .then(response => {
        storage.groupsAdd(response.data);
        return response;
      })
      .catch((error) => handleError(error, storage, transport));
  }

  create(attrs) {
    return transport
      .send('POST', ENDPOINT, {group: attrs})
      .then(response => {
        storage.groupsAdd(response.data);
        return response;
      })
      .catch((error) => handleError(error, storage, transport));
  }

  update(attrs) {
    return transport
      .send('PUT', `${ENDPOINT}/${attrs.id}`, {group: attrs})
      .then(response => {
        storage.groupsAdd(response.data);
        return response;
      })
      .catch((error) => handleError(error, storage, transport));
  }

  remove(attrs) {
    return transport
      .send('DELETE', `${ENDPOINT}/${attrs.id}`)
      .then(response => {
        storage.groupsDrop(attrs);
        return response;
      })
      .catch((error) => handleError(error, storage, transport));
  }

  addProperty(group, property_id) {
    return transport
      .send('POST', `${ENDPOINT}/${group.id}/properties/${property_id}`, {})
      .then(response => {
        Promise.all([
          this.find(group.id),
          (new Properties({transport, storage})).find(property_id)
        ]).then(_ => {
          return response;
        });
      })
      .catch((error) => handleError(error, storage, transport));
  }

  removeProperty(group, property_id) {
    return transport
      .send('DELETE', `${ENDPOINT}/${group.id}/properties/${property_id}`)
      .then(response => {
        Promise.all([
          this.find(group.id),
          (new Properties({transport, storage})).find(property_id)
        ]).then(_ => {
          return response;
        });
      })
      .catch((error) => handleError(error, storage, transport));
  }
}
