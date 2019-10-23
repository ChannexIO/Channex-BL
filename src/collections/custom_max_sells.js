import handleError from '../utils/handle_error';

let transport;
const ENDPOINT = 'custom_max_sell';

export default class CustomMaxSells {
  constructor(container) {
    transport = container.transport;
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
