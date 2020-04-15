import handleError from '../utils/handle_error';
import attributesExtractor from '../utils/attributes_extractor';

let transport;
let storage;
const ENDPOINT = 'cancellation_policies';

export default class CancellationPolicies {
  constructor(container) {
    transport = container.transport;
    storage = container.storage;
  }

  list(filter = {}, pagination = {page: 1, limit: 10}, order = {inserted_at: 'desc'}) {
    return transport
      .send('GET', ENDPOINT, { filter, pagination, order })
      .then(response => {
        storage.cancellationPoliciesLoad(response.data, response.meta);
        return {
          entities: response.data.map(el => el.attributes),
          meta: response.meta
        };
      });
  }

  options(filter = {}) {
    return transport
      .send('GET', `${ENDPOINT}/options`, { filter })
      .then(({ data }) => {
        return attributesExtractor(data);
      })
      .catch((error) => handleError(error, storage, transport));
  }

  find(id) {
    return transport
      .send('GET', `${ENDPOINT}/${id}`)
      .then(response => {
        storage.cancellationPoliciesAdd(response.data);
        return response;
      });
  }

  create(attrs) {
    return transport
      .send('POST', ENDPOINT, { cancellation_policy: attrs })
      .then(response => {
        storage.cancellationPoliciesAdd(response.data);
        return response;
      });
  }

  update(attrs) {
    return transport
      .send('PUT', `${ENDPOINT}/${attrs.id}`, { cancellation_policy: attrs })
      .then(response => {
        storage.cancellationPoliciesAdd(response.data);
        return response;
      });
  }

  remove(attrs) {
    return transport
      .send('DELETE', `${ENDPOINT}/${attrs.id}`)
      .then(response => {
        storage.cancellationPoliciesDrop(attrs);
        return response;
      });
  }
}
