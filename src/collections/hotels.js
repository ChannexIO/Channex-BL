export default class Hotels {
  constructor(container) {
    this.settings = container.settings;
    this.transport = container.transport;
    this.endpoint = 'hotels';
  }

  list() {
    return this.transport
      .send('GET', this.endpoint, {})
      .then(response => response.data)
      .catch(error => error);
  }

  find(id) {
    return this.transport
      .send('GET', `${this.endpoint}/${id}`)
      .then(response => response)
      .catch(error => error);
  }

  create(attrs) {
    return this.transport
      .send('POST', this.endpoint)
      .then(response => response)
      .catch(error => error);
  }
}
