import Collections from './collections';
import HTTPTransport from './transport/http';
import Storage from './storage';

const defaultOptions = {
  protocol: 'http',
  server: 'localhost:4000'
};

export default class ChannexBL {
  constructor(opts = {}) {
    this.settings = Object.assign(defaultOptions, opts);
    this.storage = Storage({});
    this.transport = new HTTPTransport(this.settings);
    this.connectCollections();
  }

  connectCollections() {
    const self = this;

    Object.values(Collections)
      .forEach(function (Module) {
        self[Module.name] = new Module(self);
      });
  }
}
