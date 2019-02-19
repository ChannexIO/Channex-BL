let transport;
let storage;

export default class Auth {
  constructor(container) {
    transport = container.transport;
    storage = container.storage;
  }

  signIn(attrs) {
    return transport
      .send('POST', 'sign_in', {user: attrs})
      .then(response => {
        if (response.data.attributes.token) {
          transport.registerAccessToken(response.data.attributes.token);
          storage.sessionAdd(response.data.attributes);
        }

        return response;
      });
  }

  signUp(attrs) {
    return transport
      .send('POST', 'sign_up', {user: attrs})
      .then(response => {
        if (response.data.attributes.token) {
          transport.registerAccessToken(response.data.attributes.token);
          storage.sessionAdd(response.data.attributes);
        }

        return response;
      });
  }

  whiteLabelSignUp(attrs) {
    return transport
      .send('POST', 'wl_sign_up', {user: attrs})
      .then(response => {
        if (response.data.attributes.token) {
          transport.registerAccessToken(response.data.attributes.token);
          storage.sessionAdd(response.data.attributes);
        }

        return response;
      });
  }

  requestRestorePassword(email) {
    return transport
      .send('POST', 'request_restore_password', {user: {email: email}})
      .then(response => response);
  }

  restorePassword(attrs) {
    return transport
      .send('POST', 'restore_password', {user: attrs})
      .then(response => response);
  }

  confirmRegistration(token) {
    return transport
      .send('GET', `confirm_registration?token=${token}`)
      .then(response => response);
  }

  chooseHotel(hotel) {
    storage.chooseHotel(hotel);
  }

  chooseGroup(group) {
    storage.chooseGroup(group);
  }
}
