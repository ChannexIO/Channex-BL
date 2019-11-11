let transport;
let storage;

const ENDPOINT = 'tax_sets';

export default class TaxSets {
  constructor(container) {
    transport = container.transport;
    storage = container.storage;
  }

  list(filter = {}, pagination = {page: 1, limit: 10}, order = {inserted_at: 'desc'}) {
    return transport
      .send('GET', ENDPOINT, { filter, pagination, order })
      .then(response => {
        storage.taxSetsLoad(response.data, response.meta);
        return {
          entities: response.data.map(el => el.attributes),
          meta: response.meta
        };
      });
  }

  find(id) {
    return transport
      .send('GET', `${ENDPOINT}/${id}`)
      .then(response => {
        storage.taxSetsAdd(response.data);
        return response;
      });
  }

  create(attrs) {
    return transport
      .send('POST', ENDPOINT, { tax_set: attrs })
      .then(response => {
        storage.taxSetsAdd(response.data);
        return response;
      });
  }

  update(attrs) {
    return transport
      .send('PUT', `${ENDPOINT}/${attrs.id}`, { tax_set: attrs })
      .then(response => {
        storage.taxSetsAdd(response.data);
        return response;
      });
  }

  remove(attrs) {
    return transport
      .send('DELETE', `${ENDPOINT}/${attrs.id}`)
      .then(response => {
        storage.taxSetsDrop(attrs);
        return response;
      });
  }
}
