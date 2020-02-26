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
        return response;
      })
      .catch((error) => handleError(error, storage, transport));
  }

  get_mapping_details(attrs) {
    return Promise.resolve({
      "data": {
        "pricing_type": "Standard",
        "rooms": [{
          "id": 586818903,
          "max_children": 0,
          "rates": [{
            "id": 16385048,
            "max_persons": 2,
            "price_1": true,
            "title": "non-refundable rate"
          }, {
            "id": 16385046,
            "max_persons": 2,
            "price_1": true,
            "title": "standard rate"
          }, {
            "id": 16385047,
            "max_persons": 2,
            "price_1": true,
            "title": "special rate"
          }],
          "title": "Double Room"
        }, {
          "id": 586818902,
          "max_children": 0,
          "rates": [{
            "id": 16385046,
            "max_persons": 1,
            "price_1": false,
            "title": "standard rate"
          }, {
            "id": 16385048,
            "max_persons": 1,
            "price_1": false,
            "title": "non-refundable rate"
          }, {
            "id": 16385047,
            "max_persons": 1,
            "price_1": false,
            "title": "special rate"
          }],
          "title": "Single Room"
        }, {
          "id": 586818904,
          "max_children": 0,
          "rates": [{
            "id": 16385047,
            "max_persons": 3,
            "price_1": true,
            "title": "special rate"
          }, {
            "id": 16385048,
            "max_persons": 3,
            "price_1": true,
            "title": "non-refundable rate"
          }, {
            "id": 16385046,
            "max_persons": 3,
            "price_1": true,
            "title": "standard rate"
          }],
          "title": "Suite"
        }]
      }
    });

    return Promise.resolve({"data": {
      // "pricing_type": "Standard | OBP | Derived",
      "pricing_type": "standard",
      "rooms": [
        {
          "id": "586818904",
          "title": "Suite",
          "rates": [
            {
              "id": "16385047",
              "title": "special rate",
              "max_persons": "3",
              "price_1": false
            },
          ]
        }, {
          "id": "586818905",
          "title": "Lux",
          "rates": [
            {
              "id": "16385047",
              "title": "standard rate",
              "max_persons": "3",
              "price_1": true
            }
          ]
        }
      ]
    }});

    return transport
      .send('POST', `${ENDPOINT}/mapping_details`, attrs)
      .then(response => {
        return response;
      })
      .catch((error) => handleError(error, storage, transport));
  }

  test_connection(attrs) {
    // return Promise.resolve({
    //   data: {
    //     success: true,
    //     errors: 0,
    //   }
    // });

    return transport
      .send('POST', `${ENDPOINT}/test_connection`, attrs)
      .then(response => {
        return response;
      })
      .catch((error) => handleError(error, storage, transport));
  }
}
