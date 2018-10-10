export default class Auth {
  constructor(container) {
    this.settings = container.settings;
    this.transport = container.transport;
    this.storage = container.storage;
  }

  signIn(attrs) {
    return this.transport
      .send('POST', 'sign_in', {user: attrs})
      .then(response => {
        if (response.data.attributes.token) {
          this.transport.registerAccessToken(response.data.attributes.token);
          this.storage.sessionAdd(response.data.attributes);
        }

        return response;
      });
  }

  signUp(attrs) {
    return this.transport
      .send('POST', 'sign_up', {user: attrs})
      .then(response => {
        if (response.data.attributes.token) {
          this.transport.registerAccessToken(response.data.attributes.token);
          this.storage.sessionAdd(response.data.attributes);
        }

        return response;
      });
  }

  whiteLabelSignUp(attrs) {
    return this.transport
      .send('POST', 'wl_sign_up', {user: attrs})
      .then(response => {
        if (response.data.attributes.token) {
          this.transport.registerAccessToken(response.data.attributes.token);
          this.storage.sessionAdd(response.data.attributes);
        }

        return response;
      });
  }

  requestRestorePassword(email) {
    return this.transport
      .send('POST', 'request_restore_password', {user: {email: email}})
      .then(response => response);
  }

  restorePassword(attrs) {
    return this.transport
      .send('POST', 'restore_password', {user: attrs})
      .then(response => response);
  }

  confirmRegistration(token) {
    return this.transport
      .send('GET', `confirm_registration?token=${token}`)
      .then(response => response);
  }
}
