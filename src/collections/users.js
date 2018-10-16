let transport;
let storage;
const ENDPOINT = 'users';

export default class Users {
  constructor(container) {
    transport = container.transport;
    storage = container.storage;
  }

  list(filters = {}) {
    return transport
      .send('GET', ENDPOINT, {filter: filters})
      .then(response => {
        storage.usersLoad(response.data);
        return response.data;
      });
  }

  find(id) {
    return transport
      .send('GET', `${ENDPOINT}/${id}`)
      .then(response => {
        storage.usersAdd(response.data);
        return response;
      });
  }

  create(attrs) {
    return transport
      .send('POST', ENDPOINT, {user: attrs})
      .then(response => {
        storage.usersAdd(response.data);
        return response;
      });
  }

  update(attrs) {
    return transport
      .send('PUT', ENDPOINT, {user: attrs})
      .then(response => {
        storage.usersAdd(response.data);
        return response;
      });
  }
}
