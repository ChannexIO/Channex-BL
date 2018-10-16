let transport;
let storage;
const ENDPOINT = 'wl_partners';

export default class WhiteLabelPartners {
  constructor(container) {
    transport = container.transport;
    storage = container.storage;
  }

  list(filters = {}) {
    return transport
      .send('GET', ENDPOINT, {filter: filters})
      .then(response => {
        storage.whiteLabelPartnersLoad(response.data);
        return response.data;
      });
  }

  find(id) {
    return transport
      .send('GET', `${ENDPOINT}/${id}`)
      .then(response => {
        storage.whiteLabelPartnersAdd(response.data);
        return response;
      });
  }

  create(attrs) {
    return transport
      .send('POST', ENDPOINT, {wl_partner: attrs})
      .then(response => {
        storage.whiteLabelPartnersAdd(response.data);
        return response;
      });
  }

  update(attrs) {
    return transport
      .send('PUT', ENDPOINT, {wl_partner: attrs})
      .then(response => {
        storage.whiteLabelPartnersAdd(response.data);
        return response;
      });
  }
}
