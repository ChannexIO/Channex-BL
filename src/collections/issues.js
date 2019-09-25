let transport;
let storage;
const ENDPOINT = 'issues';

export default class Issues {
  constructor(container) {
    transport = container.transport;
    storage = container.storage;
  }

  list(filter = {}, pagination = {page: 1, limit: 10}, order = {inserted_at: 'desc'}) {
    return transport
      .send('GET', `${ENDPOINT}`, {filter, pagination, order})
      .then(response => {
        storage.issuesLoad(response.data, response.meta);
        return response.data;
      });
  }

  find(id) {
    return transport
      .send('GET', `${ENDPOINT}/${id}`)
      .then(response => {
        storage.issuesAdd(response.data);
        return response;
      });
  }
}
