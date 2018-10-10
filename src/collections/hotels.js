export default class Hotels {
  constructor(container) {
    this.settings = container.settings;
    this.transport = container.transport;
    this.storage = container.storage;
    this.endpoint = 'hotels';
  }

  list(filters = {}) {
    return this.transport
      .send('GET', this.endpoint, {filter: filters})
      .then(response => {
        this.storage.hotelsLoad(response.data);
        return response.data;
      });
  }

  find(id) {
    return this.transport
      .send('GET', `${this.endpoint}/${id}`)
      .then(response => {
        this.storage.hotelsAdd(response.data);
        return response;
      });
  }

  create(attrs) {
    return this.transport
      .send('POST', this.endpoint)
      .then(response => {
        this.storage.hotelsAdd(response.data);
        return response;
      });
  }
}
