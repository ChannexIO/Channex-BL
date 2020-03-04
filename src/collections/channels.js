import RatePlans from './rate_plans';
import handleError from '../utils/handle_error';

let transport;
let storage;

const ENDPOINT = 'channels';

export default class Channels {
  constructor(container) {
    transport = container.transport;
    storage = container.storage;
  }

  list(filter = {}, pagination = {}, order = {}) {
    return transport
      .send('GET', ENDPOINT, {filter, pagination, order})
      .then(response => {
        // response.data = [{
        //   "attributes":{
        //     "actions":null,
        //     "channel":"Airbnb",
        //     "id":"c8e791ca-64b8-48c8-834e-56e34a1929d5",
        //     "is_active":false,
        //     "properties":["0a6fb8d0-055a-4902-a819-a862bab51725"],
        //     "rate_plans":[],
        //     rate_params: {
        //       room_id: {position: 0, title: "Room", type: "integer"}
        //     },
        //     "settings":{"code":"42hc0n8e4mlp4dui2hh9cqadb","mappingSettings":{}},
        //     "title":"Asadassds"
        //   },
        //   "id":"c8e791ca-64b8-48c8-834e-56e34a1929d5",
        //   "relationships":{
        //     "group":{"data":{"id":"524849e3-2f13-4244-a582-3dace775678b","type":"group"}},
        //     "properties":{"data":[{"id":"0a6fb8d0-055a-4902-a819-a862bab51725","type":"property"}]}
        //   },
        //   "type":"channel"
        // }];
        storage.channelsLoad(response.data);

        return response;
      })
      .catch((error) => handleError(error, storage, transport));
  }

  health(filter = {}, pagination = {}, order = {}) {
    return transport
      .send('GET', `${ENDPOINT}/health`, {filter, pagination, order})
      .then(response => {
        storage.channelsHealthLoad(response.data, response.meta);
        return response;
      })
      .catch((error) => handleError(error, storage, transport));
  }

  find(id) {
    return transport
      .send('GET', `${ENDPOINT}/${id}`)
      .then(response => {
        // response.data = {
        //   "id":"c8e791ca-64b8-48c8-834e-56e34a1929d5",
        //   "attributes":{
        //     "actions":null,
        //     "channel":"Airbnb",
        //     "id":"c8e791ca-64b8-48c8-834e-56e34a1929d5",
        //     "is_active":false,
        //     "properties":["0a6fb8d0-055a-4902-a819-a862bab51725"],
        //     "rate_plans":[],
        //     "settings":{"code":"42hc0n8e4mlp4dui2hh9cqadb","mappingSettings":{}},
        //     rate_params: {
        //       room_id: {position: 0, title: "Room", type: "integer"}
        //     },
        //     "title":"Asadassds"
        //   },
        //   "relationships":{
        //     "group":{"data":{"id":"524849e3-2f13-4244-a582-3dace775678b","type":"group"}},
        //     "properties":{"data":[{"id":"0a6fb8d0-055a-4902-a819-a862bab51725","type":"property"}]}
        //   },
        //   "type":"channel"
        // };
        //
        storage.channelsAdd(response.data);
        return response;
      })
      .catch((error) => handleError(error, storage, transport));
  }

  create(attrs) {
    return transport
      .send('POST', ENDPOINT, {channel: attrs})
      .then(response => {
        storage.channelsAdd(response.data);
        (new RatePlans({transport, storage})).list();
        return response;
      })
      .catch((error) => handleError(error, storage, transport));
  }

  update(attrs) {
    return transport
      .send('PUT', `${ENDPOINT}/${attrs.id}`, {channel: attrs})
      .then(response => {
        storage.channelsAdd(response.data);
        (new RatePlans({transport, storage})).list();
        return response;
      })
      .catch((error) => handleError(error, storage, transport));
  }

  full_sync(channel_id) {
    return transport
      .send('POST', `${ENDPOINT}/${channel_id}/full_sync`, {})
      .then(response => {
        return response;
      })
      .catch((error) => handleError(error, storage, transport));
  }

  remove(attrs) {
    return transport
      .send('DELETE', `${ENDPOINT}/${attrs.id}`)
      .then(response => {
        storage.channelsDrop(attrs);
        (new RatePlans({transport, storage})).list();
        return response;
      })
      .catch((error) => handleError(error, storage, transport));
  }

  available_to_connect() {
    return transport
      .send('GET', `${ENDPOINT}/list`)
      .then(response => {
        response.data[1].rate_params = {
          listing_id: {
            position: 0,
            title: "Listing",
            type: "integer",
          }
        };

        return response;
      })
      .catch((error) => handleError(error, storage, transport));
  }

  get_mapping_details(attrs) {
    console.log("get_mapping_details stub");

    const ROOM = 10;

    return Promise.resolve({
      data: {
        listings: [...Array(ROOM)].map((_, i) => ({
          id: i,
          title: `listing_id_${i}`
        }))
      }
    });

    return transport
      .send('POST', `${ENDPOINT}/mapping_details`, attrs)
      .then(response => {
        return response;
      })
      .catch((error) => handleError(error, storage, transport));
  }

  test_connection(attrs) {
    return transport
      .send('POST', `${ENDPOINT}/test_connection`, attrs)
      .then(response => {
        return response;
      })
      .catch((error) => handleError(error, storage, transport));
  }
}
