import handleError from '../utils/handle_error';

let transport;
let storage;

const ENDPOINT = 'geocoding';

export default class Geocoding {
  constructor(container) {
    transport = container.transport;
    storage = container.storage;
  }

  getByAddress(address = '') {
    return transport
      .send('GET', ENDPOINT, { address })
      .then(response => response.data)
      .catch((error) => handleError(error, storage, transport));
  }

  getByLocation(params = {}) {
    const { lat, lon } = params;
    const location = `${lat}:${lon}`;

    return transport
      .send('GET', ENDPOINT, { location })
      .then(response => response.data)
      .catch((error) => handleError(error, storage, transport));
  }
}
