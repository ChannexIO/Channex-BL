import handleError from '../utils/handle_error';

let transport;
let storage;
const ENDPOINT = 'rate_plans';

export default class RatePlans {
  constructor(container) {
    transport = container.transport;
    storage = container.storage;
  }

  list(filter = {}) {
    return transport
      .send('GET', ENDPOINT, {filter})
      .then(response => {
        storage.ratePlansLoad(response.data);
        return response.data;
      })
      .catch((error) => handleError(error, storage, transport));
  }

  find(id) {
    return transport
      .send('GET', `${ENDPOINT}/${id}`)
      .then(response => {
        storage.ratePlansAdd(response.data);
        return response;
      })
      .catch((error) => handleError(error, storage, transport));
  }

  create(attrs) {
    return transport
      .send('POST', ENDPOINT, {rate_plan: attrs})
      .then(response => {
        storage.ratePlansAdd(response.data);
        return response;
      })
      .catch((error) => handleError(error, storage, transport));
  }

  update(attrs) {
    return transport
      .send('PUT', `${ENDPOINT}/${attrs.id}`, {rate_plan: attrs})
      .then(response => {
        storage.ratePlansAdd(response.data);
        return response;
      })
      .catch((error) => handleError(error, storage, transport));
  }

  remove(attrs) {
    return transport
      .send('DELETE', `${ENDPOINT}/${attrs.id}`)
      .then(response => {
        storage.ratePlansDrop(attrs);
        return response;
      })
      .catch((error) => handleError(error, storage, transport));
  }
}
