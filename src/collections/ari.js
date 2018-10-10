export default class ARI {
  constructor(container) {
    this.settings = container.settings;
    this.transport = container.transport;
    this.storage = container.storage;
  }

  get(filters) {
    return this.transport
      .send('GET', 'restrictions', {filter: filters})
      .then(response => response);
  }
}
