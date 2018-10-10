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

    this.Auth = new Collections.Auth(this);
    this.Hotels = new Collections.Hotels(this);
    this.RoomTypes = new Collections.RoomTypes(this);
    this.RatePlans = new Collections.RatePlans(this);
    this.Channels = new Collections.Channels(this);
    this.EmailTemplates = new Collections.EmailTemplates(this);
    this.Users = new Collections.Users(this);
    this.WhiteLabelPartners = new Collections.WhiteLabelPartners(this);
    this.WhiteLabelDomains = new Collections.WhiteLabelDomains(this);
    this.WhiteLabelEmailSettings = new Collections.WhiteLabelEmailSettings(this);
  }
}
