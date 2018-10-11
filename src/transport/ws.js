import {Socket} from 'phoenix-channels';

export default class WSTransport {
  constructor(settings, token = null) {
    this.settings = settings;
    this.token = token || null;
    this.socket = new Socket(`ws://${this.settings.server}/socket`);
    this.socket.connect();
    this.generalChannel = this.socket.channel('api', {});

    this.generalChannel.join()
      .receive('ok', resp => { console.log('Joined successfully', resp); })
      .receive('error', resp => { console.log('Unable to join', resp); });
  }

  send(method, endpoint, payload) {
    return new Promise((resolve, reject) => {
      this.generalChannel
        .push(`${method}:${endpoint}`, payload)
        .receive('ok', resp => resolve(resp))
        .receive('error', resp => reject(resp))
        .receive('timeout', () => reject(Error('Timeout Error')));
    });
  }

  registerAccessToken(token) {
    this.token = token;
  }
}
