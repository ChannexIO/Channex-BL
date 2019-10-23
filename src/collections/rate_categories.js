import handleError from '../utils/handle_error';

let transport;
let storage;
const ENDPOINT = 'rate_categories';

export default class RateCategories {
  constructor(container) {
    transport = container.transport;
    storage = container.storage;
  }

  list(filters = {}) {
    return transport
      .send('GET', ENDPOINT, {filter: filters})
      .then(response => {
        storage.rateCategoriesLoad(response.data);
        return response.data;
      })
      .catch((error) => handleError(error, storage, transport));
  }

  find(id) {
    return transport
      .send('GET', `${ENDPOINT}/${id}`)
      .then(response => {
        storage.rateCategoriesAdd(response.data);
        return response;
      })
      .catch((error) => handleError(error, storage, transport));
  }

  create(attrs) {
    return transport
      .send('POST', ENDPOINT, {rate_category: attrs})
      .then(response => {
        storage.rateCategoriesAdd(response.data);
        return response;
      })
      .catch((error) => handleError(error, storage, transport));
  }

  update(attrs) {
    return transport
      .send('PUT', `${ENDPOINT}/${attrs.id}`, {rate_category: attrs})
      .then(response => {
        storage.rateCategoriesAdd(response.data);
        return response;
      })
      .catch((error) => handleError(error, storage, transport));
  }

  remove(attrs) {
    return transport
      .send('DELETE', `${ENDPOINT}/${attrs.id}`)
      .then(response => {
        storage.rateCategoriesDrop(attrs);
        return response;
      })
      .catch((error) => handleError(error, storage, transport));
  }
}
