import extractRelationships from '../utils/relationships_extractor';

let transport;
const ENDPOINT = 'group_users';

export default class GroupUsers {
  constructor(container) {
    transport = container.transport;
  }

  list(filters = {}) {
    return transport
      .send('GET', ENDPOINT, { filter: filters })
      .then(response => (extractRelationships(response.data)));
  }

  find(id) {
    return transport
      .send('GET', `${ENDPOINT}/${id}`)
      .then(response => (extractRelationships(response.data)));
  }

  invite(attrs) {
    return transport
      .send('POST', ENDPOINT, { invite: attrs })
      .then(response => (extractRelationships(response.data)));
  }

  update(attrs) {
    return transport
      .send('PUT', `${ENDPOINT}/${attrs.id}`, { group_user: attrs })
      .then(response => (extractRelationships(response.data)));
  }

  revokeAccess(id) {
    return transport
      .send('DELETE', `${ENDPOINT}/${id}`)
      .then(response => (response));
  }
}
