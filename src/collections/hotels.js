let transport;
let storage;
const ENDPOINT = 'hotels';

export default class Hotels {
  constructor(container) {
    transport = container.transport;
    storage = container.storage;
  }

  list(filters = {}) {
    return transport
      .send('GET', ENDPOINT, {filter: filters})
      .then(response => {
        storage.hotelsLoad(response.data);
        return response.data;
      });
  }

  stats() {
    return transport
      .send('GET', `${ENDPOINT}/stats`)
      .then(response => {
        storage.hotelsStatsLoad(response.data);
        return response.data;
      });
  }

  find(id) {
    return transport
      .send('GET', `${ENDPOINT}/${id}`)
      .then(response => {
        storage.hotelsAdd(response.data);
        return response;
      });
  }

  create(attrs) {
    return transport
      .send('POST', ENDPOINT, {hotel: attrs})
      .then(response => {
        storage.hotelsAdd(response.data);
        return response;
      });
  }

  update(attrs) {
    return transport
      .send('PUT', `${ENDPOINT}/${attrs.id}`, {hotel: attrs})
      .then(response => {
        storage.hotelsAdd(response.data);
        return response;
      });
  }
}
