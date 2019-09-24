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

  list(filters = {}) {
    return transport
      .send('GET', ENDPOINT, {filter: filters})
      .then(response => {
        storage.channelsLoad(response.data);
        return response.data;
      })
      .catch((error) => handleError(error, storage, transport));
  }

  health() {
    return transport
      .send('GET', `${ENDPOINT}/health`)
      .then(response => {
        storage.channelsHealthLoad(response.data);
        return response.data;
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
    const PRICING_PLAN = 10;
    const RESTRICTION_PLAN = 10;
    const ROOM = 10;

    return Promise.resolve({
      data: {
        pricing_plan_id_dictionary: [...Array(PRICING_PLAN)].map((_, i) => ({
          id: i,
          title: `pricing_plan_id_${i}`
        })),
        restriction_plan_id_dictionary: [...Array(RESTRICTION_PLAN)].map((_, i) => ({
          id: i,
          title: `restriction_plan_id_${i}`,
        })),
        room_id_dictionary: [...Array(ROOM)].map((_, i) => ({
          id: i,
          title: `room_id_${i}`
        })),
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
    return Promise.resolve({
      data: {
        success: true
      }
    });

    return transport
      .send('POST', `${ENDPOINT}/test_connection`, attrs)
      .then(response => {
        return response;
      })
      .catch((error) => handleError(error, storage, transport));
  }
}
