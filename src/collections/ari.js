let transport;

export default class ARI {
  constructor(container) {
    transport = container.transport;
  }

  get(filters) {
    return transport
      .send('GET', 'restrictions', {filter: filters})
      .then(response => response);
  }

  availability(filters) {
    return transport
      .send('GET', 'availability', {filter: filters})
      .then(response => response);
  }

  update(attrs) {
    return transport
      .send('POST', 'restrictions', {values: attrs})
      .then(response => {
        return response;
      });
  }

  updateAvailability(attrs) {
    return transport
      .send('POST', 'availability', {values: attrs})
      .then(response => {
        return response;
      });
  }
}
