import handleError from '../utils/handle_error';
import attributesExtractor from '../utils/attributes_extractor';

let transport;
let storage;

const ENDPOINT = 'rate_plans';

export default class RatePlans {
  constructor(container) {
    transport = container.transport;
    storage = container.storage;
  }

  list(filter = {}) {
    return transport
      .send('GET', ENDPOINT, {filter})
      .then(response => {
        storage.ratePlansLoad(response.data);
        return response.data;
      })
      .catch((error) => handleError(error, storage, transport));
  }

  options(filter = {}) {
    return transport
      // .send('GET', `${ENDPOINT}/options`, { filter })
      .send('GET', `${ENDPOINT}`, { filter })
      .then(({ data }) => {
        const stub = {
          "data": [
            {
              "attributes": {
                "id":"ba67042d-cd4a-431e-a8f4-54eb4d01dff4",
                "sell_mode":"per_person",
                "title":"multi occ primary",
                "occupancy": 11,
                "parent_rate_plan_id": null,
                "room_type_id": "4803aecd-a0dc-46de-8788-ca8e774a460f",
                "property_id": "0a6fb8d0-055a-4902-a819-a862bab51725",
              },
              "id":"ba67042d-cd4a-431e-a8f4-54eb4d01dff4",
              "type":"rate_plan"
            },
            {
              "attributes": {
                "id":"fb0ecca9-0097-4d66-b53d-0fd68a530b97",
                "sell_mode":"per_person",
                "title":"multi occ",
                "occupancy":2,
                "parent_rate_plan_id": "ba67042d-cd4a-431e-a8f4-54eb4d01dff4",
                "room_type_id": "4803aecd-a0dc-46de-8788-ca8e774a460f",
                "property_id": "0a6fb8d0-055a-4902-a819-a862bab51725",
              },
              "id":"fb0ecca9-0097-4d66-b53d-0fd68a530b97",
              "type":"rate_plan"
            },
            {
              "attributes": {
                "id":"c677aec1-af1d-4f04-83a1-8ffa2a8eaa49",
                "sell_mode":"per_person",
                "title":"multi occ",
                "occupancy":1,
                "parent_rate_plan_id": "ba67042d-cd4a-431e-a8f4-54eb4d01dff4",
                "room_type_id": "4803aecd-a0dc-46de-8788-ca8e774a460f",
                "property_id": "0a6fb8d0-055a-4902-a819-a862bab51725",
              },
              "id":"c677aec1-af1d-4f04-83a1-8ffa2a8eaa49",
              "type":"rate_plan"
            },
            {
              "attributes": {
                "id": "2e35745d-1d82-4c72-ba8d-400bc9fd9bf8",
                "sell_mode": "per_person",
                "title": "multi occ",
                "occupancy": 4,
                "parent_rate_plan_id": "ba67042d-cd4a-431e-a8f4-54eb4d01dff4",
                "room_type_id": "4803aecd-a0dc-46de-8788-ca8e774a460f",
                "property_id": "0a6fb8d0-055a-4902-a819-a862bab51725",
              },
              "id": "2e35745d-1d82-4c72-ba8d-400bc9fd9bf8",
              "type": "rate_plan"
            },
            {
              "attributes": {
                "id":"1115745d-1d82-4c72-ba8d-400bc9fd9111",
                "sell_mode":"per_room",
                "title":"per_room",
                "occupancy": 4,
                "parent_rate_plan_id": null,
                "room_type_id": "4803aecd-a0dc-46de-8788-ca8e774a460f",
                "property_id": "0a6fb8d0-055a-4902-a819-a862bab51725",
              },
              "id":"1115745d-1d82-4c72-ba8d-400bc9fd9111",
              "type":"rate_plan"
            }
          ],
          "meta": {
          }
        };

        return attributesExtractor(stub.data);
      })
      .catch((error) => handleError(error, storage, transport));
  }

  find(id) {
    return transport
      .send('GET', `${ENDPOINT}/${id}`)
      .then(response => {
        storage.ratePlansAdd(response.data);
        return response;
      })
      .catch((error) => handleError(error, storage, transport));
  }

  create(attrs) {
    return transport
      .send('POST', ENDPOINT, {rate_plan: attrs})
      .then(response => {
        storage.ratePlansAdd(response.data);
        return response;
      })
      .catch((error) => handleError(error, storage, transport));
  }

  update(attrs) {
    return transport
      .send('PUT', `${ENDPOINT}/${attrs.id}`, {rate_plan: attrs})
      .then(response => {
        storage.ratePlansAdd(response.data);
        return response;
      })
      .catch((error) => handleError(error, storage, transport));
  }

  remove(attrs) {
    return transport
      .send('DELETE', `${ENDPOINT}/${attrs.id}`)
      .then(response => {
        storage.ratePlansDrop(attrs);
        return response;
      })
      .catch((error) => handleError(error, storage, transport));
  }
}
