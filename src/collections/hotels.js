export default class Hotels {
  constructor(container) {
    this.settings = container.settings;
    this.transport = container.transport;
    this.endpoint = 'hotels';
  }

  list() {
    return this.transport
      .send('GET', this.endpoint, {})
      .then(response => response.data);
  }

  find(id) {
    return this.transport
      .send('GET', `${this.endpoint}/${id}`)
      .then(response => response);
  }

  create(attrs) {
    return this.transport
      .send('POST', this.endpoint)
      .then(response => response);
  }
}
