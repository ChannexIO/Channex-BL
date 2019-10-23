import handleError from '../utils/handle_error';

let transport;
let storage;
const ENDPOINT = 'tasks';

export default class Tasks {
  constructor(container) {
    transport = container.transport;
    storage = container.storage;
  }

  list(filter = {}, pagination = {}, order = {}) {
    return transport
      .send('GET', ENDPOINT, {filter, pagination, order})
      .then(response => {
        storage.tasksLoad(response.data, response.meta);
        return response.data;
      })
      .catch((error) => handleError(error, storage, transport));
  }

  find(id) {
    return transport
      .send('GET', `${ENDPOINT}/${id}`)
      .then(response => {
        return response;
      })
      .catch((error) => handleError(error, storage, transport));
  }
}
