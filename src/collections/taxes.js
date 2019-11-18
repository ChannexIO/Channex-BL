let transport;
let storage;

const ENDPOINT = 'taxes';

export default class Taxes {
  constructor(container) {
    transport = container.transport;
    storage = container.storage;
  }

  list(filter = {}, pagination = {page: 1, limit: 10}, order = {inserted_at: 'desc'}) {
    return transport
      .send('GET', ENDPOINT, { filter, pagination, order })
      .then(response => {
        storage.taxesLoad(response.data, response.meta);
        return {
          entities: response.data.map(el => el.attributes),
          meta: response.meta
        };
      });
  }

  find(id) {
    return transport
      .send('GET', `${ENDPOINT}/${id}`)
      .then(({data}) => {
        const { attributes } = data;

        storage.taxesAdd(data);
        return attributes;
      });
  }

  create(attrs) {
    return transport
      .send('POST', ENDPOINT, { tax: attrs })
      .then(({data}) => {
        const { attributes } = data;

        storage.taxesAdd(data);
        return attributes;
      });
  }

  update(attrs) {
    return transport
      .send('PUT', `${ENDPOINT}/${attrs.id}`, { tax: attrs })
      .then(({data}) => {
        const { attributes } = data;

        storage.taxesAdd(data);
        return attributes;
      });
  }

  remove(attrs) {
    return transport
      .send('DELETE', `${ENDPOINT}/${attrs.id}`)
      .then(response => {
        storage.taxesDrop(attrs);
        return response;
      });
  }
}
