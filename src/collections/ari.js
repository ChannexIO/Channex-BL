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
}
