let transport;
let storage;
const ENDPOINT = 'channels';

export default class Channels {
  constructor(container) {
    transport = container.transport;
    storage = container.storage;
  }

  list(filters = {}) {
    return transport
      .send('GET', ENDPOINT, {filter: filters})
      .then(response => {
        storage.channelsLoad(response.data);
        return response.data;
      });
  }

  health() {
    return transport
      .send('GET', `${ENDPOINT}/health`)
      .then(response => {
        storage.channelsHealthLoad(response.data);
        return response.data;
      });
  }

  actions(filter = {}, pagination = {}, order = {}) {
    return transport
      .send('GET', `${ENDPOINT}/actions`, {filter, pagination, order})
      .then(response => {
        storage.channelActionsLoad(response.data, response.meta);
        return response.data;
      });
  }

  find(id) {
    return transport
      .send('GET', `${ENDPOINT}/${id}`)
      .then(response => {
        storage.channelsAdd(response.data);
        return response;
      });
  }

  create(attrs) {
    return transport
      .send('POST', ENDPOINT, {channel: attrs})
      .then(response => {
        storage.channelsAdd(response.data);
        return response;
      });
  }

  update(attrs) {
    return transport
      .send('PUT', `${ENDPOINT}/${attrs.id}`, {channel: attrs})
      .then(response => {
        storage.channelsAdd(response.data);
        return response;
      });
  }

  remove(attrs) {
    return transport
      .send('DELETE', `${ENDPOINT}/${attrs.id}`)
      .then(response => {
        storage.channelsDrop(attrs);
        return response;
      });
  }

  available_to_connect() {
    return transport
      .send('GET', `${ENDPOINT}/list`)
      .then(response => {
        return response;
      });
  }
}
