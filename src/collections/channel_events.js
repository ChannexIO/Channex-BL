import handleError from '../utils/handle_error';

let transport;
let storage;

const ENDPOINT = 'channel_events';

export default class ChannelEvents {
  constructor(container) {
    transport = container.transport;
    storage = container.storage;
  }

  list(filter = {}, pagination = {}, order = {}) {
    return transport
      .send('GET', ENDPOINT, {filter, pagination, order})
      .then(response => {
        storage.channelEventsLoad(response.data, response.meta);
        return response.data;
      })
      .catch((error) => handleError(error, storage, transport));
  }

  find(event_id) {
    return transport
      .send('GET', `${ENDPOINT}/${event_id}`)
      .then(response => {
        return response;
      })
      .catch((error) => handleError(error, storage, transport));
  }

  loadLogs(event_id) {
    return transport
      .send('GET', `${ENDPOINT}/${event_id}/logs`)
      .then(response => {
        return response;
      })
      .catch((error) => handleError(error, storage, transport));
  }

  resolveIssue(event_id, solutions) {
    return transport
      .send('POST', `${ENDPOINT}/${event_id}/resolve`, { solutions })
      .then(response => {
        return response;
      })
      .catch((error) => handleError(error, storage, transport));
  }

  ignoreIssue(event_id) {
    return transport
      .send('GET', `${ENDPOINT}/${event_id}/ignore`)
      .then(response => {
        return response;
      })
      .catch((error) => handleError(error, storage, transport));
  }
}
