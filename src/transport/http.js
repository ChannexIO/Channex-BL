import stringifyArguments from '../utils/stringify_arguments';

export default class HTTPTransport {
  constructor(settings, token = null) {
    this.settings = settings;
    this.token = token || null;
  }

  send(method, endpoint, data) {
    return this[`_${method.toLowerCase()}`]
      .apply(this, [endpoint, data])
      .then(response => response.json())
      .then(this._prepareAnswer);
  }

  registerAccessToken(token) {
    this.token = token;
  }

  _post(endpoint, data) {
    return fetch(this._url(endpoint), {
      method: 'POST',
      headers: this._headers(),
      body: JSON.stringify(data)
    });
  }

  _put(endpoint, data) {
    return fetch(this._url(endpoint), {
      method: 'PUT',
      headers: this._headers(),
      body: JSON.stringify(data)
    });
  }

  _get(endpoint, filters) {
    return fetch(this._url(endpoint, filters), {
      method: 'GET',
      headers: this._headers()
    });
  }

  _delete(endpoint, filters) {
    return fetch(this._url(endpoint, filters), {
      method: 'DELETE',
      headers: this._headers()
    });
  }

  _headers() {
    let headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };

    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    return headers;
  }

  _url(endpoint, params = null) {
    return `${this.settings.protocol}://${this.settings.server}/api/${endpoint}${stringifyArguments(params)}`;
  }

  _prepareAnswer(response) {
    let answer;

    if (response.data || response.meta) {
      answer = Promise.resolve(response);
    } else {
      answer = Promise.reject(response);
    }

    return answer;
  }
}
