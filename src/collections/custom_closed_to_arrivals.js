import handleError from '../utils/handle_error';

let transport;
let storage;

const ENDPOINT = 'custom_closed_to_arrival';

export default class CustomClosedToArrivals {
  constructor(container) {
    transport = container.transport;
    storage = container.storage;
  }

  list(filters = {}) {
    return transport
      .send('GET', ENDPOINT, {filter: filters})
      .then(response => response)
      .catch((error) => handleError(error, storage, transport));
  }

  create(attrs) {
    return transport
      .send('POST', ENDPOINT, {value: attrs})
      .then(response => response)
      .catch((error) => handleError(error, storage, transport));
  }

  remove(filters = {}) {
    return transport
      .send('DELETE', ENDPOINT, {filter: filters})
      .then(response => response)
      .catch((error) => handleError(error, storage, transport));
  }
}
