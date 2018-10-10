import Collections from './collections';
import HTTPTransport from './transport/http';
import Storage from './storage';

const defaultOptions = {
  protocol: 'http',
  server: 'localhost:4000'
};

function connectCollections(target) {
  Object.values(Collections)
    .forEach(function (Module) {
      target[Module.name] = new Module(target);
    });
}

export default class ChannexBL {
  constructor(opts = {}) {
    this.settings = Object.assign(defaultOptions, opts);
    this.storage = Storage({});
    this.transport = new HTTPTransport(this.settings);
    connectCollections(this);
  }
}
