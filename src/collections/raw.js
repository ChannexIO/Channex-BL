let transport;

export default class Raw {
  constructor(container) {
    transport = container.transport;
  }

  query(method, endpoint, args) {
    return transport.send(method, endpoint, args);
  }
}
