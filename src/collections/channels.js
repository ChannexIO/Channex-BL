import RatePlans from './rate_plans';
import handleError from '../utils/handle_error';

let transport;
let storage;

const ENDPOINT = 'channels';

export default class Channels {
  constructor(container) {
    transport = container.transport;
    storage = container.storage;
  }

  list(filter = {}, pagination = {}, order = {}) {
    return transport
      .send('GET', ENDPOINT, {filter, pagination, order})
      .then(response => {
        storage.channelsLoad(response.data);

        return response;
      })
      .catch((error) => handleError(error, storage, transport));
  }

  health(filter = {}, pagination = {}, order = {}) {
    return transport
      .send('GET', `${ENDPOINT}/health`, {filter, pagination, order})
      .then(response => {
        storage.channelsHealthLoad(response.data, response.meta);
        return response;
      })
      .catch((error) => handleError(error, storage, transport));
  }

  find(id) {
    return transport
      .send('GET', `${ENDPOINT}/${id}`)
      .then(response => {
        storage.channelsAdd(response.data);
        return response;
      })
      .catch((error) => handleError(error, storage, transport));
  }

  create(attrs) {
    return transport
      .send('POST', ENDPOINT, {channel: attrs})
      .then(response => {
        storage.channelsAdd(response.data);

        return response;
      })
      .catch((error) => handleError(error, storage, transport));
  }

  update(attrs) {
    return transport
      .send('PUT', `${ENDPOINT}/${attrs.id}`, {channel: attrs})
      .then(response => {
        storage.channelsAdd(response.data);

        return response;
      })
      .catch((error) => handleError(error, storage, transport));
  }

  full_sync(channel_id) {
    return transport
      .send('POST', `${ENDPOINT}/${channel_id}/full_sync`, {})
      .then(response => {
        return response;
      })
      .catch((error) => handleError(error, storage, transport));
  }

  remove(attrs) {
    return transport
      .send('DELETE', `${ENDPOINT}/${attrs.id}`)
      .then(response => {
        storage.channelsDrop(attrs);

        return response;
      })
      .catch((error) => handleError(error, storage, transport));
  }

  available_to_connect() {
    return transport
      .send('GET', `${ENDPOINT}/list`)
      .then(response => {
        return response;
      })
      .catch((error) => handleError(error, storage, transport));
  }

  get_mapping_details(attrs) {
    return transport
      .send('POST', `${ENDPOINT}/mapping_details`, attrs)
      .then(response => {
        return response;
      })
      .catch((error) => handleError(error, storage, transport));
  }

  test_connection(attrs) {
    return transport
      .send('POST', `${ENDPOINT}/test_connection`, attrs)
      .then(response => {
        return response;
      })
      .catch((error) => handleError(error, storage, transport));
  }
}
