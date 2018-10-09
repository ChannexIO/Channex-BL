export default class Auth {
  constructor(container) {
    this.settings = container.settings;
    this.transport = container.transport;
  }

  signIn(attrs) {
    return this.transport
      .send('POST', 'sign_in', {user: attrs})
      .then(response => {
        if (response.data.attributes.token) {
          this.transport.registerAccessToken(response.data.attributes.token);
        }

        return response;
      });
  }

  signUp(attrs) {
    return this.transport
      .send('POST', 'sign_up', {user: attrs})
      .then(response => response);
  }
}
