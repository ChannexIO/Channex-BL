export default class RoomTypes {
  constructor(container) {
    this.settings = container.settings;
    this.transport = container.transport;
    this.endpoint = 'room_types';
  }

  list(filters = {}) {
    return this.transport
      .send('GET', this.endpoint, filters)
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
      .send('POST', this.endpoint, {room_type: attrs})
      .then(response => response)
      .catch(error => error);
  }

  update(attrs) {
    return this.transport
      .send('PUT', this.endpoint, {room_type: attrs})
      .then(response => response)
      .catch(error => error);
  }
}
