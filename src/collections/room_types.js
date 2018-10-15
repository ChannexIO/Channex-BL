let transport;
let storage;
const ENDPOINT = 'room_types';

export default class RoomTypes {
  constructor(container) {
    transport = container.transport;
    storage = container.storage;
  }

  list(filters = {}) {
    return transport
      .send('GET', ENDPOINT, {filter: filters})
      .then(response => {
        storage.roomTypesLoad(response.data);
        return response.data;
      });
  }

  find(id) {
    return transport
      .send('GET', `${ENDPOINT}/${id}`)
      .then(response => {
        storage.roomTypesAdd(response.data);
        return response;
      });
  }

  create(attrs) {
    return transport
      .send('POST', ENDPOINT, {room_type: attrs})
      .then(response => {
        storage.roomTypesAdd(response.data);
        return response;
      });
  }

  update(attrs) {
    return transport
      .send('PUT', ENDPOINT, {room_type: attrs})
      .then(response => {
        storage.roomTypesAdd(response.data);
        return response;
      });
  }
}
