export default class CustomAvailabilityOffsets {
  constructor(container) {
    this.settings = container.settings;
    this.transport = container.transport;
    this.storage = container.storage;
    this.endpoint = 'custom_availability_offset';
  }

  list(filters = {}) {
    return this.transport
      .send('GET', this.endpoint, {filter: filters})
      .then(response => response);
  }

  create(attrs) {
    return this.transport
      .send('POST', this.endpoint, {value: attrs})
      .then(response => response);
  }

  remove(filters = {}) {
    return this.transport
      .send('DELETE', this.endpoint, {filter: filters})
      .then(response => response);
  }
}
