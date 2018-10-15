let transport;
const ENDPOINT = 'custom_availability_offset';

export default class CustomAvailabilityOffsets {
  constructor(container) {
    transport = container.transport;
  }

  list(filters = {}) {
    return transport
      .send('GET', ENDPOINT, {filter: filters})
      .then(response => response);
  }

  create(attrs) {
    return transport
      .send('POST', ENDPOINT, {value: attrs})
      .then(response => response);
  }

  remove(filters = {}) {
    return transport
      .send('DELETE', ENDPOINT, {filter: filters})
      .then(response => response);
  }
}
