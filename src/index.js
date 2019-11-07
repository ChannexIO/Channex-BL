import Collections from './collections';
import {HTTPTransport, WSTransport} from './transport';
import Storage from './storage';

const defaultOptions = {
  protocol: 'http',
  secure: true,
  server: 'staging.channex.io'
};

let instance = null;

function getToken(storage) {
  return storage.session ? storage.session.token : null;
}

class ChannexBL {
  constructor(opts = {}) {
    if (!instance) {
      this.storage = Storage({});
      this.settings = Object.assign(defaultOptions, opts);

      // Register transport methods
      this.http = new HTTPTransport(this.settings, getToken(this.storage.getState()));
      this.ws = new WSTransport(this.settings, getToken(this.storage.getState()));
      this.transport = this.http;
      const Raw = new Collections.Raw(this);

      this.Auth = new Collections.Auth(this);
      this.Properties = new Collections.Properties(this);
      this.Groups = new Collections.Groups(this);
      this.RoomTypes = new Collections.RoomTypes(this);
      this.RatePlans = new Collections.RatePlans(this);
      this.RateCategories = new Collections.RateCategories(this);
      this.Channels = new Collections.Channels(this);
      this.ChannelEvents = new Collections.ChannelEvents(this);
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
      this.Tasks = new Collections.Tasks(this);
      this.Bookings = new Collections.Bookings(this);
      this.Issues = new Collections.Issues(this);
      this.PropertyUsers = new Collections.PropertyUsers(this);
      this.GroupUsers = new Collections.GroupUsers(this);
      this.HotelPolicies = new Collections.HotelPolicies(this);
      this.CancellationPolicies = new Collections.CancellationPolicies(this);

      this.subscribe = this.ws.subscribe;
      this.publish = this.ws.publish;
      this.query = Raw.query;

      instance = this;
    } else {
      return instance;
    }
  }
}

export default new ChannexBL(window.channexSettings || {});
