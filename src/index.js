import Collections from './collections';
import HTTPTransport from './transport/http';
import Storage from './storage';

const defaultOptions = {
  protocol: 'http',
  server: 'localhost:4000'
};

export default class ChannexBL {
  constructor(opts = {}) {
    this.storage = Storage({});
    this.settings = Object.assign(defaultOptions, opts);
    this.transport = new HTTPTransport(
      this.settings,
      this.storage.getState().session.token
    );

    this.Auth = new Collections.Auth(this);
    this.Hotels = new Collections.Hotels(this);
    this.RoomTypes = new Collections.RoomTypes(this);
    this.RatePlans = new Collections.RatePlans(this);
    this.Channels = new Collections.Channels(this);
    this.ARI = new Collections.ARI(this);
    this.CustomRates = new Collections.CustomRates(this);
    this.CustomMinStayArrivals = new Collections.CustomMinStayArrivals(this);
    this.CustomMinStayThroughs = new Collections.CustomMinStayThroughs(this);
    this.CustomMaxStays = new Collections.CustomMaxStays(this);
    this.CustomClosedToArrivals = new Collections.CustomClosedToArrivals(this);
    this.CustomClosedToDepartures = new Collections.CustomClosedToDepartures(this);
    this.CustomStopSells = new Collections.CustomStopSells(this);
    this.CustomMaxSells = new Collections.CustomMaxSells(this);
    this.CustomAvailabilityOffsets = new Collections.CustomAvailabilityOffsets(this);
    this.CustomMaxAvailabilities = new Collections.CustomMaxAvailabilities(this);
    this.CustomDerivedOptions = new Collections.CustomDerivedOptions(this);
    this.EmailTemplates = new Collections.EmailTemplates(this);
    this.Users = new Collections.Users(this);
    this.WhiteLabelPartners = new Collections.WhiteLabelPartners(this);
    this.WhiteLabelDomains = new Collections.WhiteLabelDomains(this);
    this.WhiteLabelEmailSettings = new Collections.WhiteLabelEmailSettings(this);
  }
}
