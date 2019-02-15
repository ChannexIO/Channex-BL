let transport;
let storage;
const ENDPOINT = 'groups';

export default class Groups {
  constructor(container) {
    transport = container.transport;
    storage = container.storage;
  }

  list(filters = {}) {
    return transport
      .send('GET', ENDPOINT, {filter: filters})
      .then(response => {
        storage.groupsLoad(response.data);
        return response.data;
      });
  }

  find(id) {
    return transport
      .send('GET', `${ENDPOINT}/${id}`)
      .then(response => {
        storage.groupsAdd(response.data);
        return response;
      });
  }

  create(attrs) {
    return transport
      .send('POST', ENDPOINT, {group: attrs})
      .then(response => {
        storage.groupsAdd(response.data);
        return response;
      });
  }

  update(attrs) {
    return transport
      .send('PUT', `${ENDPOINT}/${attrs.id}`, {group: attrs})
      .then(response => {
        storage.groupsAdd(response.data);
        return response;
      });
  }

  remove(attrs) {
    return transport
      .send('DELETE', `${ENDPOINT}/${attrs.id}`)
      .then(response => {
        storage.groupsDrop(attrs);
        return response;
      });
  }

  addHotel(group, hotel_id) {
    return transport
      .send('POST', `${ENDPOINT}/${group.id}/add_hotel/${hotel_id}`, {})
      .then(response => {
        storage.groupsAdd(response.data.group);
        storage.hotelsAdd(response.data.hotel);
        return response;
      });
  }

  removeHotel(group, hotel_id) {
    return transport
      .send('DELETE', `${ENDPOINT}/${group.id}/add_hotel/${hotel_id}`)
      .then(response => {
        storage.groupsAdd(response.data.group);
        storage.hotelsAdd(response.data.hotel);
        return response;
      });
  }
}
