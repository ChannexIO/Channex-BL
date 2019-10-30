import handleError from '../utils/handle_error';

let transport;
let storage;

const ENDPOINT = 'bookings';

export default class Bookigns {
  constructor(container) {
    transport = container.transport;
    storage = container.storage;
  }

  list(filter = {}, pagination = {page: 1, limit: 10}, order = {inserted_at: 'desc'}) {
    return transport
      .send('GET', `${ENDPOINT}`, {filter, pagination, order})
      .then(response => {
        storage.bookingsLoad(response.data, response.meta);
        return response.data;
      })
      .catch((error) => handleError(error, storage, transport));
  }

  find(id) {
    return transport
      .send('GET', `${ENDPOINT}/${id}`)
      .then(response => {
        storage.bookingsAdd(response.data);
        return response;
      })
      .catch((error) => handleError(error, storage, transport));
  }
}
