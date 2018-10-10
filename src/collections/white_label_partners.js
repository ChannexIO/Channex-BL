export default class WhiteLabelPartners {
  constructor(container) {
    this.settings = container.settings;
    this.transport = container.transport;
    this.storage = container.storage;
    this.endpoint = 'wl_partners';
  }

  list(filters = {}) {
    return this.transport
      .send('GET', this.endpoint, {filter: filters})
      .then(response => {
        this.storage.whiteLabelPartnersLoad(response.data);
        return response.data;
      });
  }

  find(id) {
    return this.transport
      .send('GET', `${this.endpoint}/${id}`)
      .then(response => {
        this.storage.whiteLabelPartnersAdd(response.data);
        return response;
      });
  }

  create(attrs) {
    return this.transport
      .send('POST', this.endpoint, {room_type: attrs})
      .then(response => {
        this.storage.whiteLabelPartnersAdd(response.data);
        return response;
      });
  }

  update(attrs) {
    return this.transport
      .send('PUT', this.endpoint, {room_type: attrs})
      .then(response => {
        this.storage.whiteLabelPartnersAdd(response.data);
        return response;
      });
  }
}
