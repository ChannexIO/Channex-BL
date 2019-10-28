import extractRelationships from '../utils/relationships_extractor';
import handleError from '../utils/handle_error';

let transport;
let storage;

const ENDPOINT = 'property_users';

export default class PropertyUsers {
  constructor(container) {
    transport = container.transport;
    storage = container.storage;
  }

  list(filters = {}) {
    return transport
      .send('GET', ENDPOINT, { filter: filters })
      .then(response => (extractRelationships(response.data)))
      .catch((error) => handleError(error, storage, transport));
  }

  find(id) {
    return transport
      .send('GET', `${ENDPOINT}/${id}`)
      .then(response => (extractRelationships(response.data)))
      .catch((error) => handleError(error, storage, transport));
  }

  invite(attrs) {
    return transport
      .send('POST', ENDPOINT, { invite: attrs })
      .then(response => (extractRelationships(response.data)))
      .catch((error) => handleError(error, storage, transport));
  }

  update(attrs) {
    return transport
      .send('PUT', `${ENDPOINT}/${attrs.id}`, { property_user: attrs })
      .then(response => (extractRelationships(response.data)))
      .catch((error) => handleError(error, storage, transport));
  }

  revokeAccess(id) {
    return transport
      .send('DELETE', `${ENDPOINT}/${id}`)
      .then(response => (response))
      .catch((error) => handleError(error, storage, transport));
  }
}
