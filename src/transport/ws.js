import {Socket} from 'phoenix-channels';

const CONNECTION_ERROR_MSG = 'there was an error with the connection!';
const CONNECTION_CLOSE_MSG = 'the connection dropped';
const API_CHANNEL = 'api';
const JWT_FIELD = '__jwt';
const JOIN_SUCCESS_MSG = 'Joined successfully';
const JOIN_ERROR_MSG = 'Unable to join';
const TIMEOUT_ERROR_MSG = 'Timeout Error';

function createSocket(context) {
  const socket = new Socket(`ws://${context.settings.server}/socket`);

  socket.onError(() => console.log(CONNECTION_ERROR_MSG));
  socket.onClose(() => console.log(CONNECTION_CLOSE_MSG));
  socket.connect();

  context.socket = socket;
}

function connectAPIChannel(context) {
  const apiChannel = context.socket.channel(API_CHANNEL, {});

  apiChannel.join()
    .receive('ok', resp => { console.log(JOIN_SUCCESS_MSG, resp); })
    .receive('error', resp => { console.log(JOIN_ERROR_MSG, resp); })
    .receive('timeout', resp => { console.log(TIMEOUT_ERROR_MSG); });

  context.apiChannel = apiChannel;
}

export default class WSTransport {
  constructor(settings, token = null) {
    this.settings = settings;
    this.token = token || null;

    createSocket(this);
    connectAPIChannel(this);
  }

  send(method, endpoint, payload) {
    if (this.token) {
      payload[JWT_FIELD] = this.token;
    }

    return new Promise((resolve, reject) => {
      this.apiChannel
        .push(`${method}:${endpoint}`, payload)
        .receive('ok', resp => resolve(resp))
        .receive('error', resp => reject(resp))
        .receive('timeout', () => reject(Error(TIMEOUT_ERROR_MSG)));
    });
  }

  registerAccessToken(token) {
    this.token = token;
  }

  disconnect() {
    this.socket.disconnect();
  }
}
