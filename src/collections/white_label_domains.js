import handleError from '../utils/handle_error';

let transport;
let storage;
const ENDPOINT = 'wl_domains';

export default class WhiteLabelDomains {
  constructor(container) {
    transport = container.transport;
    storage = container.storage;
  }

  list(filters = {}) {
    return transport
      .send('GET', ENDPOINT, {filter: filters})
      .then(response => {
        storage.whiteLabelDomainsLoad(response.data);
        return response.data;
      })
      .catch((error) => handleError(error, storage, transport));
  }

  find(id) {
    return transport
      .send('GET', `${ENDPOINT}/${id}`)
      .then(response => {
        storage.whiteLabelDomainsAdd(response.data);
        return response;
      })
      .catch((error) => handleError(error, storage, transport));
  }

  create(attrs) {
    return transport
      .send('POST', ENDPOINT, {wl_domain: attrs})
      .then(response => {
        storage.whiteLabelDomainsAdd(response.data);
        return response;
      })
      .catch((error) => handleError(error, storage, transport));
  }

  update(attrs) {
    return transport
      .send('PUT', `${ENDPOINT}/${attrs.id}`, {wl_domain: attrs})
      .then(response => {
        storage.whiteLabelDomainsAdd(response.data);
        return response;
      })
      .catch((error) => handleError(error, storage, transport));
  }
}
