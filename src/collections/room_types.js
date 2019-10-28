import handleError from '../utils/handle_error';

let transport;
let storage;

const ENDPOINT = 'room_types';

export default class RoomTypes {
  constructor(container) {
    transport = container.transport;
    storage = container.storage;
  }

  list(filter = {}, pagination = {}, order = {}) {
    return transport
      .send('GET', ENDPOINT, {filter, pagination, order})
      .then(response => {
        storage.roomTypesLoad(response.data, response.meta);
        return {
          entities: response.data.map(el => el.attributes),
          meta: response.meta
        };
      })
      .catch((error) => handleError(error, storage, transport));
  }

  find(id) {
    return transport
      .send('GET', `${ENDPOINT}/${id}`)
      .then(response => {
        storage.roomTypesAdd(response.data);
        return response;
      })
      .catch((error) => handleError(error, storage, transport));
  }

  create(attrs) {
    return transport
      .send('POST', ENDPOINT, {room_type: attrs})
      .then(response => {
        storage.roomTypesAdd(response.data);
        return response;
      })
      .catch((error) => handleError(error, storage, transport));
  }

  update(attrs) {
    return transport
      .send('PUT', `${ENDPOINT}/${attrs.id}`, {room_type: attrs})
      .then(response => {
        storage.roomTypesAdd(response.data);
        return response;
      })
      .catch((error) => handleError(error, storage, transport));
  }

  remove(attrs) {
    return transport
      .send('DELETE', `${ENDPOINT}/${attrs.id}`)
      .then(response => {
        storage.roomTypesDrop(attrs);
        return response;
      })
      .catch((error) => handleError(error, storage, transport));
  }
}
