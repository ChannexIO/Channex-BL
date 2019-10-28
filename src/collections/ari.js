import handleError from '../utils/handle_error';

let transport;
let storage;

export default class ARI {
  constructor(container) {
    transport = container.transport;
    storage = container.storage;
  }

  get(filters) {
    return transport
      .send('GET', 'restrictions', {filter: filters})
      .then(response => response)
      .catch((error) => handleError(error, storage, transport));
  }

  availability(filters) {
    return transport
      .send('GET', 'availability', {filter: filters})
      .then(response => response)
      .catch((error) => handleError(error, storage, transport));
  }

  update(attrs) {
    return transport
      .send('POST', 'restrictions', {values: attrs})
      .then(response => {
        return response;
      })
      .catch((error) => handleError(error, storage, transport));
  }

  updateAvailability(attrs) {
    return transport
      .send('POST', 'availability', {values: attrs})
      .then(response => {
        return response;
      })
      .catch((error) => handleError(error, storage, transport));
  }
}
