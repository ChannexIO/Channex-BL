(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("channex-bl", [], factory);
	else if(typeof exports === 'object')
		exports["channex-bl"] = factory();
	else
		root["channex-bl"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/es5-ext/global.js":
/*!****************************************!*\
  !*** ./node_modules/es5-ext/global.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var naiveFallback = function () {
	if (typeof self === "object" && self) return self;
	if (typeof window === "object" && window) return window;
	throw new Error("Unable to resolve global `this`");
};

module.exports = (function () {
	if (this) return this;

	// Unexpected strict mode (may happen if e.g. bundled into ESM module)

	// Fallback to standard globalThis if available
	if (typeof globalThis === "object" && globalThis) return globalThis;

	// Thanks @mathiasbynens -> https://mathiasbynens.be/notes/globalthis
	// In all ES5+ engines global object inherits from Object.prototype
	// (if you approached one that doesn't please report)
	try {
		Object.defineProperty(Object.prototype, "__global__", {
			get: function () { return this; },
			configurable: true
		});
	} catch (error) {
		// Unfortunate case of updates to Object.prototype being restricted
		// via preventExtensions, seal or freeze
		return naiveFallback();
	}
	try {
		// Safari case (window.__global__ works, but __global__ does not)
		if (!__global__) return naiveFallback();
		return __global__;
	} finally {
		delete Object.prototype.__global__;
	}
})();


/***/ }),

/***/ "./node_modules/phoenix-channels/src/channel.js":
/*!******************************************************!*\
  !*** ./node_modules/phoenix-channels/src/channel.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const { CHANNEL_EVENTS, CHANNEL_STATES } = __webpack_require__(/*! ./constants */ "./node_modules/phoenix-channels/src/constants.js")
const Push = __webpack_require__(/*! ./push */ "./node_modules/phoenix-channels/src/push.js")
const Timer = __webpack_require__(/*! ./timer */ "./node_modules/phoenix-channels/src/timer.js")

class Channel {
  constructor(topic, params, socket) {
    this.state       = CHANNEL_STATES.closed
    this.topic       = topic
    this.params      = params || {}
    this.socket      = socket
    this.bindings    = []
    this.timeout     = this.socket.timeout
    this.joinedOnce  = false
    this.joinPush    = new Push(this, CHANNEL_EVENTS.join, this.params, this.timeout)
    this.pushBuffer  = []
    this.rejoinTimer  = new Timer(
      () => this.rejoinUntilConnected(),
      this.socket.reconnectAfterMs
    )
    this.joinPush.receive("ok", () => {
      this.state = CHANNEL_STATES.joined
      this.rejoinTimer.reset()
      this.pushBuffer.forEach( pushEvent => pushEvent.send() )
      this.pushBuffer = []
    })
    this.onClose( () => {
      this.rejoinTimer.reset()
      this.socket.log("channel", `close ${this.topic} ${this.joinRef()}`)
      this.state = CHANNEL_STATES.closed
      this.socket.remove(this)
    })
    this.onError( reason => { if(this.isLeaving() || this.isClosed()){ return }
      this.socket.log("channel", `error ${this.topic}`, reason)
      this.state = CHANNEL_STATES.errored
      this.rejoinTimer.scheduleTimeout()
    })
    this.joinPush.receive("timeout", () => { if(!this.isJoining()){ return }
      this.socket.log("channel", `timeout ${this.topic}`, this.joinPush.timeout)
      this.state = CHANNEL_STATES.errored
      this.rejoinTimer.scheduleTimeout()
    })
    this.on(CHANNEL_EVENTS.reply, (payload, ref) => {
      this.trigger(this.replyEventName(ref), payload)
    })
  }

  rejoinUntilConnected(){
    this.rejoinTimer.scheduleTimeout()
    if(this.socket.isConnected()){
      this.rejoin()
    }
  }

  join(timeout = this.timeout){
    if(this.joinedOnce){
      throw(`tried to join multiple times. 'join' can only be called a single time per channel instance`)
    } else {
      this.joinedOnce = true
      this.rejoin(timeout)
      return this.joinPush
    }
  }

  onClose(callback){ this.on(CHANNEL_EVENTS.close, callback) }

  onError(callback){
    this.on(CHANNEL_EVENTS.error, reason => callback(reason) )
  }

  on(event, callback){ this.bindings.push({event, callback}) }

  off(event){ this.bindings = this.bindings.filter( bind => bind.event !== event ) }

  canPush(){ return this.socket.isConnected() && this.isJoined() }

  push(event, payload, timeout = this.timeout){
    if(!this.joinedOnce){
      throw(`tried to push '${event}' to '${this.topic}' before joining. Use channel.join() before pushing events`)
    }
    let pushEvent = new Push(this, event, payload, timeout)
    if(this.canPush()){
      pushEvent.send()
    } else {
      pushEvent.startTimeout()
      this.pushBuffer.push(pushEvent)
    }

    return pushEvent
  }

  // Leaves the channel
  //
  // Unsubscribes from server events, and
  // instructs channel to terminate on server
  //
  // Triggers onClose() hooks
  //
  // To receive leave acknowledgements, use the a `receive`
  // hook to bind to the server ack, ie:
  //
  //     channel.leave().receive("ok", () => alert("left!") )
  //
  leave(timeout = this.timeout){
    this.state = CHANNEL_STATES.leaving
    let onClose = () => {
      this.socket.log("channel", `leave ${this.topic}`)
      this.trigger(CHANNEL_EVENTS.close, "leave", this.joinRef())
    }
    let leavePush = new Push(this, CHANNEL_EVENTS.leave, {}, timeout)
    leavePush.receive("ok", () => onClose() )
             .receive("timeout", () => onClose() )
    leavePush.send()
    if(!this.canPush()){ leavePush.trigger("ok", {}) }

    return leavePush
  }

  // Overridable message hook
  //
  // Receives all events for specialized message handling
  // before dispatching to the channel callbacks.
  //
  // Must return the payload, modified or unmodified
  onMessage(event, payload, ref){ return payload }

  // private

  isMember(topic){ return this.topic === topic }

  joinRef(){ return this.joinPush.ref }

  sendJoin(timeout){
    this.state = CHANNEL_STATES.joining
    this.joinPush.resend(timeout)
  }

  rejoin(timeout = this.timeout){ if(this.isLeaving()){ return }
    this.sendJoin(timeout)
  }

  trigger(event, payload, ref){
    let {close, error, leave, join} = CHANNEL_EVENTS
    if(ref && [close, error, leave, join].indexOf(event) >= 0 && ref !== this.joinRef()){
      return
    }
    let handledPayload = this.onMessage(event, payload, ref)
    if(payload && !handledPayload){ throw("channel onMessage callbacks must return the payload, modified or unmodified") }

    this.bindings.filter( bind => bind.event === event)
                 .map( bind => bind.callback(handledPayload, ref))
  }

  replyEventName(ref){ return `chan_reply_${ref}` }

  isClosed() { return this.state === CHANNEL_STATES.closed }
  isErrored(){ return this.state === CHANNEL_STATES.errored }
  isJoined() { return this.state === CHANNEL_STATES.joined }
  isJoining(){ return this.state === CHANNEL_STATES.joining }
  isLeaving(){ return this.state === CHANNEL_STATES.leaving }
}

module.exports = Channel

/***/ }),

/***/ "./node_modules/phoenix-channels/src/constants.js":
/*!********************************************************!*\
  !*** ./node_modules/phoenix-channels/src/constants.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = {
    VSN: "1.0.0",
    SOCKET_STATES: {connecting: 0, open: 1, closing: 2, closed: 3},
    DEFAULT_TIMEOUT: 10000,
    WS_CLOSE_NORMAL: 1000,
    CHANNEL_STATES: {
        closed: "closed",
        errored: "errored",
        joined: "joined",
        joining: "joining",
        leaving: "leaving",
    },
    CHANNEL_EVENTS: {
        close: "phx_close",
        error: "phx_error",
        join: "phx_join",
        reply: "phx_reply",
        leave: "phx_leave",
    },
    TRANSPORTS: {
        websocket: "websocket",
    },
}


/***/ }),

/***/ "./node_modules/phoenix-channels/src/index.js":
/*!****************************************************!*\
  !*** ./node_modules/phoenix-channels/src/index.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Phoenix Channels JavaScript client
//
// ## Socket Connection
//
// A single connection is established to the server and
// channels are multiplexed over the connection.
// Connect to the server using the `Socket` class:
//
//     let socket = new Socket("/socket", {params: {userToken: "123"}})
//     socket.connect()
//
// The `Socket` constructor takes the mount point of the socket,
// the authentication params, as well as options that can be found in
// the Socket docs, such as configuring the heartbeat.
//
// ## Channels
//
// Channels are isolated, concurrent processes on the server that
// subscribe to topics and broker events between the client and server.
// To join a channel, you must provide the topic, and channel params for
// authorization. Here's an example chat room example where `"new_msg"`
// events are listened for, messages are pushed to the server, and
// the channel is joined with ok/error/timeout matches:
//
//     let channel = socket.channel("room:123", {token: roomToken})
//     channel.on("new_msg", msg => console.log("Got message", msg) )
//     $input.onEnter( e => {
//       channel.push("new_msg", {body: e.target.val}, 10000)
//        .receive("ok", (msg) => console.log("created message", msg) )
//        .receive("error", (reasons) => console.log("create failed", reasons) )
//        .receive("timeout", () => console.log("Networking issue...") )
//     })
//     channel.join()
//       .receive("ok", ({messages}) => console.log("catching up", messages) )
//       .receive("error", ({reason}) => console.log("failed join", reason) )
//       .receive("timeout", () => console.log("Networking issue. Still waiting...") )
//
//
// ## Joining
//
// Creating a channel with `socket.channel(topic, params)`, binds the params to
// `channel.params`, which are sent up on `channel.join()`.
// Subsequent rejoins will send up the modified params for
// updating authorization params, or passing up last_message_id information.
// Successful joins receive an "ok" status, while unsuccessful joins
// receive "error".
//
// ## Duplicate Join Subscriptions
//
// While the client may join any number of topics on any number of channels,
// the client may only hold a single subscription for each unique topic at any
// given time. When attempting to create a duplicate subscription,
// the server will close the existing channel, log a warning, and
// spawn a new channel for the topic. The client will have their
// `channel.onClose` callbacks fired for the existing channel, and the new
// channel join will have its receive hooks processed as normal.
//
// ## Pushing Messages
//
// From the previous example, we can see that pushing messages to the server
// can be done with `channel.push(eventName, payload)` and we can optionally
// receive responses from the push. Additionally, we can use
// `receive("timeout", callback)` to abort waiting for our other `receive` hooks
//  and take action after some period of waiting. The default timeout is 5000ms.
//
//
// ## Socket Hooks
//
// Lifecycle events of the multiplexed connection can be hooked into via
// `socket.onError()` and `socket.onClose()` events, ie:
//
//     socket.onError( () => console.log("there was an error with the connection!") )
//     socket.onClose( () => console.log("the connection dropped") )
//
//
// ## Channel Hooks
//
// For each joined channel, you can bind to `onError` and `onClose` events
// to monitor the channel lifecycle, ie:
//
//     channel.onError( () => console.log("there was an error!") )
//     channel.onClose( () => console.log("the channel has gone away gracefully") )
//
// ### onError hooks
//
// `onError` hooks are invoked if the socket connection drops, or the channel
// crashes on the server. In either case, a channel rejoin is attempted
// automatically in an exponential backoff manner.
//
// ### onClose hooks
//
// `onClose` hooks are invoked only in two cases. 1) the channel explicitly
// closed on the server, or 2). The client explicitly closed, by calling
// `channel.leave()`
//
//
// ## Presence
//
// The `Presence` object provides features for syncing presence information
// from the server with the client and handling presences joining and leaving.
//
// ### Syncing initial state from the server
//
// `Presence.syncState` is used to sync the list of presences on the server
// with the client's state. An optional `onJoin` and `onLeave` callback can
// be provided to react to changes in the client's local presences across
// disconnects and reconnects with the server.
//
// `Presence.syncDiff` is used to sync a diff of presence join and leave
// events from the server, as they happen. Like `syncState`, `syncDiff`
// accepts optional `onJoin` and `onLeave` callbacks to react to a user
// joining or leaving from a device.
//
// ### Listing Presences
//
// `Presence.list` is used to return a list of presence information
// based on the local state of metadata. By default, all presence
// metadata is returned, but a `listBy` function can be supplied to
// allow the client to select which metadata to use for a given presence.
// For example, you may have a user online from different devices with
// a metadata status of "online", but they have set themselves to "away"
// on another device. In this case, the app may choose to use the "away"
// status for what appears on the UI. The example below defines a `listBy`
// function which prioritizes the first metadata which was registered for
// each user. This could be the first tab they opened, or the first device
// they came online from:
//
//     let state = {}
//     state = Presence.syncState(state, stateFromServer)
//     let listBy = (id, {metas: [first, ...rest]}) => {
//       first.count = rest.length + 1 // count of this user's presences
//       first.id = id
//       return first
//     }
//     let onlineUsers = Presence.list(state, listBy)
//
//
// ### Example Usage
//
//     // detect if user has joined for the 1st time or from another tab/device
//     let onJoin = (id, current, newPres) => {
//       if(!current){
//         console.log("user has entered for the first time", newPres)
//       } else {
//         console.log("user additional presence", newPres)
//       }
//     }
//     // detect if user has left from all tabs/devices, or is still present
//     let onLeave = (id, current, leftPres) => {
//       if(current.metas.length === 0){
//         console.log("user has left from all devices", leftPres)
//       } else {
//         console.log("user left from a device", leftPres)
//       }
//     }
//     let presences = {} // client's initial empty presence state
//     // receive initial presence data from server, sent after join
//     myChannel.on("presence_state", state => {
//       presences = Presence.syncState(presences, state, onJoin, onLeave)
//       displayUsers(Presence.list(presences))
//     })
//     // receive "presence_diff" from server, containing join/leave events
//     myChannel.on("presence_diff", diff => {
//       presences = Presence.syncDiff(presences, diff, onJoin, onLeave)
//       this.setState({users: Presence.list(room.presences, listBy)})
//     })
//

module.exports = {
  Channel: __webpack_require__(/*! ./channel */ "./node_modules/phoenix-channels/src/channel.js"),
  Socket: __webpack_require__(/*! ./socket */ "./node_modules/phoenix-channels/src/socket.js"),
  Presence: __webpack_require__(/*! ./presence */ "./node_modules/phoenix-channels/src/presence.js"),
}

/***/ }),

/***/ "./node_modules/phoenix-channels/src/presence.js":
/*!*******************************************************!*\
  !*** ./node_modules/phoenix-channels/src/presence.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var Presence = {

  syncState(currentState, newState, onJoin, onLeave){
    let state = this.clone(currentState)
    let joins = {}
    let leaves = {}

    this.map(state, (key, presence) => {
      if(!newState[key]){
        leaves[key] = presence
      }
    })
    this.map(newState, (key, newPresence) => {
      let currentPresence = state[key]
      if(currentPresence){
        let newRefs = newPresence.metas.map(m => m.phx_ref)
        let curRefs = currentPresence.metas.map(m => m.phx_ref)
        let joinedMetas = newPresence.metas.filter(m => curRefs.indexOf(m.phx_ref) < 0)
        let leftMetas = currentPresence.metas.filter(m => newRefs.indexOf(m.phx_ref) < 0)
        if(joinedMetas.length > 0){
          joins[key] = newPresence
          joins[key].metas = joinedMetas
        }
        if(leftMetas.length > 0){
          leaves[key] = this.clone(currentPresence)
          leaves[key].metas = leftMetas
        }
      } else {
        joins[key] = newPresence
      }
    })
    return this.syncDiff(state, {joins: joins, leaves: leaves}, onJoin, onLeave)
  },

  syncDiff(currentState, {joins, leaves}, onJoin, onLeave){
    let state = this.clone(currentState)
    if(!onJoin){ onJoin = function(){} }
    if(!onLeave){ onLeave = function(){} }

    this.map(joins, (key, newPresence) => {
      let currentPresence = state[key]
      state[key] = newPresence
      if(currentPresence){
        state[key].metas.unshift(...currentPresence.metas)
      }
      onJoin(key, currentPresence, newPresence)
    })
    this.map(leaves, (key, leftPresence) => {
      let currentPresence = state[key]
      if(!currentPresence){ return }
      let refsToRemove = leftPresence.metas.map(m => m.phx_ref)
      currentPresence.metas = currentPresence.metas.filter(p => {
        return refsToRemove.indexOf(p.phx_ref) < 0
      })
      onLeave(key, currentPresence, leftPresence)
      if(currentPresence.metas.length === 0){
        delete state[key]
      }
    })
    return state
  },

  list(presences, chooser){
    if(!chooser){ chooser = function(key, pres){ return pres } }

    return this.map(presences, (key, presence) => {
      return chooser(key, presence)
    })
  },

  // private

  map(obj, func){
    return Object.getOwnPropertyNames(obj).map(key => func(key, obj[key]))
  },

  clone(obj){
      return JSON.parse(JSON.stringify(obj))
  },
}

module.exports = Presence

/***/ }),

/***/ "./node_modules/phoenix-channels/src/push.js":
/*!***************************************************!*\
  !*** ./node_modules/phoenix-channels/src/push.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {


class Push {

  // Initializes the Push
  //
  // channel - The Channel
  // event - The event, for example `"phx_join"`
  // payload - The payload, for example `{user_id: 123}`
  // timeout - The push timeout in milliseconds
  //
  constructor(channel, event, payload, timeout){
    this.channel      = channel
    this.event        = event
    this.payload      = payload || {}
    this.receivedResp = null
    this.timeout      = timeout
    this.timeoutTimer = null
    this.recHooks     = []
    this.sent         = false
  }

  resend(timeout){
    this.timeout = timeout
    this.cancelRefEvent()
    this.ref          = null
    this.refEvent     = null
    this.receivedResp = null
    this.sent         = false
    this.send()
  }

  send(){ if(this.hasReceived("timeout")){ return }
    this.startTimeout()
    this.sent = true
    this.channel.socket.push({
      topic: this.channel.topic,
      event: this.event,
      payload: this.payload,
      ref: this.ref,
    })
  }

  receive(status, callback){
    if(this.hasReceived(status)){
      callback(this.receivedResp.response)
    }

    this.recHooks.push({status, callback})
    return this
  }


  // private

  matchReceive({status, response, ref}){
    this.recHooks.filter( h => h.status === status )
                 .forEach( h => h.callback(response) )
  }

  cancelRefEvent(){ if(!this.refEvent){ return }
    this.channel.off(this.refEvent)
  }

  cancelTimeout(){
    clearTimeout(this.timeoutTimer)
    this.timeoutTimer = null
  }

  startTimeout(){ if(this.timeoutTimer){ return }
    this.ref      = this.channel.socket.makeRef()
    this.refEvent = this.channel.replyEventName(this.ref)

    this.channel.on(this.refEvent, payload => {
      this.cancelRefEvent()
      this.cancelTimeout()
      this.receivedResp = payload
      this.matchReceive(payload)
    })

    this.timeoutTimer = setTimeout(() => {
      this.trigger("timeout", {})
    }, this.timeout)
  }

  hasReceived(status){
    return this.receivedResp && this.receivedResp.status === status
  }

  trigger(status, response){
    this.channel.trigger(this.refEvent, {status, response})
  }
}

module.exports = Push

/***/ }),

/***/ "./node_modules/phoenix-channels/src/socket.js":
/*!*****************************************************!*\
  !*** ./node_modules/phoenix-channels/src/socket.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const {
  VSN,
  CHANNEL_EVENTS,
  TRANSPORTS,
  SOCKET_STATES,
  DEFAULT_TIMEOUT,
  WS_CLOSE_NORMAL ,
} = __webpack_require__(/*! ./constants */ "./node_modules/phoenix-channels/src/constants.js")

const querystring = __webpack_require__(/*! querystring */ "./node_modules/querystring-es3/index.js")
const WebSocket = __webpack_require__(/*! websocket */ "./node_modules/websocket/lib/browser.js").w3cwebsocket
const Timer = __webpack_require__(/*! ./timer */ "./node_modules/phoenix-channels/src/timer.js")
const Channel = __webpack_require__(/*! ./channel */ "./node_modules/phoenix-channels/src/channel.js")

class Socket {

  // Initializes the Socket
  //
  // endPoint - The string WebSocket endpoint, ie, "ws://example.com/socket",
  //                                               "wss://example.com"
  //                                               "/socket" (inherited host & protocol)
  // opts - Optional configuration
  //   transport - The Websocket Transport, for example WebSocket.
  //
  //   encode - The function to encode outgoing messages. Defaults to JSON:
  //
  //     (payload, callback) => callback(JSON.stringify(payload))
  //
  //   decode - The function to decode incoming messages. Defaults to JSON:
  //
  //     (payload, callback) => callback(JSON.parse(payload))
  //
  //   timeout - The default timeout in milliseconds to trigger push timeouts.
  //             Defaults `DEFAULT_TIMEOUT`
  //   heartbeatIntervalMs - The millisec interval to send a heartbeat message
  //   reconnectAfterMs - The optional function that returns the millsec
  //                      reconnect interval. Defaults to stepped backoff of:
  //
  //     function(tries){
  //       return [1000, 5000, 10000][tries - 1] || 10000
  //     }
  //
  //   logger - The optional function for specialized logging, ie:
  //     `logger: (kind, msg, data) => { console.log(`${kind}: ${msg}`, data) }
  //
  //   longpollerTimeout - The maximum timeout of a long poll AJAX request.
  //                        Defaults to 20s (double the server long poll timer).
  //
  //   params - The optional params to pass when connecting
  //
  // For IE8 support use an ES5-shim (https://github.com/es-shims/es5-shim)
  //
  constructor(endPoint, opts = {}){
    this.stateChangeCallbacks = {open: [], close: [], error: [], message: []}
    this.channels             = []
    this.sendBuffer           = []
    this.ref                  = 0
    this.timeout              = opts.timeout || DEFAULT_TIMEOUT
    this.transport            = opts.transport || WebSocket
    this.defaultEncoder       = (payload, callback) => callback(JSON.stringify(payload))
    this.defaultDecoder       = (payload, callback) => callback(JSON.parse(payload))

    this.encode = opts.encode || this.defaultEncoder
    this.decode = opts.decode || this.defaultDecoder

    this.heartbeatIntervalMs  = opts.heartbeatIntervalMs || 30000
    this.reconnectAfterMs     = opts.reconnectAfterMs || function(tries){
      return [1000, 2000, 5000, 10000][tries - 1] || 10000
    }
    this.logger               = opts.logger || function(){} // noop
    this.longpollerTimeout    = opts.longpollerTimeout || 20000
    this.params               = opts.params || {}
    this.endPoint             = `${endPoint}/${TRANSPORTS.websocket}`
    this.heartbeatTimer       = null
    this.pendingHeartbeatRef  = null
    this.reconnectTimer       = new Timer(() => {
      this.disconnect(() => this.connect())
    }, this.reconnectAfterMs)
  }

  endPointURL(){
    return this.appendParams(this.endPoint, Object.assign({}, this.params, {vsn: VSN}))
  }

  appendParams(url, params){
    if(Object.keys(params).length === 0){ return url }

    let prefix = url.match(/\?/) ? "&" : "?"
    return `${url}${prefix}${querystring.stringify(params)}`
  }

  disconnect(callback, code, reason){
    if(this.conn){
      this.conn.onclose = function(){} // noop
      if(code){ this.conn.close(code, reason || "") } else { this.conn.close() }
      this.conn = null
    }
    callback && callback()
  }

  connect(){
    if(this.conn){ return }

    this.conn = new this.transport(this.endPointURL())
    this.conn.timeout   = this.longpollerTimeout
    this.conn.onopen    = () => this.onConnOpen()
    this.conn.onerror   = error => this.onConnError(error)
    this.conn.onmessage = event => this.onConnMessage(event)
    this.conn.onclose   = event => this.onConnClose(event)
  }

  // Logs the message. Override `this.logger` for specialized logging. noops by default
  log(kind, msg, data){ this.logger(kind, msg, data) }

  // Registers callbacks for connection state change events
  //
  // Examples
  //
  //    socket.onError(function(error){ alert("An error occurred") })
  //
  onOpen     (callback){ this.stateChangeCallbacks.open.push(callback) }
  onClose    (callback){ this.stateChangeCallbacks.close.push(callback) }
  onError    (callback){ this.stateChangeCallbacks.error.push(callback) }
  onMessage  (callback){ this.stateChangeCallbacks.message.push(callback) }

  onConnOpen(){
    this.log("transport", `connected to ${this.endPointURL()}`)
    this.flushSendBuffer()
    this.reconnectTimer.reset()
    if(!this.conn.skipHeartbeat){
      clearInterval(this.heartbeatTimer)
      this.heartbeatTimer = setInterval(() => this.sendHeartbeat(), this.heartbeatIntervalMs)
    }
    this.stateChangeCallbacks.open.forEach( callback => callback() )
  }

  onConnClose(event){
    this.log("transport", "close", event)
    this.triggerChanError()
    clearInterval(this.heartbeatTimer)
    this.reconnectTimer.scheduleTimeout()
    this.stateChangeCallbacks.close.forEach( callback => callback(event) )
  }

  onConnError(error){
    this.log("transport", error)
    this.triggerChanError()
    this.stateChangeCallbacks.error.forEach( callback => callback(error) )
  }

  triggerChanError(){
    this.channels.forEach( channel => channel.trigger(CHANNEL_EVENTS.error) )
  }

  connectionState(){
    switch(this.conn && this.conn.readyState){
      case SOCKET_STATES.connecting: return "connecting"
      case SOCKET_STATES.open:       return "open"
      case SOCKET_STATES.closing:    return "closing"
      default:                       return "closed"
    }
  }

  isConnected(){ return this.connectionState() === "open" }

  remove(channel){
    this.channels = this.channels.filter(c => c.joinRef() !== channel.joinRef())
  }

  channel(topic, chanParams = {}){
    let chan = new Channel(topic, chanParams, this)
    this.channels.push(chan)
    return chan
  }

  push(data){
    let {topic, event, payload, ref} = data
    let callback = () => {
      this.encode(data, result => {
        this.conn.send(result)
      })
    }
    this.log("push", `${topic} ${event} (${ref})`, payload)
    if(this.isConnected()){
      callback()
    }
    else {
      this.sendBuffer.push(callback)
    }
  }

  // Return the next message ref, accounting for overflows
  makeRef(){
    let newRef = this.ref + 1
    if(newRef === this.ref){ this.ref = 0 } else { this.ref = newRef }

    return this.ref.toString()
  }

  sendHeartbeat(){ if(!this.isConnected()){ return }
    if(this.pendingHeartbeatRef){
      this.pendingHeartbeatRef = null
      this.log("transport", "heartbeat timeout. Attempting to re-establish connection")
      this.conn.close(WS_CLOSE_NORMAL, "hearbeat timeout")
      return
    }
    this.pendingHeartbeatRef = this.makeRef()
    this.push({topic: "phoenix", event: "heartbeat", payload: {}, ref: this.pendingHeartbeatRef})
  }

  flushSendBuffer(){
    if(this.isConnected() && this.sendBuffer.length > 0){
      this.sendBuffer.forEach( callback => callback() )
      this.sendBuffer = []
    }
  }

  onConnMessage(rawMessage){
    this.decode(rawMessage.data, msg => {
      let {topic, event, payload, ref} = msg
      if(ref && ref === this.pendingHeartbeatRef){ this.pendingHeartbeatRef = null }

      this.log("receive", `${payload.status || ""} ${topic} ${event} ${ref && "(" + ref + ")" || ""}`, payload)
      this.channels.filter( channel => channel.isMember(topic) )
                   .forEach( channel => channel.trigger(event, payload, ref) )
      this.stateChangeCallbacks.message.forEach( callback => callback(msg) )
    })
  }
}

module.exports = Socket

/***/ }),

/***/ "./node_modules/phoenix-channels/src/timer.js":
/*!****************************************************!*\
  !*** ./node_modules/phoenix-channels/src/timer.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {


// Creates a timer that accepts a `timerCalc` function to perform
// calculated timeout retries, such as exponential backoff.
//
// ## Examples
//
//    let reconnectTimer = new Timer(() => this.connect(), function(tries){
//      return [1000, 5000, 10000][tries - 1] || 10000
//    })
//    reconnectTimer.scheduleTimeout() // fires after 1000
//    reconnectTimer.scheduleTimeout() // fires after 5000
//    reconnectTimer.reset()
//    reconnectTimer.scheduleTimeout() // fires after 1000
//
class Timer {
  constructor(callback, timerCalc){
    this.callback  = callback
    this.timerCalc = timerCalc
    this.timer     = null
    this.tries     = 0
  }

  reset(){
    this.tries = 0
    clearTimeout(this.timer)
  }

  // Cancels any previous scheduleTimeout and schedules callback
  scheduleTimeout(){
    clearTimeout(this.timer)

    this.timer = setTimeout(() => {
      this.tries = this.tries + 1
      this.callback()
    }, this.timerCalc(this.tries + 1))
  }
}

module.exports = Timer

/***/ }),

/***/ "./node_modules/querystring-es3/decode.js":
/*!************************************************!*\
  !*** ./node_modules/querystring-es3/decode.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



// If obj.hasOwnProperty has been overridden, then calling
// obj.hasOwnProperty(prop) will break.
// See: https://github.com/joyent/node/issues/1707
function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

module.exports = function(qs, sep, eq, options) {
  sep = sep || '&';
  eq = eq || '=';
  var obj = {};

  if (typeof qs !== 'string' || qs.length === 0) {
    return obj;
  }

  var regexp = /\+/g;
  qs = qs.split(sep);

  var maxKeys = 1000;
  if (options && typeof options.maxKeys === 'number') {
    maxKeys = options.maxKeys;
  }

  var len = qs.length;
  // maxKeys <= 0 means that we should not limit keys count
  if (maxKeys > 0 && len > maxKeys) {
    len = maxKeys;
  }

  for (var i = 0; i < len; ++i) {
    var x = qs[i].replace(regexp, '%20'),
        idx = x.indexOf(eq),
        kstr, vstr, k, v;

    if (idx >= 0) {
      kstr = x.substr(0, idx);
      vstr = x.substr(idx + 1);
    } else {
      kstr = x;
      vstr = '';
    }

    k = decodeURIComponent(kstr);
    v = decodeURIComponent(vstr);

    if (!hasOwnProperty(obj, k)) {
      obj[k] = v;
    } else if (isArray(obj[k])) {
      obj[k].push(v);
    } else {
      obj[k] = [obj[k], v];
    }
  }

  return obj;
};

var isArray = Array.isArray || function (xs) {
  return Object.prototype.toString.call(xs) === '[object Array]';
};


/***/ }),

/***/ "./node_modules/querystring-es3/encode.js":
/*!************************************************!*\
  !*** ./node_modules/querystring-es3/encode.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



var stringifyPrimitive = function(v) {
  switch (typeof v) {
    case 'string':
      return v;

    case 'boolean':
      return v ? 'true' : 'false';

    case 'number':
      return isFinite(v) ? v : '';

    default:
      return '';
  }
};

module.exports = function(obj, sep, eq, name) {
  sep = sep || '&';
  eq = eq || '=';
  if (obj === null) {
    obj = undefined;
  }

  if (typeof obj === 'object') {
    return map(objectKeys(obj), function(k) {
      var ks = encodeURIComponent(stringifyPrimitive(k)) + eq;
      if (isArray(obj[k])) {
        return map(obj[k], function(v) {
          return ks + encodeURIComponent(stringifyPrimitive(v));
        }).join(sep);
      } else {
        return ks + encodeURIComponent(stringifyPrimitive(obj[k]));
      }
    }).join(sep);

  }

  if (!name) return '';
  return encodeURIComponent(stringifyPrimitive(name)) + eq +
         encodeURIComponent(stringifyPrimitive(obj));
};

var isArray = Array.isArray || function (xs) {
  return Object.prototype.toString.call(xs) === '[object Array]';
};

function map (xs, f) {
  if (xs.map) return xs.map(f);
  var res = [];
  for (var i = 0; i < xs.length; i++) {
    res.push(f(xs[i], i));
  }
  return res;
}

var objectKeys = Object.keys || function (obj) {
  var res = [];
  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) res.push(key);
  }
  return res;
};


/***/ }),

/***/ "./node_modules/querystring-es3/index.js":
/*!***********************************************!*\
  !*** ./node_modules/querystring-es3/index.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.decode = exports.parse = __webpack_require__(/*! ./decode */ "./node_modules/querystring-es3/decode.js");
exports.encode = exports.stringify = __webpack_require__(/*! ./encode */ "./node_modules/querystring-es3/encode.js");


/***/ }),

/***/ "./node_modules/redux-devtools-extension/developmentOnly.js":
/*!******************************************************************!*\
  !*** ./node_modules/redux-devtools-extension/developmentOnly.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var compose = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js").compose;

exports.__esModule = true;
exports.composeWithDevTools = (
   true && typeof window !== 'undefined' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ :
    function() {
      if (arguments.length === 0) return undefined;
      if (typeof arguments[0] === 'object') return compose;
      return compose.apply(null, arguments);
    }
);

exports.devToolsEnhancer = (
   true && typeof window !== 'undefined' &&
  window.__REDUX_DEVTOOLS_EXTENSION__ ?
    window.__REDUX_DEVTOOLS_EXTENSION__ :
    function() { return function(noop) { return noop; } }
);


/***/ }),

/***/ "./node_modules/redux/es/redux.js":
/*!****************************************!*\
  !*** ./node_modules/redux/es/redux.js ***!
  \****************************************/
/*! exports provided: __DO_NOT_USE__ActionTypes, applyMiddleware, bindActionCreators, combineReducers, compose, createStore */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__DO_NOT_USE__ActionTypes", function() { return ActionTypes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "applyMiddleware", function() { return applyMiddleware; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "bindActionCreators", function() { return bindActionCreators; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "combineReducers", function() { return combineReducers; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "compose", function() { return compose; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createStore", function() { return createStore; });
/* harmony import */ var symbol_observable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! symbol-observable */ "./node_modules/symbol-observable/es/index.js");


/**
 * These are private action types reserved by Redux.
 * For any unknown actions, you must return the current state.
 * If the current state is undefined, you must return the initial state.
 * Do not reference these action types directly in your code.
 */
var randomString = function randomString() {
  return Math.random().toString(36).substring(7).split('').join('.');
};

var ActionTypes = {
  INIT: "@@redux/INIT" + randomString(),
  REPLACE: "@@redux/REPLACE" + randomString(),
  PROBE_UNKNOWN_ACTION: function PROBE_UNKNOWN_ACTION() {
    return "@@redux/PROBE_UNKNOWN_ACTION" + randomString();
  }
};

/**
 * @param {any} obj The object to inspect.
 * @returns {boolean} True if the argument appears to be a plain object.
 */
function isPlainObject(obj) {
  if (typeof obj !== 'object' || obj === null) return false;
  var proto = obj;

  while (Object.getPrototypeOf(proto) !== null) {
    proto = Object.getPrototypeOf(proto);
  }

  return Object.getPrototypeOf(obj) === proto;
}

/**
 * Creates a Redux store that holds the state tree.
 * The only way to change the data in the store is to call `dispatch()` on it.
 *
 * There should only be a single store in your app. To specify how different
 * parts of the state tree respond to actions, you may combine several reducers
 * into a single reducer function by using `combineReducers`.
 *
 * @param {Function} reducer A function that returns the next state tree, given
 * the current state tree and the action to handle.
 *
 * @param {any} [preloadedState] The initial state. You may optionally specify it
 * to hydrate the state from the server in universal apps, or to restore a
 * previously serialized user session.
 * If you use `combineReducers` to produce the root reducer function, this must be
 * an object with the same shape as `combineReducers` keys.
 *
 * @param {Function} [enhancer] The store enhancer. You may optionally specify it
 * to enhance the store with third-party capabilities such as middleware,
 * time travel, persistence, etc. The only store enhancer that ships with Redux
 * is `applyMiddleware()`.
 *
 * @returns {Store} A Redux store that lets you read the state, dispatch actions
 * and subscribe to changes.
 */

function createStore(reducer, preloadedState, enhancer) {
  var _ref2;

  if (typeof preloadedState === 'function' && typeof enhancer === 'function' || typeof enhancer === 'function' && typeof arguments[3] === 'function') {
    throw new Error('It looks like you are passing several store enhancers to ' + 'createStore(). This is not supported. Instead, compose them ' + 'together to a single function.');
  }

  if (typeof preloadedState === 'function' && typeof enhancer === 'undefined') {
    enhancer = preloadedState;
    preloadedState = undefined;
  }

  if (typeof enhancer !== 'undefined') {
    if (typeof enhancer !== 'function') {
      throw new Error('Expected the enhancer to be a function.');
    }

    return enhancer(createStore)(reducer, preloadedState);
  }

  if (typeof reducer !== 'function') {
    throw new Error('Expected the reducer to be a function.');
  }

  var currentReducer = reducer;
  var currentState = preloadedState;
  var currentListeners = [];
  var nextListeners = currentListeners;
  var isDispatching = false;
  /**
   * This makes a shallow copy of currentListeners so we can use
   * nextListeners as a temporary list while dispatching.
   *
   * This prevents any bugs around consumers calling
   * subscribe/unsubscribe in the middle of a dispatch.
   */

  function ensureCanMutateNextListeners() {
    if (nextListeners === currentListeners) {
      nextListeners = currentListeners.slice();
    }
  }
  /**
   * Reads the state tree managed by the store.
   *
   * @returns {any} The current state tree of your application.
   */


  function getState() {
    if (isDispatching) {
      throw new Error('You may not call store.getState() while the reducer is executing. ' + 'The reducer has already received the state as an argument. ' + 'Pass it down from the top reducer instead of reading it from the store.');
    }

    return currentState;
  }
  /**
   * Adds a change listener. It will be called any time an action is dispatched,
   * and some part of the state tree may potentially have changed. You may then
   * call `getState()` to read the current state tree inside the callback.
   *
   * You may call `dispatch()` from a change listener, with the following
   * caveats:
   *
   * 1. The subscriptions are snapshotted just before every `dispatch()` call.
   * If you subscribe or unsubscribe while the listeners are being invoked, this
   * will not have any effect on the `dispatch()` that is currently in progress.
   * However, the next `dispatch()` call, whether nested or not, will use a more
   * recent snapshot of the subscription list.
   *
   * 2. The listener should not expect to see all state changes, as the state
   * might have been updated multiple times during a nested `dispatch()` before
   * the listener is called. It is, however, guaranteed that all subscribers
   * registered before the `dispatch()` started will be called with the latest
   * state by the time it exits.
   *
   * @param {Function} listener A callback to be invoked on every dispatch.
   * @returns {Function} A function to remove this change listener.
   */


  function subscribe(listener) {
    if (typeof listener !== 'function') {
      throw new Error('Expected the listener to be a function.');
    }

    if (isDispatching) {
      throw new Error('You may not call store.subscribe() while the reducer is executing. ' + 'If you would like to be notified after the store has been updated, subscribe from a ' + 'component and invoke store.getState() in the callback to access the latest state. ' + 'See https://redux.js.org/api-reference/store#subscribelistener for more details.');
    }

    var isSubscribed = true;
    ensureCanMutateNextListeners();
    nextListeners.push(listener);
    return function unsubscribe() {
      if (!isSubscribed) {
        return;
      }

      if (isDispatching) {
        throw new Error('You may not unsubscribe from a store listener while the reducer is executing. ' + 'See https://redux.js.org/api-reference/store#subscribelistener for more details.');
      }

      isSubscribed = false;
      ensureCanMutateNextListeners();
      var index = nextListeners.indexOf(listener);
      nextListeners.splice(index, 1);
      currentListeners = null;
    };
  }
  /**
   * Dispatches an action. It is the only way to trigger a state change.
   *
   * The `reducer` function, used to create the store, will be called with the
   * current state tree and the given `action`. Its return value will
   * be considered the **next** state of the tree, and the change listeners
   * will be notified.
   *
   * The base implementation only supports plain object actions. If you want to
   * dispatch a Promise, an Observable, a thunk, or something else, you need to
   * wrap your store creating function into the corresponding middleware. For
   * example, see the documentation for the `redux-thunk` package. Even the
   * middleware will eventually dispatch plain object actions using this method.
   *
   * @param {Object} action A plain object representing “what changed”. It is
   * a good idea to keep actions serializable so you can record and replay user
   * sessions, or use the time travelling `redux-devtools`. An action must have
   * a `type` property which may not be `undefined`. It is a good idea to use
   * string constants for action types.
   *
   * @returns {Object} For convenience, the same action object you dispatched.
   *
   * Note that, if you use a custom middleware, it may wrap `dispatch()` to
   * return something else (for example, a Promise you can await).
   */


  function dispatch(action) {
    if (!isPlainObject(action)) {
      throw new Error('Actions must be plain objects. ' + 'Use custom middleware for async actions.');
    }

    if (typeof action.type === 'undefined') {
      throw new Error('Actions may not have an undefined "type" property. ' + 'Have you misspelled a constant?');
    }

    if (isDispatching) {
      throw new Error('Reducers may not dispatch actions.');
    }

    try {
      isDispatching = true;
      currentState = currentReducer(currentState, action);
    } finally {
      isDispatching = false;
    }

    var listeners = currentListeners = nextListeners;

    for (var i = 0; i < listeners.length; i++) {
      var listener = listeners[i];
      listener();
    }

    return action;
  }
  /**
   * Replaces the reducer currently used by the store to calculate the state.
   *
   * You might need this if your app implements code splitting and you want to
   * load some of the reducers dynamically. You might also need this if you
   * implement a hot reloading mechanism for Redux.
   *
   * @param {Function} nextReducer The reducer for the store to use instead.
   * @returns {void}
   */


  function replaceReducer(nextReducer) {
    if (typeof nextReducer !== 'function') {
      throw new Error('Expected the nextReducer to be a function.');
    }

    currentReducer = nextReducer; // This action has a similiar effect to ActionTypes.INIT.
    // Any reducers that existed in both the new and old rootReducer
    // will receive the previous state. This effectively populates
    // the new state tree with any relevant data from the old one.

    dispatch({
      type: ActionTypes.REPLACE
    });
  }
  /**
   * Interoperability point for observable/reactive libraries.
   * @returns {observable} A minimal observable of state changes.
   * For more information, see the observable proposal:
   * https://github.com/tc39/proposal-observable
   */


  function observable() {
    var _ref;

    var outerSubscribe = subscribe;
    return _ref = {
      /**
       * The minimal observable subscription method.
       * @param {Object} observer Any object that can be used as an observer.
       * The observer object should have a `next` method.
       * @returns {subscription} An object with an `unsubscribe` method that can
       * be used to unsubscribe the observable from the store, and prevent further
       * emission of values from the observable.
       */
      subscribe: function subscribe(observer) {
        if (typeof observer !== 'object' || observer === null) {
          throw new TypeError('Expected the observer to be an object.');
        }

        function observeState() {
          if (observer.next) {
            observer.next(getState());
          }
        }

        observeState();
        var unsubscribe = outerSubscribe(observeState);
        return {
          unsubscribe: unsubscribe
        };
      }
    }, _ref[symbol_observable__WEBPACK_IMPORTED_MODULE_0__["default"]] = function () {
      return this;
    }, _ref;
  } // When a store is created, an "INIT" action is dispatched so that every
  // reducer returns their initial state. This effectively populates
  // the initial state tree.


  dispatch({
    type: ActionTypes.INIT
  });
  return _ref2 = {
    dispatch: dispatch,
    subscribe: subscribe,
    getState: getState,
    replaceReducer: replaceReducer
  }, _ref2[symbol_observable__WEBPACK_IMPORTED_MODULE_0__["default"]] = observable, _ref2;
}

/**
 * Prints a warning in the console if it exists.
 *
 * @param {String} message The warning message.
 * @returns {void}
 */
function warning(message) {
  /* eslint-disable no-console */
  if (typeof console !== 'undefined' && typeof console.error === 'function') {
    console.error(message);
  }
  /* eslint-enable no-console */


  try {
    // This error was thrown as a convenience so that if you enable
    // "break on all exceptions" in your console,
    // it would pause the execution at this line.
    throw new Error(message);
  } catch (e) {} // eslint-disable-line no-empty

}

function getUndefinedStateErrorMessage(key, action) {
  var actionType = action && action.type;
  var actionDescription = actionType && "action \"" + String(actionType) + "\"" || 'an action';
  return "Given " + actionDescription + ", reducer \"" + key + "\" returned undefined. " + "To ignore an action, you must explicitly return the previous state. " + "If you want this reducer to hold no value, you can return null instead of undefined.";
}

function getUnexpectedStateShapeWarningMessage(inputState, reducers, action, unexpectedKeyCache) {
  var reducerKeys = Object.keys(reducers);
  var argumentName = action && action.type === ActionTypes.INIT ? 'preloadedState argument passed to createStore' : 'previous state received by the reducer';

  if (reducerKeys.length === 0) {
    return 'Store does not have a valid reducer. Make sure the argument passed ' + 'to combineReducers is an object whose values are reducers.';
  }

  if (!isPlainObject(inputState)) {
    return "The " + argumentName + " has unexpected type of \"" + {}.toString.call(inputState).match(/\s([a-z|A-Z]+)/)[1] + "\". Expected argument to be an object with the following " + ("keys: \"" + reducerKeys.join('", "') + "\"");
  }

  var unexpectedKeys = Object.keys(inputState).filter(function (key) {
    return !reducers.hasOwnProperty(key) && !unexpectedKeyCache[key];
  });
  unexpectedKeys.forEach(function (key) {
    unexpectedKeyCache[key] = true;
  });
  if (action && action.type === ActionTypes.REPLACE) return;

  if (unexpectedKeys.length > 0) {
    return "Unexpected " + (unexpectedKeys.length > 1 ? 'keys' : 'key') + " " + ("\"" + unexpectedKeys.join('", "') + "\" found in " + argumentName + ". ") + "Expected to find one of the known reducer keys instead: " + ("\"" + reducerKeys.join('", "') + "\". Unexpected keys will be ignored.");
  }
}

function assertReducerShape(reducers) {
  Object.keys(reducers).forEach(function (key) {
    var reducer = reducers[key];
    var initialState = reducer(undefined, {
      type: ActionTypes.INIT
    });

    if (typeof initialState === 'undefined') {
      throw new Error("Reducer \"" + key + "\" returned undefined during initialization. " + "If the state passed to the reducer is undefined, you must " + "explicitly return the initial state. The initial state may " + "not be undefined. If you don't want to set a value for this reducer, " + "you can use null instead of undefined.");
    }

    if (typeof reducer(undefined, {
      type: ActionTypes.PROBE_UNKNOWN_ACTION()
    }) === 'undefined') {
      throw new Error("Reducer \"" + key + "\" returned undefined when probed with a random type. " + ("Don't try to handle " + ActionTypes.INIT + " or other actions in \"redux/*\" ") + "namespace. They are considered private. Instead, you must return the " + "current state for any unknown actions, unless it is undefined, " + "in which case you must return the initial state, regardless of the " + "action type. The initial state may not be undefined, but can be null.");
    }
  });
}
/**
 * Turns an object whose values are different reducer functions, into a single
 * reducer function. It will call every child reducer, and gather their results
 * into a single state object, whose keys correspond to the keys of the passed
 * reducer functions.
 *
 * @param {Object} reducers An object whose values correspond to different
 * reducer functions that need to be combined into one. One handy way to obtain
 * it is to use ES6 `import * as reducers` syntax. The reducers may never return
 * undefined for any action. Instead, they should return their initial state
 * if the state passed to them was undefined, and the current state for any
 * unrecognized action.
 *
 * @returns {Function} A reducer function that invokes every reducer inside the
 * passed object, and builds a state object with the same shape.
 */


function combineReducers(reducers) {
  var reducerKeys = Object.keys(reducers);
  var finalReducers = {};

  for (var i = 0; i < reducerKeys.length; i++) {
    var key = reducerKeys[i];

    if (true) {
      if (typeof reducers[key] === 'undefined') {
        warning("No reducer provided for key \"" + key + "\"");
      }
    }

    if (typeof reducers[key] === 'function') {
      finalReducers[key] = reducers[key];
    }
  }

  var finalReducerKeys = Object.keys(finalReducers); // This is used to make sure we don't warn about the same
  // keys multiple times.

  var unexpectedKeyCache;

  if (true) {
    unexpectedKeyCache = {};
  }

  var shapeAssertionError;

  try {
    assertReducerShape(finalReducers);
  } catch (e) {
    shapeAssertionError = e;
  }

  return function combination(state, action) {
    if (state === void 0) {
      state = {};
    }

    if (shapeAssertionError) {
      throw shapeAssertionError;
    }

    if (true) {
      var warningMessage = getUnexpectedStateShapeWarningMessage(state, finalReducers, action, unexpectedKeyCache);

      if (warningMessage) {
        warning(warningMessage);
      }
    }

    var hasChanged = false;
    var nextState = {};

    for (var _i = 0; _i < finalReducerKeys.length; _i++) {
      var _key = finalReducerKeys[_i];
      var reducer = finalReducers[_key];
      var previousStateForKey = state[_key];
      var nextStateForKey = reducer(previousStateForKey, action);

      if (typeof nextStateForKey === 'undefined') {
        var errorMessage = getUndefinedStateErrorMessage(_key, action);
        throw new Error(errorMessage);
      }

      nextState[_key] = nextStateForKey;
      hasChanged = hasChanged || nextStateForKey !== previousStateForKey;
    }

    hasChanged = hasChanged || finalReducerKeys.length !== Object.keys(state).length;
    return hasChanged ? nextState : state;
  };
}

function bindActionCreator(actionCreator, dispatch) {
  return function () {
    return dispatch(actionCreator.apply(this, arguments));
  };
}
/**
 * Turns an object whose values are action creators, into an object with the
 * same keys, but with every function wrapped into a `dispatch` call so they
 * may be invoked directly. This is just a convenience method, as you can call
 * `store.dispatch(MyActionCreators.doSomething())` yourself just fine.
 *
 * For convenience, you can also pass an action creator as the first argument,
 * and get a dispatch wrapped function in return.
 *
 * @param {Function|Object} actionCreators An object whose values are action
 * creator functions. One handy way to obtain it is to use ES6 `import * as`
 * syntax. You may also pass a single function.
 *
 * @param {Function} dispatch The `dispatch` function available on your Redux
 * store.
 *
 * @returns {Function|Object} The object mimicking the original object, but with
 * every action creator wrapped into the `dispatch` call. If you passed a
 * function as `actionCreators`, the return value will also be a single
 * function.
 */


function bindActionCreators(actionCreators, dispatch) {
  if (typeof actionCreators === 'function') {
    return bindActionCreator(actionCreators, dispatch);
  }

  if (typeof actionCreators !== 'object' || actionCreators === null) {
    throw new Error("bindActionCreators expected an object or a function, instead received " + (actionCreators === null ? 'null' : typeof actionCreators) + ". " + "Did you write \"import ActionCreators from\" instead of \"import * as ActionCreators from\"?");
  }

  var boundActionCreators = {};

  for (var key in actionCreators) {
    var actionCreator = actionCreators[key];

    if (typeof actionCreator === 'function') {
      boundActionCreators[key] = bindActionCreator(actionCreator, dispatch);
    }
  }

  return boundActionCreators;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    keys.push.apply(keys, Object.getOwnPropertySymbols(object));
  }

  if (enumerableOnly) keys = keys.filter(function (sym) {
    return Object.getOwnPropertyDescriptor(object, sym).enumerable;
  });
  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(source, true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(source).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

/**
 * Composes single-argument functions from right to left. The rightmost
 * function can take multiple arguments as it provides the signature for
 * the resulting composite function.
 *
 * @param {...Function} funcs The functions to compose.
 * @returns {Function} A function obtained by composing the argument functions
 * from right to left. For example, compose(f, g, h) is identical to doing
 * (...args) => f(g(h(...args))).
 */
function compose() {
  for (var _len = arguments.length, funcs = new Array(_len), _key = 0; _key < _len; _key++) {
    funcs[_key] = arguments[_key];
  }

  if (funcs.length === 0) {
    return function (arg) {
      return arg;
    };
  }

  if (funcs.length === 1) {
    return funcs[0];
  }

  return funcs.reduce(function (a, b) {
    return function () {
      return a(b.apply(void 0, arguments));
    };
  });
}

/**
 * Creates a store enhancer that applies middleware to the dispatch method
 * of the Redux store. This is handy for a variety of tasks, such as expressing
 * asynchronous actions in a concise manner, or logging every action payload.
 *
 * See `redux-thunk` package as an example of the Redux middleware.
 *
 * Because middleware is potentially asynchronous, this should be the first
 * store enhancer in the composition chain.
 *
 * Note that each middleware will be given the `dispatch` and `getState` functions
 * as named arguments.
 *
 * @param {...Function} middlewares The middleware chain to be applied.
 * @returns {Function} A store enhancer applying the middleware.
 */

function applyMiddleware() {
  for (var _len = arguments.length, middlewares = new Array(_len), _key = 0; _key < _len; _key++) {
    middlewares[_key] = arguments[_key];
  }

  return function (createStore) {
    return function () {
      var store = createStore.apply(void 0, arguments);

      var _dispatch = function dispatch() {
        throw new Error('Dispatching while constructing your middleware is not allowed. ' + 'Other middleware would not be applied to this dispatch.');
      };

      var middlewareAPI = {
        getState: store.getState,
        dispatch: function dispatch() {
          return _dispatch.apply(void 0, arguments);
        }
      };
      var chain = middlewares.map(function (middleware) {
        return middleware(middlewareAPI);
      });
      _dispatch = compose.apply(void 0, chain)(store.dispatch);
      return _objectSpread2({}, store, {
        dispatch: _dispatch
      });
    };
  };
}

/*
 * This is a dummy function to check if the function name has been altered by minification.
 * If the function has been minified and NODE_ENV !== 'production', warn the user.
 */

function isCrushed() {}

if ( true && typeof isCrushed.name === 'string' && isCrushed.name !== 'isCrushed') {
  warning('You are currently using minified code outside of NODE_ENV === "production". ' + 'This means that you are running a slower development build of Redux. ' + 'You can use loose-envify (https://github.com/zertosh/loose-envify) for browserify ' + 'or setting mode to production in webpack (https://webpack.js.org/concepts/mode/) ' + 'to ensure you have the correct code for your production build.');
}




/***/ }),

/***/ "./node_modules/symbol-observable/es/index.js":
/*!****************************************************!*\
  !*** ./node_modules/symbol-observable/es/index.js ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global, module) {/* harmony import */ var _ponyfill_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ponyfill.js */ "./node_modules/symbol-observable/es/ponyfill.js");
/* global window */


var root;

if (typeof self !== 'undefined') {
  root = self;
} else if (typeof window !== 'undefined') {
  root = window;
} else if (typeof global !== 'undefined') {
  root = global;
} else if (true) {
  root = module;
} else {}

var result = Object(_ponyfill_js__WEBPACK_IMPORTED_MODULE_0__["default"])(root);
/* harmony default export */ __webpack_exports__["default"] = (result);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js"), __webpack_require__(/*! ./../../webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./node_modules/symbol-observable/es/ponyfill.js":
/*!*******************************************************!*\
  !*** ./node_modules/symbol-observable/es/ponyfill.js ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return symbolObservablePonyfill; });
function symbolObservablePonyfill(root) {
	var result;
	var Symbol = root.Symbol;

	if (typeof Symbol === 'function') {
		if (Symbol.observable) {
			result = Symbol.observable;
		} else {
			result = Symbol('observable');
			Symbol.observable = result;
		}
	} else {
		result = '@@observable';
	}

	return result;
};


/***/ }),

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "./node_modules/webpack/buildin/harmony-module.js":
/*!*******************************************!*\
  !*** (webpack)/buildin/harmony-module.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function(originalModule) {
	if (!originalModule.webpackPolyfill) {
		var module = Object.create(originalModule);
		// module.parent = undefined by default
		if (!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		Object.defineProperty(module, "exports", {
			enumerable: true
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),

/***/ "./node_modules/websocket/lib/browser.js":
/*!***********************************************!*\
  !*** ./node_modules/websocket/lib/browser.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _globalThis;
try {
	_globalThis = __webpack_require__(/*! es5-ext/global */ "./node_modules/es5-ext/global.js");
} catch (error) {
} finally {
	if (!_globalThis && typeof window !== 'undefined') { _globalThis = window; }
	if (!_globalThis) { throw new Error('Could not determine global this'); }
}

var NativeWebSocket = _globalThis.WebSocket || _globalThis.MozWebSocket;
var websocket_version = __webpack_require__(/*! ./version */ "./node_modules/websocket/lib/version.js");


/**
 * Expose a W3C WebSocket class with just one or two arguments.
 */
function W3CWebSocket(uri, protocols) {
	var native_instance;

	if (protocols) {
		native_instance = new NativeWebSocket(uri, protocols);
	}
	else {
		native_instance = new NativeWebSocket(uri);
	}

	/**
	 * 'native_instance' is an instance of nativeWebSocket (the browser's WebSocket
	 * class). Since it is an Object it will be returned as it is when creating an
	 * instance of W3CWebSocket via 'new W3CWebSocket()'.
	 *
	 * ECMAScript 5: http://bclary.com/2004/11/07/#a-13.2.2
	 */
	return native_instance;
}
if (NativeWebSocket) {
	['CONNECTING', 'OPEN', 'CLOSING', 'CLOSED'].forEach(function(prop) {
		Object.defineProperty(W3CWebSocket, prop, {
			get: function() { return NativeWebSocket[prop]; }
		});
	});
}

/**
 * Module exports.
 */
module.exports = {
    'w3cwebsocket' : NativeWebSocket ? W3CWebSocket : null,
    'version'      : websocket_version
};


/***/ }),

/***/ "./node_modules/websocket/lib/version.js":
/*!***********************************************!*\
  !*** ./node_modules/websocket/lib/version.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ../package.json */ "./node_modules/websocket/package.json").version;


/***/ }),

/***/ "./node_modules/websocket/package.json":
/*!*********************************************!*\
  !*** ./node_modules/websocket/package.json ***!
  \*********************************************/
/*! exports provided: name, description, keywords, author, contributors, version, repository, homepage, engines, dependencies, devDependencies, config, scripts, main, directories, browser, license, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"name\":\"websocket\",\"description\":\"Websocket Client & Server Library implementing the WebSocket protocol as specified in RFC 6455.\",\"keywords\":[\"websocket\",\"websockets\",\"socket\",\"networking\",\"comet\",\"push\",\"RFC-6455\",\"realtime\",\"server\",\"client\"],\"author\":\"Brian McKelvey <theturtle32@gmail.com> (https://github.com/theturtle32)\",\"contributors\":[\"Iñaki Baz Castillo <ibc@aliax.net> (http://dev.sipdoc.net)\"],\"version\":\"1.0.31\",\"repository\":{\"type\":\"git\",\"url\":\"https://github.com/theturtle32/WebSocket-Node.git\"},\"homepage\":\"https://github.com/theturtle32/WebSocket-Node\",\"engines\":{\"node\":\">=0.10.0\"},\"dependencies\":{\"debug\":\"^2.2.0\",\"es5-ext\":\"^0.10.50\",\"nan\":\"^2.14.0\",\"typedarray-to-buffer\":\"^3.1.5\",\"yaeti\":\"^0.0.6\"},\"devDependencies\":{\"buffer-equal\":\"^1.0.0\",\"faucet\":\"^0.0.1\",\"gulp\":\"^4.0.2\",\"gulp-jshint\":\"^2.0.4\",\"jshint-stylish\":\"^2.2.1\",\"jshint\":\"^2.0.0\",\"tape\":\"^4.9.1\"},\"config\":{\"verbose\":false},\"scripts\":{\"install\":\"(node-gyp rebuild 2> builderror.log) || (exit 0)\",\"test\":\"faucet test/unit\",\"gulp\":\"gulp\"},\"main\":\"index\",\"directories\":{\"lib\":\"./lib\"},\"browser\":\"lib/browser.js\",\"license\":\"Apache-2.0\"}");

/***/ }),

/***/ "./src/collections/ari.js":
/*!********************************!*\
  !*** ./src/collections/ari.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _handle_error = _interopRequireDefault(__webpack_require__(/*! ../utils/handle_error */ "./src/utils/handle_error.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var transport;
var storage;

var ARI =
/*#__PURE__*/
function () {
  function ARI(container) {
    _classCallCheck(this, ARI);

    transport = container.transport;
    storage = container.storage;
  }

  _createClass(ARI, [{
    key: "get",
    value: function get(filters) {
      return transport.send('GET', 'restrictions', {
        filter: filters
      }).then(function (response) {
        return response;
      })["catch"](function (error) {
        return (0, _handle_error["default"])(error, storage, transport);
      });
    }
  }, {
    key: "availability",
    value: function availability(filters) {
      return transport.send('GET', 'availability', {
        filter: filters
      }).then(function (response) {
        return response;
      })["catch"](function (error) {
        return (0, _handle_error["default"])(error, storage, transport);
      });
    }
  }, {
    key: "update",
    value: function update(attrs) {
      return transport.send('POST', 'restrictions', {
        values: attrs
      }).then(function (response) {
        return response;
      })["catch"](function (error) {
        return (0, _handle_error["default"])(error, storage, transport);
      });
    }
  }, {
    key: "updateAvailability",
    value: function updateAvailability(attrs) {
      return transport.send('POST', 'availability', {
        values: attrs
      }).then(function (response) {
        return response;
      })["catch"](function (error) {
        return (0, _handle_error["default"])(error, storage, transport);
      });
    }
  }]);

  return ARI;
}();

exports["default"] = ARI;
module.exports = exports.default;

/***/ }),

/***/ "./src/collections/auth.js":
/*!*********************************!*\
  !*** ./src/collections/auth.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _groups = _interopRequireDefault(__webpack_require__(/*! ./groups */ "./src/collections/groups.js"));

var _properties = _interopRequireDefault(__webpack_require__(/*! ./properties */ "./src/collections/properties.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var transport;
var storage;

var Auth =
/*#__PURE__*/
function () {
  function Auth(container) {
    _classCallCheck(this, Auth);

    transport = container.transport;
    storage = container.storage;
  }

  _createClass(Auth, [{
    key: "signIn",
    value: function signIn(attrs) {
      return transport.send('POST', 'sign_in', {
        user: attrs
      }).then(function (response) {
        var result = response;

        if (response.data.attributes.token) {
          transport.registerAccessToken(response.data.attributes.token);
          storage.sessionAdd(response.data.attributes);
          storage.userAdd(response.data.relationships.user.data.attributes);
          result = Promise.all([new _groups["default"]({
            transport: transport,
            storage: storage
          }).list(), new _properties["default"]({
            transport: transport,
            storage: storage
          }).list()]).then(function (_) {
            return response;
          });
        }

        return result;
      });
    }
  }, {
    key: "signUp",
    value: function signUp(attrs) {
      return transport.send('POST', 'sign_up', {
        user: attrs
      }).then(function (response) {
        var result = response;

        if (response.data.attributes.token) {
          transport.registerAccessToken(response.data.attributes.token);
          storage.sessionAdd(response.data.attributes);
          storage.userAdd(response.data.relationships.user.data.attributes);
          result = Promise.all([new _groups["default"]({
            transport: transport,
            storage: storage
          }).list(), new _properties["default"]({
            transport: transport,
            storage: storage
          }).list()]).then(function (_) {
            return response;
          });
        }

        return result;
      });
    }
  }, {
    key: "whiteLabelSignUp",
    value: function whiteLabelSignUp(attrs) {
      return transport.send('POST', 'wl_sign_up', {
        user: attrs
      }).then(function (response) {
        if (response.data.attributes.token) {
          transport.registerAccessToken(response.data.attributes.token);
          storage.sessionAdd(response.data.attributes);
        }

        return response;
      });
    }
  }, {
    key: "requestRestorePassword",
    value: function requestRestorePassword(email) {
      return transport.send('POST', 'request_restore_password', {
        user: {
          email: email
        }
      }).then(function (response) {
        return response;
      });
    }
  }, {
    key: "restorePassword",
    value: function restorePassword(attrs) {
      return transport.send('POST', 'restore_password', {
        user: attrs
      }).then(function (response) {
        return response;
      });
    }
  }, {
    key: "confirmRegistration",
    value: function confirmRegistration(token) {
      return transport.send('GET', "confirm_registration?token=".concat(token)).then(function (response) {
        return response;
      });
    }
  }, {
    key: "confirmInvite",
    value: function confirmInvite(attrs) {
      return transport.send('POST', 'confirm_invite', {
        user: attrs
      }).then(function (response) {
        return response;
      });
    }
  }, {
    key: "chooseProperty",
    value: function chooseProperty(property) {
      storage.chooseProperty(property);
    }
  }, {
    key: "chooseGroup",
    value: function chooseGroup(group) {
      storage.chooseGroup(group);
    }
  }]);

  return Auth;
}();

exports["default"] = Auth;
module.exports = exports.default;

/***/ }),

/***/ "./src/collections/bookings.js":
/*!*************************************!*\
  !*** ./src/collections/bookings.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _handle_error = _interopRequireDefault(__webpack_require__(/*! ../utils/handle_error */ "./src/utils/handle_error.js"));

var _relationships_extractor = _interopRequireDefault(__webpack_require__(/*! ../utils/relationships_extractor */ "./src/utils/relationships_extractor.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var transport;
var storage;
var ENDPOINT = 'bookings';

var Bookings =
/*#__PURE__*/
function () {
  function Bookings(container) {
    _classCallCheck(this, Bookings);

    transport = container.transport;
    storage = container.storage;
  }

  _createClass(Bookings, [{
    key: "list",
    value: function list() {
      var filter = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var pagination = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
        page: 1,
        limit: 10
      };
      var order = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {
        inserted_at: 'desc'
      };
      return transport.send('GET', "".concat(ENDPOINT), {
        filter: filter,
        pagination: pagination,
        order: order
      }).then(function (response) {
        storage.bookingsLoad(response.data, response.meta);
        return response;
      })["catch"](function (error) {
        return (0, _handle_error["default"])(error, storage, transport);
      });
    }
  }, {
    key: "find",
    value: function find(id) {
      var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
          relationships = _ref.relationships;

      return transport.send('GET', "".concat(ENDPOINT, "/").concat(id), {
        relationships: relationships
      }).then(function (response) {
        return (0, _relationships_extractor["default"])(response.data);
      })["catch"](function (error) {
        return (0, _handle_error["default"])(error, storage, transport);
      });
    }
  }]);

  return Bookings;
}();

exports["default"] = Bookings;
module.exports = exports.default;

/***/ }),

/***/ "./src/collections/cancellation_policies.js":
/*!**************************************************!*\
  !*** ./src/collections/cancellation_policies.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _handle_error = _interopRequireDefault(__webpack_require__(/*! ../utils/handle_error */ "./src/utils/handle_error.js"));

var _attributes_extractor = _interopRequireDefault(__webpack_require__(/*! ../utils/attributes_extractor */ "./src/utils/attributes_extractor.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var transport;
var storage;
var ENDPOINT = 'cancellation_policies';

var CancellationPolicies =
/*#__PURE__*/
function () {
  function CancellationPolicies(container) {
    _classCallCheck(this, CancellationPolicies);

    transport = container.transport;
    storage = container.storage;
  }

  _createClass(CancellationPolicies, [{
    key: "list",
    value: function list() {
      var filter = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var pagination = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
        page: 1,
        limit: 10
      };
      var order = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {
        inserted_at: 'desc'
      };
      return transport.send('GET', ENDPOINT, {
        filter: filter,
        pagination: pagination,
        order: order
      }).then(function (response) {
        storage.cancellationPoliciesLoad(response.data, response.meta);
        return {
          entities: response.data.map(function (el) {
            return el.attributes;
          }),
          meta: response.meta
        };
      });
    }
  }, {
    key: "options",
    value: function options() {
      var filter = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return transport.send('GET', "".concat(ENDPOINT, "/options"), {
        filter: filter
      }).then(function (_ref) {
        var data = _ref.data;
        return (0, _attributes_extractor["default"])(data);
      })["catch"](function (error) {
        return (0, _handle_error["default"])(error, storage, transport);
      });
    }
  }, {
    key: "find",
    value: function find(id) {
      return transport.send('GET', "".concat(ENDPOINT, "/").concat(id)).then(function (response) {
        storage.cancellationPoliciesAdd(response.data);
        return response;
      });
    }
  }, {
    key: "create",
    value: function create(attrs) {
      return transport.send('POST', ENDPOINT, {
        cancellation_policy: attrs
      }).then(function (response) {
        storage.cancellationPoliciesAdd(response.data);
        return response;
      });
    }
  }, {
    key: "update",
    value: function update(attrs) {
      return transport.send('PUT', "".concat(ENDPOINT, "/").concat(attrs.id), {
        cancellation_policy: attrs
      }).then(function (response) {
        storage.cancellationPoliciesAdd(response.data);
        return response;
      });
    }
  }, {
    key: "remove",
    value: function remove(attrs) {
      return transport.send('DELETE', "".concat(ENDPOINT, "/").concat(attrs.id)).then(function (response) {
        storage.cancellationPoliciesDrop(attrs);
        return response;
      });
    }
  }]);

  return CancellationPolicies;
}();

exports["default"] = CancellationPolicies;
module.exports = exports.default;

/***/ }),

/***/ "./src/collections/channel_events.js":
/*!*******************************************!*\
  !*** ./src/collections/channel_events.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _handle_error = _interopRequireDefault(__webpack_require__(/*! ../utils/handle_error */ "./src/utils/handle_error.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var transport;
var storage;
var ENDPOINT = 'channel_events';

var ChannelEvents =
/*#__PURE__*/
function () {
  function ChannelEvents(container) {
    _classCallCheck(this, ChannelEvents);

    transport = container.transport;
    storage = container.storage;
  }

  _createClass(ChannelEvents, [{
    key: "list",
    value: function list() {
      var filter = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var pagination = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var order = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return transport.send('GET', ENDPOINT, {
        filter: filter,
        pagination: pagination,
        order: order
      }).then(function (response) {
        storage.channelEventsLoad(response.data, response.meta);
        return response;
      })["catch"](function (error) {
        return (0, _handle_error["default"])(error, storage, transport);
      });
    }
  }, {
    key: "find",
    value: function find(event_id) {
      return transport.send('GET', "".concat(ENDPOINT, "/").concat(event_id)).then(function (response) {
        return response;
      })["catch"](function (error) {
        return (0, _handle_error["default"])(error, storage, transport);
      });
    }
  }, {
    key: "loadLogs",
    value: function loadLogs(event_id) {
      return transport.send('GET', "".concat(ENDPOINT, "/").concat(event_id, "/logs")).then(function (response) {
        return response;
      })["catch"](function (error) {
        return (0, _handle_error["default"])(error, storage, transport);
      });
    }
  }, {
    key: "resolveIssue",
    value: function resolveIssue(event_id, solutions) {
      return transport.send('POST', "".concat(ENDPOINT, "/").concat(event_id, "/resolve"), {
        solutions: solutions
      }).then(function (response) {
        return response;
      })["catch"](function (error) {
        return (0, _handle_error["default"])(error, storage, transport);
      });
    }
  }, {
    key: "ignoreIssue",
    value: function ignoreIssue(event_id) {
      return transport.send('GET', "".concat(ENDPOINT, "/").concat(event_id, "/ignore")).then(function (response) {
        return response;
      })["catch"](function (error) {
        return (0, _handle_error["default"])(error, storage, transport);
      });
    }
  }]);

  return ChannelEvents;
}();

exports["default"] = ChannelEvents;
module.exports = exports.default;

/***/ }),

/***/ "./src/collections/channels.js":
/*!*************************************!*\
  !*** ./src/collections/channels.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _handle_error = _interopRequireDefault(__webpack_require__(/*! ../utils/handle_error */ "./src/utils/handle_error.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var transport;
var storage;
var ENDPOINT = 'channels';

var Channels =
/*#__PURE__*/
function () {
  function Channels(container) {
    _classCallCheck(this, Channels);

    transport = container.transport;
    storage = container.storage;
  }

  _createClass(Channels, [{
    key: "list",
    value: function list() {
      var filter = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var pagination = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var order = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return transport.send('GET', ENDPOINT, {
        filter: filter,
        pagination: pagination,
        order: order
      }).then(function (response) {
        storage.channelsLoad(response.data);
        return response;
      })["catch"](function (error) {
        return (0, _handle_error["default"])(error, storage, transport);
      });
    }
  }, {
    key: "health",
    value: function health() {
      var filter = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var pagination = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var order = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return transport.send('GET', "".concat(ENDPOINT, "/health"), {
        filter: filter,
        pagination: pagination,
        order: order
      }).then(function (response) {
        storage.channelsHealthLoad(response.data, response.meta);
        return response;
      })["catch"](function (error) {
        return (0, _handle_error["default"])(error, storage, transport);
      });
    }
  }, {
    key: "find",
    value: function find(id) {
      return transport.send('GET', "".concat(ENDPOINT, "/").concat(id)).then(function (response) {
        storage.channelsAdd(response.data);
        return response;
      })["catch"](function (error) {
        return (0, _handle_error["default"])(error, storage, transport);
      });
    }
  }, {
    key: "create",
    value: function create(attrs) {
      return transport.send('POST', ENDPOINT, {
        channel: attrs
      }).then(function (response) {
        storage.channelsAdd(response.data);
        return response;
      })["catch"](function (error) {
        return (0, _handle_error["default"])(error, storage, transport);
      });
    }
  }, {
    key: "update",
    value: function update(attrs) {
      return transport.send('PUT', "".concat(ENDPOINT, "/").concat(attrs.id), {
        channel: attrs
      }).then(function (response) {
        storage.channelsAdd(response.data);
        return response;
      })["catch"](function (error) {
        return (0, _handle_error["default"])(error, storage, transport);
      });
    }
  }, {
    key: "full_sync",
    value: function full_sync(channel_id) {
      return transport.send('POST', "".concat(ENDPOINT, "/").concat(channel_id, "/full_sync"), {}).then(function (response) {
        return response;
      })["catch"](function (error) {
        return (0, _handle_error["default"])(error, storage, transport);
      });
    }
  }, {
    key: "remove",
    value: function remove(attrs) {
      return transport.send('DELETE', "".concat(ENDPOINT, "/").concat(attrs.id)).then(function (response) {
        storage.channelsDrop(attrs);
        return response;
      })["catch"](function (error) {
        return (0, _handle_error["default"])(error, storage, transport);
      });
    }
  }, {
    key: "available_to_connect",
    value: function available_to_connect() {
      return transport.send('GET', "".concat(ENDPOINT, "/list")).then(function (response) {
        return response;
      })["catch"](function (error) {
        return (0, _handle_error["default"])(error, storage, transport);
      });
    }
  }, {
    key: "get_mapping_details",
    value: function get_mapping_details(attrs) {
      return transport.send('POST', "".concat(ENDPOINT, "/mapping_details"), attrs).then(function (response) {
        return response;
      })["catch"](function (error) {
        return (0, _handle_error["default"])(error, storage, transport);
      });
    }
  }, {
    key: "test_connection",
    value: function test_connection(attrs) {
      return transport.send('POST', "".concat(ENDPOINT, "/test_connection"), attrs).then(function (response) {
        return response;
      })["catch"](function (error) {
        return (0, _handle_error["default"])(error, storage, transport);
      });
    }
  }, {
    key: "airbnb_publish_listing",
    value: function airbnb_publish_listing(channel_id, listing_id) {
      return transport.send('PUT', "".concat(ENDPOINT, "/").concat(channel_id, "/execute/publish"), {
        listing_id: listing_id
      }).then(function (response) {
        return response.data;
      })["catch"](function (error) {
        return (0, _handle_error["default"])(error, storage, transport);
      });
    }
  }, {
    key: "airbnb_unpublish_listing",
    value: function airbnb_unpublish_listing(channel_id, listing_id) {
      return transport.send('PUT', "".concat(ENDPOINT, "/").concat(channel_id, "/execute/unpublish"), {
        listing_id: listing_id
      }).then(function (response) {
        return response.data;
      })["catch"](function (error) {
        return (0, _handle_error["default"])(error, storage, transport);
      });
    }
  }, {
    key: "airbnb_update_listing_pricing",
    value: function airbnb_update_listing_pricing(channel_id, attrs) {
      return transport.send('PUT', "".concat(ENDPOINT, "/").concat(channel_id, "/execute/update_pricing_setting"), attrs).then(function (response) {
        return response.data;
      })["catch"](function (error) {
        return (0, _handle_error["default"])(error, storage, transport);
      });
    }
  }, {
    key: "airbnb_update_listing_availability",
    value: function airbnb_update_listing_availability(channel_id, attrs) {
      return transport.send('PUT', "".concat(ENDPOINT, "/").concat(channel_id, "/execute/update_availability_rule"), attrs).then(function (response) {
        return response.data;
      })["catch"](function (error) {
        return (0, _handle_error["default"])(error, storage, transport);
      });
    }
  }, {
    key: "airbnb_get_channel_rate_plan",
    value: function airbnb_get_channel_rate_plan(channel_rate_plan_id) {
      return transport.send('GET', "channel_rate_plans/".concat(channel_rate_plan_id)).then(function (response) {
        return response.data;
      })["catch"](function (error) {
        return (0, _handle_error["default"])(error, storage, transport);
      });
    }
  }]);

  return Channels;
}();

exports["default"] = Channels;
module.exports = exports.default;

/***/ }),

/***/ "./src/collections/custom_availability_offsets.js":
/*!********************************************************!*\
  !*** ./src/collections/custom_availability_offsets.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _handle_error = _interopRequireDefault(__webpack_require__(/*! ../utils/handle_error */ "./src/utils/handle_error.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var transport;
var storage;
var ENDPOINT = 'custom_availability_offset';

var CustomAvailabilityOffsets =
/*#__PURE__*/
function () {
  function CustomAvailabilityOffsets(container) {
    _classCallCheck(this, CustomAvailabilityOffsets);

    transport = container.transport;
    storage = container.storage;
  }

  _createClass(CustomAvailabilityOffsets, [{
    key: "list",
    value: function list() {
      var filters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return transport.send('GET', ENDPOINT, {
        filter: filters
      }).then(function (response) {
        return response;
      })["catch"](function (error) {
        return (0, _handle_error["default"])(error, storage, transport);
      });
    }
  }, {
    key: "create",
    value: function create(attrs) {
      return transport.send('POST', ENDPOINT, {
        value: attrs
      }).then(function (response) {
        return response;
      })["catch"](function (error) {
        return (0, _handle_error["default"])(error, storage, transport);
      });
    }
  }, {
    key: "remove",
    value: function remove() {
      var filters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return transport.send('DELETE', ENDPOINT, {
        filter: filters
      }).then(function (response) {
        return response;
      })["catch"](function (error) {
        return (0, _handle_error["default"])(error, storage, transport);
      });
    }
  }]);

  return CustomAvailabilityOffsets;
}();

exports["default"] = CustomAvailabilityOffsets;
module.exports = exports.default;

/***/ }),

/***/ "./src/collections/custom_closed_to_arrivals.js":
/*!******************************************************!*\
  !*** ./src/collections/custom_closed_to_arrivals.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _handle_error = _interopRequireDefault(__webpack_require__(/*! ../utils/handle_error */ "./src/utils/handle_error.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var transport;
var storage;
var ENDPOINT = 'custom_closed_to_arrival';

var CustomClosedToArrivals =
/*#__PURE__*/
function () {
  function CustomClosedToArrivals(container) {
    _classCallCheck(this, CustomClosedToArrivals);

    transport = container.transport;
    storage = container.storage;
  }

  _createClass(CustomClosedToArrivals, [{
    key: "list",
    value: function list() {
      var filters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return transport.send('GET', ENDPOINT, {
        filter: filters
      }).then(function (response) {
        return response;
      })["catch"](function (error) {
        return (0, _handle_error["default"])(error, storage, transport);
      });
    }
  }, {
    key: "create",
    value: function create(attrs) {
      return transport.send('POST', ENDPOINT, {
        value: attrs
      }).then(function (response) {
        return response;
      })["catch"](function (error) {
        return (0, _handle_error["default"])(error, storage, transport);
      });
    }
  }, {
    key: "remove",
    value: function remove() {
      var filters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return transport.send('DELETE', ENDPOINT, {
        filter: filters
      }).then(function (response) {
        return response;
      })["catch"](function (error) {
        return (0, _handle_error["default"])(error, storage, transport);
      });
    }
  }]);

  return CustomClosedToArrivals;
}();

exports["default"] = CustomClosedToArrivals;
module.exports = exports.default;

/***/ }),

/***/ "./src/collections/custom_closed_to_departures.js":
/*!********************************************************!*\
  !*** ./src/collections/custom_closed_to_departures.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _handle_error = _interopRequireDefault(__webpack_require__(/*! ../utils/handle_error */ "./src/utils/handle_error.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var transport;
var storage;
var ENDPOINT = 'custom_closed_to_departure';

var CustomClosedToDepartures =
/*#__PURE__*/
function () {
  function CustomClosedToDepartures(container) {
    _classCallCheck(this, CustomClosedToDepartures);

    transport = container.transport;
    storage = container.storage;
  }

  _createClass(CustomClosedToDepartures, [{
    key: "list",
    value: function list() {
      var filters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return transport.send('GET', ENDPOINT, {
        filter: filters
      }).then(function (response) {
        return response;
      })["catch"](function (error) {
        return (0, _handle_error["default"])(error, storage, transport);
      });
    }
  }, {
    key: "create",
    value: function create(attrs) {
      return transport.send('POST', ENDPOINT, {
        value: attrs
      }).then(function (response) {
        return response;
      })["catch"](function (error) {
        return (0, _handle_error["default"])(error, storage, transport);
      });
    }
  }, {
    key: "remove",
    value: function remove() {
      var filters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return transport.send('DELETE', ENDPOINT, {
        filter: filters
      }).then(function (response) {
        return response;
      })["catch"](function (error) {
        return (0, _handle_error["default"])(error, storage, transport);
      });
    }
  }]);

  return CustomClosedToDepartures;
}();

exports["default"] = CustomClosedToDepartures;
module.exports = exports.default;

/***/ }),

/***/ "./src/collections/custom_derived_options.js":
/*!***************************************************!*\
  !*** ./src/collections/custom_derived_options.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _handle_error = _interopRequireDefault(__webpack_require__(/*! ../utils/handle_error */ "./src/utils/handle_error.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var transport;
var storage;
var ENDPOINT = 'custom_derived_option';

var CustomDerivedOptions =
/*#__PURE__*/
function () {
  function CustomDerivedOptions(container) {
    _classCallCheck(this, CustomDerivedOptions);

    transport = container.transport;
    storage = container.storage;
  }

  _createClass(CustomDerivedOptions, [{
    key: "list",
    value: function list() {
      var filters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return transport.send('GET', ENDPOINT, {
        filter: filters
      }).then(function (response) {
        return response;
      })["catch"](function (error) {
        return (0, _handle_error["default"])(error, storage, transport);
      });
    }
  }, {
    key: "create",
    value: function create(attrs) {
      return transport.send('POST', ENDPOINT, {
        value: attrs
      }).then(function (response) {
        return response;
      })["catch"](function (error) {
        return (0, _handle_error["default"])(error, storage, transport);
      });
    }
  }, {
    key: "remove",
    value: function remove() {
      var filters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return transport.send('DELETE', ENDPOINT, {
        filter: filters
      }).then(function (response) {
        return response;
      })["catch"](function (error) {
        return (0, _handle_error["default"])(error, storage, transport);
      });
    }
  }]);

  return CustomDerivedOptions;
}();

exports["default"] = CustomDerivedOptions;
module.exports = exports.default;

/***/ }),

/***/ "./src/collections/custom_max_availabilities.js":
/*!******************************************************!*\
  !*** ./src/collections/custom_max_availabilities.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _handle_error = _interopRequireDefault(__webpack_require__(/*! ../utils/handle_error */ "./src/utils/handle_error.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var transport;
var storage;
var ENDPOINT = 'custom_max_availability';

var CustomMaxAvailabilities =
/*#__PURE__*/
function () {
  function CustomMaxAvailabilities(container) {
    _classCallCheck(this, CustomMaxAvailabilities);

    transport = container.transport;
    storage = container.storage;
  }

  _createClass(CustomMaxAvailabilities, [{
    key: "list",
    value: function list() {
      var filters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return transport.send('GET', ENDPOINT, {
        filter: filters
      }).then(function (response) {
        return response;
      })["catch"](function (error) {
        return (0, _handle_error["default"])(error, storage, transport);
      });
    }
  }, {
    key: "create",
    value: function create(attrs) {
      return transport.send('POST', ENDPOINT, {
        value: attrs
      }).then(function (response) {
        return response;
      })["catch"](function (error) {
        return (0, _handle_error["default"])(error, storage, transport);
      });
    }
  }, {
    key: "remove",
    value: function remove() {
      var filters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return transport.send('DELETE', ENDPOINT, {
        filter: filters
      }).then(function (response) {
        return response;
      })["catch"](function (error) {
        return (0, _handle_error["default"])(error, storage, transport);
      });
    }
  }]);

  return CustomMaxAvailabilities;
}();

exports["default"] = CustomMaxAvailabilities;
module.exports = exports.default;

/***/ }),

/***/ "./src/collections/custom_max_sells.js":
/*!*********************************************!*\
  !*** ./src/collections/custom_max_sells.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _handle_error = _interopRequireDefault(__webpack_require__(/*! ../utils/handle_error */ "./src/utils/handle_error.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var transport;
var storage;
var ENDPOINT = 'custom_max_sell';

var CustomMaxSells =
/*#__PURE__*/
function () {
  function CustomMaxSells(container) {
    _classCallCheck(this, CustomMaxSells);

    transport = container.transport;
    storage = container.storage;
  }

  _createClass(CustomMaxSells, [{
    key: "list",
    value: function list() {
      var filters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return transport.send('GET', ENDPOINT, {
        filter: filters
      }).then(function (response) {
        return response;
      })["catch"](function (error) {
        return (0, _handle_error["default"])(error, storage, transport);
      });
    }
  }, {
    key: "create",
    value: function create(attrs) {
      return transport.send('POST', ENDPOINT, {
        value: attrs
      }).then(function (response) {
        return response;
      })["catch"](function (error) {
        return (0, _handle_error["default"])(error, storage, transport);
      });
    }
  }, {
    key: "remove",
    value: function remove() {
      var filters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return transport.send('DELETE', ENDPOINT, {
        filter: filters
      }).then(function (response) {
        return response;
      })["catch"](function (error) {
        return (0, _handle_error["default"])(error, storage, transport);
      });
    }
  }]);

  return CustomMaxSells;
}();

exports["default"] = CustomMaxSells;
module.exports = exports.default;

/***/ }),

/***/ "./src/collections/custom_max_stays.js":
/*!*********************************************!*\
  !*** ./src/collections/custom_max_stays.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _handle_error = _interopRequireDefault(__webpack_require__(/*! ../utils/handle_error */ "./src/utils/handle_error.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var transport;
var storage;
var ENDPOINT = 'custom_max_stay';

var CustomMaxStays =
/*#__PURE__*/
function () {
  function CustomMaxStays(container) {
    _classCallCheck(this, CustomMaxStays);

    transport = container.transport;
    storage = container.storage;
  }

  _createClass(CustomMaxStays, [{
    key: "list",
    value: function list() {
      var filters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return transport.send('GET', ENDPOINT, {
        filter: filters
      }).then(function (response) {
        return response;
      })["catch"](function (error) {
        return (0, _handle_error["default"])(error, storage, transport);
      });
    }
  }, {
    key: "create",
    value: function create(attrs) {
      return transport.send('POST', ENDPOINT, {
        value: attrs
      }).then(function (response) {
        return response;
      })["catch"](function (error) {
        return (0, _handle_error["default"])(error, storage, transport);
      });
    }
  }, {
    key: "remove",
    value: function remove() {
      var filters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return transport.send('DELETE', ENDPOINT, {
        filter: filters
      }).then(function (response) {
        return response;
      })["catch"](function (error) {
        return (0, _handle_error["default"])(error, storage, transport);
      });
    }
  }]);

  return CustomMaxStays;
}();

exports["default"] = CustomMaxStays;
module.exports = exports.default;

/***/ }),

/***/ "./src/collections/custom_min_stay_arrivals.js":
/*!*****************************************************!*\
  !*** ./src/collections/custom_min_stay_arrivals.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _handle_error = _interopRequireDefault(__webpack_require__(/*! ../utils/handle_error */ "./src/utils/handle_error.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var transport;
var storage;
var ENDPOINT = 'custom_min_stay_arrival';

var CustomMinStayArrivals =
/*#__PURE__*/
function () {
  function CustomMinStayArrivals(container) {
    _classCallCheck(this, CustomMinStayArrivals);

    transport = container.transport;
    storage = container.storage;
  }

  _createClass(CustomMinStayArrivals, [{
    key: "list",
    value: function list() {
      var filters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return transport.send('GET', ENDPOINT, {
        filter: filters
      }).then(function (response) {
        return response;
      })["catch"](function (error) {
        return (0, _handle_error["default"])(error, storage, transport);
      });
    }
  }, {
    key: "create",
    value: function create(attrs) {
      return transport.send('POST', ENDPOINT, {
        value: attrs
      }).then(function (response) {
        return response;
      })["catch"](function (error) {
        return (0, _handle_error["default"])(error, storage, transport);
      });
    }
  }, {
    key: "remove",
    value: function remove() {
      var filters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return transport.send('DELETE', ENDPOINT, {
        filter: filters
      }).then(function (response) {
        return response;
      })["catch"](function (error) {
        return (0, _handle_error["default"])(error, storage, transport);
      });
    }
  }]);

  return CustomMinStayArrivals;
}();

exports["default"] = CustomMinStayArrivals;
module.exports = exports.default;

/***/ }),

/***/ "./src/collections/custom_min_stay_throughs.js":
/*!*****************************************************!*\
  !*** ./src/collections/custom_min_stay_throughs.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _handle_error = _interopRequireDefault(__webpack_require__(/*! ../utils/handle_error */ "./src/utils/handle_error.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var transport;
var storage;
var ENDPOINT = 'custom_min_stay_through';

var CustomMinStayThroughs =
/*#__PURE__*/
function () {
  function CustomMinStayThroughs(container) {
    _classCallCheck(this, CustomMinStayThroughs);

    transport = container.transport;
    storage = container.storage;
  }

  _createClass(CustomMinStayThroughs, [{
    key: "list",
    value: function list() {
      var filters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return transport.send('GET', ENDPOINT, {
        filter: filters
      }).then(function (response) {
        return response;
      })["catch"](function (error) {
        return (0, _handle_error["default"])(error, storage, transport);
      });
    }
  }, {
    key: "create",
    value: function create(attrs) {
      return transport.send('POST', ENDPOINT, {
        value: attrs
      }).then(function (response) {
        return response;
      })["catch"](function (error) {
        return (0, _handle_error["default"])(error, storage, transport);
      });
    }
  }, {
    key: "remove",
    value: function remove() {
      var filters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return transport.send('DELETE', ENDPOINT, {
        filter: filters
      }).then(function (response) {
        return response;
      })["catch"](function (error) {
        return (0, _handle_error["default"])(error, storage, transport);
      });
    }
  }]);

  return CustomMinStayThroughs;
}();

exports["default"] = CustomMinStayThroughs;
module.exports = exports.default;

/***/ }),

/***/ "./src/collections/custom_rates.js":
/*!*****************************************!*\
  !*** ./src/collections/custom_rates.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _handle_error = _interopRequireDefault(__webpack_require__(/*! ../utils/handle_error */ "./src/utils/handle_error.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var transport;
var storage;
var ENDPOINT = 'custom_rate';

var CustomRates =
/*#__PURE__*/
function () {
  function CustomRates(container) {
    _classCallCheck(this, CustomRates);

    transport = container.transport;
    storage = container.storage;
  }

  _createClass(CustomRates, [{
    key: "list",
    value: function list() {
      var filters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return transport.send('GET', ENDPOINT, {
        filter: filters
      }).then(function (response) {
        return response;
      })["catch"](function (error) {
        return (0, _handle_error["default"])(error, storage, transport);
      });
    }
  }, {
    key: "create",
    value: function create(attrs) {
      return transport.send('POST', ENDPOINT, {
        value: attrs
      }).then(function (response) {
        return response;
      })["catch"](function (error) {
        return (0, _handle_error["default"])(error, storage, transport);
      });
    }
  }, {
    key: "remove",
    value: function remove() {
      var filters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return transport.send('DELETE', ENDPOINT, {
        filter: filters
      }).then(function (response) {
        return response;
      })["catch"](function (error) {
        return (0, _handle_error["default"])(error, storage, transport);
      });
    }
  }]);

  return CustomRates;
}();

exports["default"] = CustomRates;
module.exports = exports.default;

/***/ }),

/***/ "./src/collections/custom_stop_sells.js":
/*!**********************************************!*\
  !*** ./src/collections/custom_stop_sells.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _handle_error = _interopRequireDefault(__webpack_require__(/*! ../utils/handle_error */ "./src/utils/handle_error.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var transport;
var storage;
var ENDPOINT = 'custom_stop_sell';

var CustomStopSells =
/*#__PURE__*/
function () {
  function CustomStopSells(container) {
    _classCallCheck(this, CustomStopSells);

    transport = container.transport;
    storage = container.storage;
  }

  _createClass(CustomStopSells, [{
    key: "list",
    value: function list() {
      var filters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return transport.send('GET', ENDPOINT, {
        filter: filters
      }).then(function (response) {
        return response;
      })["catch"](function (error) {
        return (0, _handle_error["default"])(error, storage, transport);
      });
    }
  }, {
    key: "create",
    value: function create(attrs) {
      return transport.send('POST', ENDPOINT, {
        value: attrs
      }).then(function (response) {
        return response;
      })["catch"](function (error) {
        return (0, _handle_error["default"])(error, storage, transport);
      });
    }
  }, {
    key: "remove",
    value: function remove() {
      var filters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return transport.send('DELETE', ENDPOINT, {
        filter: filters
      }).then(function (response) {
        return response;
      })["catch"](function (error) {
        return (0, _handle_error["default"])(error, storage, transport);
      });
    }
  }]);

  return CustomStopSells;
}();

exports["default"] = CustomStopSells;
module.exports = exports.default;

/***/ }),

/***/ "./src/collections/email_templates.js":
/*!********************************************!*\
  !*** ./src/collections/email_templates.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _handle_error = _interopRequireDefault(__webpack_require__(/*! ../utils/handle_error */ "./src/utils/handle_error.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var transport;
var storage;
var ENDPOINT = 'email_templates';

var EmailTemplates =
/*#__PURE__*/
function () {
  function EmailTemplates(container) {
    _classCallCheck(this, EmailTemplates);

    transport = container.transport;
    storage = container.storage;
  }

  _createClass(EmailTemplates, [{
    key: "list",
    value: function list() {
      var filters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return transport.send('GET', ENDPOINT, {
        filter: filters
      }).then(function (response) {
        storage.emailTemplatesLoad(response.data);
        return response.data;
      })["catch"](function (error) {
        return (0, _handle_error["default"])(error, storage, transport);
      });
    }
  }, {
    key: "find",
    value: function find(id) {
      return transport.send('GET', "".concat(ENDPOINT, "/").concat(id)).then(function (response) {
        storage.emailTemplatesAdd(response.data);
        return response;
      })["catch"](function (error) {
        return (0, _handle_error["default"])(error, storage, transport);
      });
    }
  }, {
    key: "create",
    value: function create(attrs) {
      return transport.send('POST', ENDPOINT, {
        email_template: attrs
      }).then(function (response) {
        storage.emailTemplatesAdd(response.data);
        return response;
      })["catch"](function (error) {
        return (0, _handle_error["default"])(error, storage, transport);
      });
    }
  }, {
    key: "update",
    value: function update(attrs) {
      return transport.send('PUT', "".concat(ENDPOINT, "/").concat(attrs.id), {
        email_template: attrs
      }).then(function (response) {
        storage.emailTemplatesAdd(response.data);
        return response;
      })["catch"](function (error) {
        return (0, _handle_error["default"])(error, storage, transport);
      });
    }
  }]);

  return EmailTemplates;
}();

exports["default"] = EmailTemplates;
module.exports = exports.default;

/***/ }),

/***/ "./src/collections/geocoding.js":
/*!**************************************!*\
  !*** ./src/collections/geocoding.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _handle_error = _interopRequireDefault(__webpack_require__(/*! ../utils/handle_error */ "./src/utils/handle_error.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var transport;
var storage;
var ENDPOINT = 'geocoding';

var Geocoding =
/*#__PURE__*/
function () {
  function Geocoding(container) {
    _classCallCheck(this, Geocoding);

    transport = container.transport;
    storage = container.storage;
  }

  _createClass(Geocoding, [{
    key: "getByAddress",
    value: function getByAddress() {
      var address = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      return transport.send('GET', ENDPOINT, {
        address: address
      }).then(function (response) {
        return response.data;
      })["catch"](function (error) {
        return (0, _handle_error["default"])(error, storage, transport);
      });
    }
  }, {
    key: "getByLocation",
    value: function getByLocation() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var lat = params.lat,
          lon = params.lon;
      var location = "".concat(lat, ":").concat(lon);
      return transport.send('GET', ENDPOINT, {
        location: location
      }).then(function (response) {
        return response.data;
      })["catch"](function (error) {
        return (0, _handle_error["default"])(error, storage, transport);
      });
    }
  }]);

  return Geocoding;
}();

exports["default"] = Geocoding;
module.exports = exports.default;

/***/ }),

/***/ "./src/collections/group_users.js":
/*!****************************************!*\
  !*** ./src/collections/group_users.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _relationships_extractor = _interopRequireDefault(__webpack_require__(/*! ../utils/relationships_extractor */ "./src/utils/relationships_extractor.js"));

var _handle_error = _interopRequireDefault(__webpack_require__(/*! ../utils/handle_error */ "./src/utils/handle_error.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var transport;
var storage;
var ENDPOINT = 'group_users';

var GroupUsers =
/*#__PURE__*/
function () {
  function GroupUsers(container) {
    _classCallCheck(this, GroupUsers);

    transport = container.transport;
    storage = container.storage;
  }

  _createClass(GroupUsers, [{
    key: "list",
    value: function list() {
      var filters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return transport.send('GET', ENDPOINT, {
        filter: filters
      }).then(function (response) {
        return (0, _relationships_extractor["default"])(response.data);
      })["catch"](function (error) {
        return (0, _handle_error["default"])(error, storage, transport);
      });
    }
  }, {
    key: "find",
    value: function find(id) {
      return transport.send('GET', "".concat(ENDPOINT, "/").concat(id)).then(function (response) {
        return (0, _relationships_extractor["default"])(response.data);
      })["catch"](function (error) {
        return (0, _handle_error["default"])(error, storage, transport);
      });
    }
  }, {
    key: "invite",
    value: function invite(attrs) {
      return transport.send('POST', ENDPOINT, {
        invite: attrs
      }).then(function (response) {
        return (0, _relationships_extractor["default"])(response.data);
      })["catch"](function (error) {
        return (0, _handle_error["default"])(error, storage, transport);
      });
    }
  }, {
    key: "update",
    value: function update(attrs) {
      return transport.send('PUT', "".concat(ENDPOINT, "/").concat(attrs.id), {
        group_user: attrs
      }).then(function (response) {
        return (0, _relationships_extractor["default"])(response.data);
      })["catch"](function (error) {
        return (0, _handle_error["default"])(error, storage, transport);
      });
    }
  }, {
    key: "revokeAccess",
    value: function revokeAccess(id) {
      return transport.send('DELETE', "".concat(ENDPOINT, "/").concat(id)).then(function (response) {
        return response;
      })["catch"](function (error) {
        return (0, _handle_error["default"])(error, storage, transport);
      });
    }
  }]);

  return GroupUsers;
}();

exports["default"] = GroupUsers;
module.exports = exports.default;

/***/ }),

/***/ "./src/collections/groups.js":
/*!***********************************!*\
  !*** ./src/collections/groups.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _properties = _interopRequireDefault(__webpack_require__(/*! ./properties */ "./src/collections/properties.js"));

var _handle_error = _interopRequireDefault(__webpack_require__(/*! ../utils/handle_error */ "./src/utils/handle_error.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var transport;
var storage;
var ENDPOINT = 'groups';

var Groups =
/*#__PURE__*/
function () {
  function Groups(container) {
    _classCallCheck(this, Groups);

    transport = container.transport;
    storage = container.storage;
  }

  _createClass(Groups, [{
    key: "list",
    value: function list() {
      var filter = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var pagination = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var order = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return transport.send('GET', ENDPOINT, {
        filter: filter,
        pagination: pagination,
        order: order
      }).then(function (response) {
        storage.groupsLoad(response.data);
        return response;
      })["catch"](function (error) {
        return (0, _handle_error["default"])(error, storage, transport);
      });
    }
  }, {
    key: "find",
    value: function find(id) {
      return transport.send('GET', "".concat(ENDPOINT, "/").concat(id)).then(function (response) {
        storage.groupsAdd(response.data);
        return response;
      })["catch"](function (error) {
        return (0, _handle_error["default"])(error, storage, transport);
      });
    }
  }, {
    key: "create",
    value: function create(attrs) {
      return transport.send('POST', ENDPOINT, {
        group: attrs
      }).then(function (response) {
        storage.groupsAdd(response.data);
        return response;
      })["catch"](function (error) {
        return (0, _handle_error["default"])(error, storage, transport);
      });
    }
  }, {
    key: "update",
    value: function update(attrs) {
      return transport.send('PUT', "".concat(ENDPOINT, "/").concat(attrs.id), {
        group: attrs
      }).then(function (response) {
        storage.groupsAdd(response.data);
        return response;
      })["catch"](function (error) {
        return (0, _handle_error["default"])(error, storage, transport);
      });
    }
  }, {
    key: "remove",
    value: function remove(attrs) {
      return transport.send('DELETE', "".concat(ENDPOINT, "/").concat(attrs.id)).then(function (response) {
        storage.groupsDrop(attrs);
        return response;
      })["catch"](function (error) {
        return (0, _handle_error["default"])(error, storage, transport);
      });
    }
  }, {
    key: "addProperty",
    value: function addProperty(group, property_id) {
      var _this = this;

      return transport.send('POST', "".concat(ENDPOINT, "/").concat(group.id, "/properties/").concat(property_id), {}).then(function (response) {
        Promise.all([_this.find(group.id), new _properties["default"]({
          transport: transport,
          storage: storage
        }).find(property_id)]).then(function (_) {
          return response;
        });
      })["catch"](function (error) {
        return (0, _handle_error["default"])(error, storage, transport);
      });
    }
  }, {
    key: "removeProperty",
    value: function removeProperty(group, property_id) {
      var _this2 = this;

      return transport.send('DELETE', "".concat(ENDPOINT, "/").concat(group.id, "/properties/").concat(property_id)).then(function (response) {
        Promise.all([_this2.find(group.id), new _properties["default"]({
          transport: transport,
          storage: storage
        }).find(property_id)]).then(function (_) {
          return response;
        });
      })["catch"](function (error) {
        return (0, _handle_error["default"])(error, storage, transport);
      });
    }
  }]);

  return Groups;
}();

exports["default"] = Groups;
module.exports = exports.default;

/***/ }),

/***/ "./src/collections/hotel_policies.js":
/*!*******************************************!*\
  !*** ./src/collections/hotel_policies.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var transport;
var storage;
var ENDPOINT = 'hotel_policies';

var HotelPolicies =
/*#__PURE__*/
function () {
  function HotelPolicies(container) {
    _classCallCheck(this, HotelPolicies);

    transport = container.transport;
    storage = container.storage;
  }

  _createClass(HotelPolicies, [{
    key: "list",
    value: function list() {
      var filter = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var pagination = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
        page: 1,
        limit: 10
      };
      var order = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {
        inserted_at: 'desc'
      };
      return transport.send('GET', ENDPOINT, {
        filter: filter,
        pagination: pagination,
        order: order
      }).then(function (response) {
        storage.hotelPoliciesLoad(response.data, response.meta);
        return {
          entities: response.data.map(function (el) {
            return el.attributes;
          }),
          meta: response.meta
        };
      });
    }
  }, {
    key: "find",
    value: function find(id) {
      return transport.send('GET', "".concat(ENDPOINT, "/").concat(id)).then(function (response) {
        storage.hotelPoliciesAdd(response.data);
        return response;
      });
    }
  }, {
    key: "create",
    value: function create(attrs) {
      return transport.send('POST', ENDPOINT, {
        hotel_policy: attrs
      }).then(function (response) {
        storage.hotelPoliciesAdd(response.data);
        return response;
      });
    }
  }, {
    key: "update",
    value: function update(attrs) {
      return transport.send('PUT', "".concat(ENDPOINT, "/").concat(attrs.id), {
        hotel_policy: attrs
      }).then(function (response) {
        storage.hotelPoliciesAdd(response.data);
        return response;
      });
    }
  }, {
    key: "remove",
    value: function remove(attrs) {
      return transport.send('DELETE', "".concat(ENDPOINT, "/").concat(attrs.id)).then(function (response) {
        storage.hotelPoliciesDrop(attrs);
        return response;
      });
    }
  }]);

  return HotelPolicies;
}();

exports["default"] = HotelPolicies;
module.exports = exports.default;

/***/ }),

/***/ "./src/collections/index.js":
/*!**********************************!*\
  !*** ./src/collections/index.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _auth = _interopRequireDefault(__webpack_require__(/*! ./auth */ "./src/collections/auth.js"));

var _properties = _interopRequireDefault(__webpack_require__(/*! ./properties */ "./src/collections/properties.js"));

var _room_types = _interopRequireDefault(__webpack_require__(/*! ./room_types */ "./src/collections/room_types.js"));

var _rate_plans = _interopRequireDefault(__webpack_require__(/*! ./rate_plans */ "./src/collections/rate_plans.js"));

var _rate_categories = _interopRequireDefault(__webpack_require__(/*! ./rate_categories */ "./src/collections/rate_categories.js"));

var _ari = _interopRequireDefault(__webpack_require__(/*! ./ari */ "./src/collections/ari.js"));

var _channels = _interopRequireDefault(__webpack_require__(/*! ./channels */ "./src/collections/channels.js"));

var _channel_events = _interopRequireDefault(__webpack_require__(/*! ./channel_events */ "./src/collections/channel_events.js"));

var _custom_rates = _interopRequireDefault(__webpack_require__(/*! ./custom_rates */ "./src/collections/custom_rates.js"));

var _custom_min_stay_arrivals = _interopRequireDefault(__webpack_require__(/*! ./custom_min_stay_arrivals */ "./src/collections/custom_min_stay_arrivals.js"));

var _custom_min_stay_throughs = _interopRequireDefault(__webpack_require__(/*! ./custom_min_stay_throughs */ "./src/collections/custom_min_stay_throughs.js"));

var _custom_max_stays = _interopRequireDefault(__webpack_require__(/*! ./custom_max_stays */ "./src/collections/custom_max_stays.js"));

var _custom_closed_to_arrivals = _interopRequireDefault(__webpack_require__(/*! ./custom_closed_to_arrivals */ "./src/collections/custom_closed_to_arrivals.js"));

var _custom_closed_to_departures = _interopRequireDefault(__webpack_require__(/*! ./custom_closed_to_departures */ "./src/collections/custom_closed_to_departures.js"));

var _custom_stop_sells = _interopRequireDefault(__webpack_require__(/*! ./custom_stop_sells */ "./src/collections/custom_stop_sells.js"));

var _custom_max_sells = _interopRequireDefault(__webpack_require__(/*! ./custom_max_sells */ "./src/collections/custom_max_sells.js"));

var _custom_availability_offsets = _interopRequireDefault(__webpack_require__(/*! ./custom_availability_offsets */ "./src/collections/custom_availability_offsets.js"));

var _custom_max_availabilities = _interopRequireDefault(__webpack_require__(/*! ./custom_max_availabilities */ "./src/collections/custom_max_availabilities.js"));

var _custom_derived_options = _interopRequireDefault(__webpack_require__(/*! ./custom_derived_options */ "./src/collections/custom_derived_options.js"));

var _email_templates = _interopRequireDefault(__webpack_require__(/*! ./email_templates */ "./src/collections/email_templates.js"));

var _users = _interopRequireDefault(__webpack_require__(/*! ./users */ "./src/collections/users.js"));

var _white_label_partners = _interopRequireDefault(__webpack_require__(/*! ./white_label_partners */ "./src/collections/white_label_partners.js"));

var _white_label_domains = _interopRequireDefault(__webpack_require__(/*! ./white_label_domains */ "./src/collections/white_label_domains.js"));

var _white_label_email_settings = _interopRequireDefault(__webpack_require__(/*! ./white_label_email_settings */ "./src/collections/white_label_email_settings.js"));

var _tasks = _interopRequireDefault(__webpack_require__(/*! ./tasks */ "./src/collections/tasks.js"));

var _taxes = _interopRequireDefault(__webpack_require__(/*! ./taxes */ "./src/collections/taxes.js"));

var _tax_sets = _interopRequireDefault(__webpack_require__(/*! ./tax_sets */ "./src/collections/tax_sets.js"));

var _geocoding = _interopRequireDefault(__webpack_require__(/*! ./geocoding */ "./src/collections/geocoding.js"));

var _groups = _interopRequireDefault(__webpack_require__(/*! ./groups */ "./src/collections/groups.js"));

var _bookings = _interopRequireDefault(__webpack_require__(/*! ./bookings */ "./src/collections/bookings.js"));

var _raw = _interopRequireDefault(__webpack_require__(/*! ./raw */ "./src/collections/raw.js"));

var _property_users = _interopRequireDefault(__webpack_require__(/*! ./property_users */ "./src/collections/property_users.js"));

var _group_users = _interopRequireDefault(__webpack_require__(/*! ./group_users */ "./src/collections/group_users.js"));

var _hotel_policies = _interopRequireDefault(__webpack_require__(/*! ./hotel_policies */ "./src/collections/hotel_policies.js"));

var _cancellation_policies = _interopRequireDefault(__webpack_require__(/*! ./cancellation_policies */ "./src/collections/cancellation_policies.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = {
  Auth: _auth["default"],
  Properties: _properties["default"],
  RoomTypes: _room_types["default"],
  RatePlans: _rate_plans["default"],
  RateCategories: _rate_categories["default"],
  ARI: _ari["default"],
  Channels: _channels["default"],
  ChannelEvents: _channel_events["default"],
  CustomRates: _custom_rates["default"],
  CustomMinStayArrivals: _custom_min_stay_arrivals["default"],
  CustomMinStayThroughs: _custom_min_stay_throughs["default"],
  CustomMaxStays: _custom_max_stays["default"],
  CustomClosedToArrivals: _custom_closed_to_arrivals["default"],
  CustomClosedToDepartures: _custom_closed_to_departures["default"],
  CustomStopSells: _custom_stop_sells["default"],
  CustomMaxSells: _custom_max_sells["default"],
  CustomAvailabilityOffsets: _custom_availability_offsets["default"],
  CustomMaxAvailabilities: _custom_max_availabilities["default"],
  CustomDerivedOptions: _custom_derived_options["default"],
  EmailTemplates: _email_templates["default"],
  Users: _users["default"],
  WhiteLabelPartners: _white_label_partners["default"],
  WhiteLabelDomains: _white_label_domains["default"],
  WhiteLabelEmailSettings: _white_label_email_settings["default"],
  Tasks: _tasks["default"],
  Taxes: _taxes["default"],
  TaxSets: _tax_sets["default"],
  Geocoding: _geocoding["default"],
  Groups: _groups["default"],
  Bookings: _bookings["default"],
  Raw: _raw["default"],
  PropertyUsers: _property_users["default"],
  GroupUsers: _group_users["default"],
  HotelPolicies: _hotel_policies["default"],
  CancellationPolicies: _cancellation_policies["default"]
};
exports["default"] = _default;
module.exports = exports.default;

/***/ }),

/***/ "./src/collections/properties.js":
/*!***************************************!*\
  !*** ./src/collections/properties.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _groups = _interopRequireDefault(__webpack_require__(/*! ./groups */ "./src/collections/groups.js"));

var _handle_error = _interopRequireDefault(__webpack_require__(/*! ../utils/handle_error */ "./src/utils/handle_error.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var transport;
var storage;
var ENDPOINT = 'properties';

var Properties =
/*#__PURE__*/
function () {
  function Properties(container) {
    _classCallCheck(this, Properties);

    transport = container.transport;
    storage = container.storage;
  }

  _createClass(Properties, [{
    key: "list",
    value: function list() {
      var filter = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var pagination = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var order = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return transport.send('GET', ENDPOINT, {
        filter: filter,
        pagination: pagination,
        order: order
      }).then(function (response) {
        storage.propertiesLoad(response.data, response.meta);
        return response;
      })["catch"](function (error) {
        return (0, _handle_error["default"])(error, storage, transport);
      });
    }
  }, {
    key: "health",
    value: function health() {
      var filter = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var pagination = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var order = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return transport.send('GET', "".concat(ENDPOINT, "/health"), {
        filter: filter,
        pagination: pagination,
        order: order
      }).then(function (response) {
        storage.propertiesHealthLoad(response.data, response.meta);
        return response;
      })["catch"](function (error) {
        return (0, _handle_error["default"])(error, storage, transport);
      });
    }
  }, {
    key: "find",
    value: function find(id) {
      return transport.send('GET', "".concat(ENDPOINT, "/").concat(id)).then(function (response) {
        storage.propertiesAdd(response.data);
        return response;
      })["catch"](function (error) {
        return (0, _handle_error["default"])(error, storage, transport);
      });
    }
  }, {
    key: "create",
    value: function create(attrs) {
      return transport.send('POST', ENDPOINT, {
        property: attrs
      }).then(function (response) {
        storage.propertiesAdd(response.data);

        if (response.data.relationships && response.data.relationships.groups) {
          response.data.relationships.groups.data.forEach(function (group) {
            new _groups["default"]({
              transport: transport,
              storage: storage
            }).find(group.id);
          });
        }

        return response;
      })["catch"](function (error) {
        return (0, _handle_error["default"])(error, storage, transport);
      });
    }
  }, {
    key: "update",
    value: function update(attrs) {
      return transport.send('PUT', "".concat(ENDPOINT, "/").concat(attrs.id), {
        property: attrs
      }).then(function (response) {
        storage.propertiesAdd(response.data);
        return response;
      })["catch"](function (error) {
        return (0, _handle_error["default"])(error, storage, transport);
      });
    }
  }]);

  return Properties;
}();

exports["default"] = Properties;
module.exports = exports.default;

/***/ }),

/***/ "./src/collections/property_users.js":
/*!*******************************************!*\
  !*** ./src/collections/property_users.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _relationships_extractor = _interopRequireDefault(__webpack_require__(/*! ../utils/relationships_extractor */ "./src/utils/relationships_extractor.js"));

var _handle_error = _interopRequireDefault(__webpack_require__(/*! ../utils/handle_error */ "./src/utils/handle_error.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var transport;
var storage;
var ENDPOINT = 'property_users';

var PropertyUsers =
/*#__PURE__*/
function () {
  function PropertyUsers(container) {
    _classCallCheck(this, PropertyUsers);

    transport = container.transport;
    storage = container.storage;
  }

  _createClass(PropertyUsers, [{
    key: "list",
    value: function list() {
      var filters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return transport.send('GET', ENDPOINT, {
        filter: filters
      }).then(function (response) {
        return (0, _relationships_extractor["default"])(response.data);
      })["catch"](function (error) {
        return (0, _handle_error["default"])(error, storage, transport);
      });
    }
  }, {
    key: "find",
    value: function find(id) {
      return transport.send('GET', "".concat(ENDPOINT, "/").concat(id)).then(function (response) {
        return (0, _relationships_extractor["default"])(response.data);
      })["catch"](function (error) {
        return (0, _handle_error["default"])(error, storage, transport);
      });
    }
  }, {
    key: "invite",
    value: function invite(attrs) {
      return transport.send('POST', ENDPOINT, {
        invite: attrs
      }).then(function (response) {
        return (0, _relationships_extractor["default"])(response.data);
      })["catch"](function (error) {
        return (0, _handle_error["default"])(error, storage, transport);
      });
    }
  }, {
    key: "update",
    value: function update(attrs) {
      return transport.send('PUT', "".concat(ENDPOINT, "/").concat(attrs.id), {
        property_user: attrs
      }).then(function (response) {
        return (0, _relationships_extractor["default"])(response.data);
      })["catch"](function (error) {
        return (0, _handle_error["default"])(error, storage, transport);
      });
    }
  }, {
    key: "revokeAccess",
    value: function revokeAccess(id) {
      return transport.send('DELETE', "".concat(ENDPOINT, "/").concat(id)).then(function (response) {
        return response;
      })["catch"](function (error) {
        return (0, _handle_error["default"])(error, storage, transport);
      });
    }
  }]);

  return PropertyUsers;
}();

exports["default"] = PropertyUsers;
module.exports = exports.default;

/***/ }),

/***/ "./src/collections/rate_categories.js":
/*!********************************************!*\
  !*** ./src/collections/rate_categories.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _handle_error = _interopRequireDefault(__webpack_require__(/*! ../utils/handle_error */ "./src/utils/handle_error.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var transport;
var storage;
var ENDPOINT = 'rate_categories';

var RateCategories =
/*#__PURE__*/
function () {
  function RateCategories(container) {
    _classCallCheck(this, RateCategories);

    transport = container.transport;
    storage = container.storage;
  }

  _createClass(RateCategories, [{
    key: "list",
    value: function list() {
      var filter = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var pagination = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var order = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return transport.send('GET', ENDPOINT, {
        filter: filter,
        pagination: pagination,
        order: order
      }).then(function (response) {
        storage.rateCategoriesLoad(response.data);
        return response;
      })["catch"](function (error) {
        return (0, _handle_error["default"])(error, storage, transport);
      });
    }
  }, {
    key: "find",
    value: function find(id) {
      return transport.send('GET', "".concat(ENDPOINT, "/").concat(id)).then(function (response) {
        storage.rateCategoriesAdd(response.data);
        return response;
      })["catch"](function (error) {
        return (0, _handle_error["default"])(error, storage, transport);
      });
    }
  }, {
    key: "create",
    value: function create(attrs) {
      return transport.send('POST', ENDPOINT, {
        rate_category: attrs
      }).then(function (response) {
        storage.rateCategoriesAdd(response.data);
        return response;
      })["catch"](function (error) {
        return (0, _handle_error["default"])(error, storage, transport);
      });
    }
  }, {
    key: "update",
    value: function update(attrs) {
      return transport.send('PUT', "".concat(ENDPOINT, "/").concat(attrs.id), {
        rate_category: attrs
      }).then(function (response) {
        storage.rateCategoriesAdd(response.data);
        return response;
      })["catch"](function (error) {
        return (0, _handle_error["default"])(error, storage, transport);
      });
    }
  }, {
    key: "remove",
    value: function remove(attrs) {
      return transport.send('DELETE', "".concat(ENDPOINT, "/").concat(attrs.id)).then(function (response) {
        storage.rateCategoriesDrop(attrs);
        return response;
      })["catch"](function (error) {
        return (0, _handle_error["default"])(error, storage, transport);
      });
    }
  }]);

  return RateCategories;
}();

exports["default"] = RateCategories;
module.exports = exports.default;

/***/ }),

/***/ "./src/collections/rate_plans.js":
/*!***************************************!*\
  !*** ./src/collections/rate_plans.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _handle_error = _interopRequireDefault(__webpack_require__(/*! ../utils/handle_error */ "./src/utils/handle_error.js"));

var _attributes_extractor = _interopRequireDefault(__webpack_require__(/*! ../utils/attributes_extractor */ "./src/utils/attributes_extractor.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var transport;
var storage;
var ENDPOINT = 'rate_plans';

var RatePlans =
/*#__PURE__*/
function () {
  function RatePlans(container) {
    _classCallCheck(this, RatePlans);

    transport = container.transport;
    storage = container.storage;
  }

  _createClass(RatePlans, [{
    key: "list",
    value: function list() {
      var filter = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return transport.send('GET', ENDPOINT, {
        filter: filter
      }).then(function (response) {
        storage.ratePlansLoad(response.data);
        return response.data;
      })["catch"](function (error) {
        return (0, _handle_error["default"])(error, storage, transport);
      });
    }
  }, {
    key: "options",
    value: function options() {
      var filter = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return transport.send('GET', "".concat(ENDPOINT, "/options"), {
        filter: filter
      }).then(function (_ref) {
        var data = _ref.data;
        return (0, _attributes_extractor["default"])(data);
      })["catch"](function (error) {
        return (0, _handle_error["default"])(error, storage, transport);
      });
    }
  }, {
    key: "find",
    value: function find(id) {
      return transport.send('GET', "".concat(ENDPOINT, "/").concat(id)).then(function (response) {
        return response;
      })["catch"](function (error) {
        return (0, _handle_error["default"])(error, storage, transport);
      });
    }
  }, {
    key: "create",
    value: function create(attrs) {
      return transport.send('POST', ENDPOINT, {
        rate_plan: attrs
      }).then(function (response) {
        storage.ratePlansAdd(response.data);
        return response;
      })["catch"](function (error) {
        return (0, _handle_error["default"])(error, storage, transport);
      });
    }
  }, {
    key: "update",
    value: function update(attrs) {
      return transport.send('PUT', "".concat(ENDPOINT, "/").concat(attrs.id), {
        rate_plan: attrs
      }).then(function (response) {
        storage.ratePlansAdd(response.data);
        return response;
      })["catch"](function (error) {
        return (0, _handle_error["default"])(error, storage, transport);
      });
    }
  }, {
    key: "remove",
    value: function remove(attrs) {
      return transport.send('DELETE', "".concat(ENDPOINT, "/").concat(attrs.id)).then(function (response) {
        storage.ratePlansDrop(attrs);
        return response;
      })["catch"](function (error) {
        return (0, _handle_error["default"])(error, storage, transport);
      });
    }
  }]);

  return RatePlans;
}();

exports["default"] = RatePlans;
module.exports = exports.default;

/***/ }),

/***/ "./src/collections/raw.js":
/*!********************************!*\
  !*** ./src/collections/raw.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var transport;

var Raw =
/*#__PURE__*/
function () {
  function Raw(container) {
    _classCallCheck(this, Raw);

    transport = container.transport;
  }

  _createClass(Raw, [{
    key: "query",
    value: function query(method, endpoint, args) {
      return transport.send(method, endpoint, args);
    }
  }]);

  return Raw;
}();

exports["default"] = Raw;
module.exports = exports.default;

/***/ }),

/***/ "./src/collections/room_types.js":
/*!***************************************!*\
  !*** ./src/collections/room_types.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _handle_error = _interopRequireDefault(__webpack_require__(/*! ../utils/handle_error */ "./src/utils/handle_error.js"));

var _attributes_extractor = _interopRequireDefault(__webpack_require__(/*! ../utils/attributes_extractor */ "./src/utils/attributes_extractor.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var transport;
var storage;
var ENDPOINT = 'room_types';

var RoomTypes =
/*#__PURE__*/
function () {
  function RoomTypes(container) {
    _classCallCheck(this, RoomTypes);

    transport = container.transport;
    storage = container.storage;
  }

  _createClass(RoomTypes, [{
    key: "list",
    value: function list() {
      var filter = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var pagination = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var order = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return transport.send('GET', ENDPOINT, {
        filter: filter,
        pagination: pagination,
        order: order
      }).then(function (response) {
        storage.roomTypesLoad(response.data, response.meta);
        return {
          entities: response.data.map(function (el) {
            return el.attributes;
          }),
          meta: response.meta
        };
      })["catch"](function (error) {
        return (0, _handle_error["default"])(error, storage, transport);
      });
    }
  }, {
    key: "options",
    value: function options() {
      var filter = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return transport.send('GET', "".concat(ENDPOINT, "/options"), {
        filter: filter
      }).then(function (_ref) {
        var data = _ref.data;
        return (0, _attributes_extractor["default"])(data);
      })["catch"](function (error) {
        return (0, _handle_error["default"])(error, storage, transport);
      });
    }
  }, {
    key: "find",
    value: function find(id) {
      return transport.send('GET', "".concat(ENDPOINT, "/").concat(id)).then(function (response) {
        storage.roomTypesAdd(response.data);
        return response;
      })["catch"](function (error) {
        return (0, _handle_error["default"])(error, storage, transport);
      });
    }
  }, {
    key: "create",
    value: function create(attrs) {
      return transport.send('POST', ENDPOINT, {
        room_type: attrs
      }).then(function (response) {
        storage.roomTypesAdd(response.data);
        return response;
      })["catch"](function (error) {
        return (0, _handle_error["default"])(error, storage, transport);
      });
    }
  }, {
    key: "update",
    value: function update(attrs) {
      return transport.send('PUT', "".concat(ENDPOINT, "/").concat(attrs.id), {
        room_type: attrs
      }).then(function (response) {
        storage.roomTypesAdd(response.data);
        return response;
      })["catch"](function (error) {
        return (0, _handle_error["default"])(error, storage, transport);
      });
    }
  }, {
    key: "remove",
    value: function remove(attrs) {
      return transport.send('DELETE', "".concat(ENDPOINT, "/").concat(attrs.id)).then(function (response) {
        storage.roomTypesDrop(attrs);
        return response;
      })["catch"](function (error) {
        return (0, _handle_error["default"])(error, storage, transport);
      });
    }
  }]);

  return RoomTypes;
}();

exports["default"] = RoomTypes;
module.exports = exports.default;

/***/ }),

/***/ "./src/collections/tasks.js":
/*!**********************************!*\
  !*** ./src/collections/tasks.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _handle_error = _interopRequireDefault(__webpack_require__(/*! ../utils/handle_error */ "./src/utils/handle_error.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var transport;
var storage;
var ENDPOINT = 'tasks';

var Tasks =
/*#__PURE__*/
function () {
  function Tasks(container) {
    _classCallCheck(this, Tasks);

    transport = container.transport;
    storage = container.storage;
  }

  _createClass(Tasks, [{
    key: "list",
    value: function list() {
      var filter = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var pagination = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var order = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return transport.send('GET', ENDPOINT, {
        filter: filter,
        pagination: pagination,
        order: order
      }).then(function (response) {
        storage.tasksLoad(response.data, response.meta);
        return response;
      })["catch"](function (error) {
        return (0, _handle_error["default"])(error, storage, transport);
      });
    }
  }, {
    key: "find",
    value: function find(id) {
      return transport.send('GET', "".concat(ENDPOINT, "/").concat(id)).then(function (response) {
        return response;
      })["catch"](function (error) {
        return (0, _handle_error["default"])(error, storage, transport);
      });
    }
  }]);

  return Tasks;
}();

exports["default"] = Tasks;
module.exports = exports.default;

/***/ }),

/***/ "./src/collections/tax_sets.js":
/*!*************************************!*\
  !*** ./src/collections/tax_sets.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _handle_error = _interopRequireDefault(__webpack_require__(/*! ../utils/handle_error */ "./src/utils/handle_error.js"));

var _attributes_extractor = _interopRequireDefault(__webpack_require__(/*! ../utils/attributes_extractor */ "./src/utils/attributes_extractor.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var transport;
var storage;
var ENDPOINT = 'tax_sets';

var TaxSets =
/*#__PURE__*/
function () {
  function TaxSets(container) {
    _classCallCheck(this, TaxSets);

    transport = container.transport;
    storage = container.storage;
  }

  _createClass(TaxSets, [{
    key: "list",
    value: function list() {
      var filter = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var pagination = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
        page: 1,
        limit: 10
      };
      var order = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {
        inserted_at: 'desc'
      };
      return transport.send('GET', ENDPOINT, {
        filter: filter,
        pagination: pagination,
        order: order
      }).then(function (response) {
        storage.taxSetsLoad(response.data, response.meta);
        return {
          entities: response.data.map(function (el) {
            return el.attributes;
          }),
          meta: response.meta
        };
      });
    }
  }, {
    key: "options",
    value: function options() {
      var filter = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return transport.send('GET', "".concat(ENDPOINT, "/options"), {
        filter: filter
      }).then(function (_ref) {
        var data = _ref.data;
        return (0, _attributes_extractor["default"])(data);
      })["catch"](function (error) {
        return (0, _handle_error["default"])(error, storage, transport);
      });
    }
  }, {
    key: "find",
    value: function find(id) {
      return transport.send('GET', "".concat(ENDPOINT, "/").concat(id)).then(function (_ref2) {
        var data = _ref2.data;
        var attributes = data.attributes;
        storage.taxSetsAdd(data);
        return attributes;
      });
    }
  }, {
    key: "create",
    value: function create(attrs) {
      return transport.send('POST', ENDPOINT, {
        tax_set: attrs
      }).then(function (_ref3) {
        var data = _ref3.data;
        var attributes = data.attributes;
        storage.taxSetsAdd(data);
        return attributes;
      });
    }
  }, {
    key: "update",
    value: function update(attrs) {
      return transport.send('PUT', "".concat(ENDPOINT, "/").concat(attrs.id), {
        tax_set: attrs
      }).then(function (_ref4) {
        var data = _ref4.data;
        var attributes = data.attributes;
        storage.taxSetsAdd(data);
        return attributes;
      });
    }
  }, {
    key: "remove",
    value: function remove(attrs) {
      return transport.send('DELETE', "".concat(ENDPOINT, "/").concat(attrs.id)).then(function (response) {
        storage.taxSetsDrop(attrs);
        return response;
      });
    }
  }, {
    key: "test",
    value: function test(attrs) {
      return transport.send('POST', "".concat(ENDPOINT, "/test"), {
        test: attrs
      }).then(function (_ref5) {
        var data = _ref5.data;
        var attributes = data.attributes;
        return attributes;
      });
    }
  }]);

  return TaxSets;
}();

exports["default"] = TaxSets;
module.exports = exports.default;

/***/ }),

/***/ "./src/collections/taxes.js":
/*!**********************************!*\
  !*** ./src/collections/taxes.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var transport;
var storage;
var ENDPOINT = 'taxes';

var Taxes =
/*#__PURE__*/
function () {
  function Taxes(container) {
    _classCallCheck(this, Taxes);

    transport = container.transport;
    storage = container.storage;
  }

  _createClass(Taxes, [{
    key: "list",
    value: function list() {
      var filter = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var pagination = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
        page: 1,
        limit: 10
      };
      var order = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {
        inserted_at: 'desc'
      };
      return transport.send('GET', ENDPOINT, {
        filter: filter,
        pagination: pagination,
        order: order
      }).then(function (response) {
        storage.taxesLoad(response.data, response.meta);
        return {
          entities: response.data.map(function (el) {
            return el.attributes;
          }),
          meta: response.meta
        };
      });
    }
  }, {
    key: "find",
    value: function find(id) {
      return transport.send('GET', "".concat(ENDPOINT, "/").concat(id)).then(function (_ref) {
        var data = _ref.data;
        var attributes = data.attributes;
        storage.taxesAdd(data);
        return attributes;
      });
    }
  }, {
    key: "create",
    value: function create(attrs) {
      return transport.send('POST', ENDPOINT, {
        tax: attrs
      }).then(function (_ref2) {
        var data = _ref2.data;
        var attributes = data.attributes;
        storage.taxesAdd(data);
        return attributes;
      });
    }
  }, {
    key: "update",
    value: function update(attrs) {
      return transport.send('PUT', "".concat(ENDPOINT, "/").concat(attrs.id), {
        tax: attrs
      }).then(function (_ref3) {
        var data = _ref3.data;
        var attributes = data.attributes;
        storage.taxesAdd(data);
        return attributes;
      });
    }
  }, {
    key: "remove",
    value: function remove(attrs) {
      return transport.send('DELETE', "".concat(ENDPOINT, "/").concat(attrs.id)).then(function (response) {
        storage.taxesDrop(attrs);
        return response;
      });
    }
  }]);

  return Taxes;
}();

exports["default"] = Taxes;
module.exports = exports.default;

/***/ }),

/***/ "./src/collections/users.js":
/*!**********************************!*\
  !*** ./src/collections/users.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _handle_error = _interopRequireDefault(__webpack_require__(/*! ../utils/handle_error */ "./src/utils/handle_error.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var transport;
var storage;
var ENDPOINT = 'users';

var Users =
/*#__PURE__*/
function () {
  function Users(container) {
    _classCallCheck(this, Users);

    transport = container.transport;
    storage = container.storage;
  }

  _createClass(Users, [{
    key: "list",
    value: function list() {
      var filters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return transport.send('GET', ENDPOINT, {
        filter: filters
      }).then(function (response) {
        storage.usersLoad(response.data);
        return response.data;
      })["catch"](function (error) {
        return (0, _handle_error["default"])(error, storage, transport);
      });
    }
  }, {
    key: "find",
    value: function find(id) {
      return transport.send('GET', "".concat(ENDPOINT, "/").concat(id)).then(function (response) {
        storage.usersAdd(response.data);
        return response;
      })["catch"](function (error) {
        return (0, _handle_error["default"])(error, storage, transport);
      });
    }
  }, {
    key: "create",
    value: function create(attrs) {
      return transport.send('POST', ENDPOINT, {
        user: attrs
      }).then(function (response) {
        storage.usersAdd(response.data);
        return response;
      })["catch"](function (error) {
        return (0, _handle_error["default"])(error, storage, transport);
      });
    }
  }, {
    key: "update",
    value: function update(attrs) {
      return transport.send('PUT', "".concat(ENDPOINT, "/").concat(attrs.id), {
        user: attrs
      }).then(function (response) {
        storage.usersAdd(response.data);
        return response;
      })["catch"](function (error) {
        return (0, _handle_error["default"])(error, storage, transport);
      });
    }
  }]);

  return Users;
}();

exports["default"] = Users;
module.exports = exports.default;

/***/ }),

/***/ "./src/collections/white_label_domains.js":
/*!************************************************!*\
  !*** ./src/collections/white_label_domains.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _handle_error = _interopRequireDefault(__webpack_require__(/*! ../utils/handle_error */ "./src/utils/handle_error.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var transport;
var storage;
var ENDPOINT = 'wl_domains';

var WhiteLabelDomains =
/*#__PURE__*/
function () {
  function WhiteLabelDomains(container) {
    _classCallCheck(this, WhiteLabelDomains);

    transport = container.transport;
    storage = container.storage;
  }

  _createClass(WhiteLabelDomains, [{
    key: "list",
    value: function list() {
      var filters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return transport.send('GET', ENDPOINT, {
        filter: filters
      }).then(function (response) {
        storage.whiteLabelDomainsLoad(response.data);
        return response.data;
      })["catch"](function (error) {
        return (0, _handle_error["default"])(error, storage, transport);
      });
    }
  }, {
    key: "find",
    value: function find(id) {
      return transport.send('GET', "".concat(ENDPOINT, "/").concat(id)).then(function (response) {
        storage.whiteLabelDomainsAdd(response.data);
        return response;
      })["catch"](function (error) {
        return (0, _handle_error["default"])(error, storage, transport);
      });
    }
  }, {
    key: "create",
    value: function create(attrs) {
      return transport.send('POST', ENDPOINT, {
        wl_domain: attrs
      }).then(function (response) {
        storage.whiteLabelDomainsAdd(response.data);
        return response;
      })["catch"](function (error) {
        return (0, _handle_error["default"])(error, storage, transport);
      });
    }
  }, {
    key: "update",
    value: function update(attrs) {
      return transport.send('PUT', "".concat(ENDPOINT, "/").concat(attrs.id), {
        wl_domain: attrs
      }).then(function (response) {
        storage.whiteLabelDomainsAdd(response.data);
        return response;
      })["catch"](function (error) {
        return (0, _handle_error["default"])(error, storage, transport);
      });
    }
  }]);

  return WhiteLabelDomains;
}();

exports["default"] = WhiteLabelDomains;
module.exports = exports.default;

/***/ }),

/***/ "./src/collections/white_label_email_settings.js":
/*!*******************************************************!*\
  !*** ./src/collections/white_label_email_settings.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _handle_error = _interopRequireDefault(__webpack_require__(/*! ../utils/handle_error */ "./src/utils/handle_error.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var transport;
var storage;
var ENDPOINT = 'wl_email_settings';

var WhiteLabelEmailSettings =
/*#__PURE__*/
function () {
  function WhiteLabelEmailSettings(container) {
    _classCallCheck(this, WhiteLabelEmailSettings);

    transport = container.transport;
    storage = container.storage;
  }

  _createClass(WhiteLabelEmailSettings, [{
    key: "list",
    value: function list() {
      var filters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return transport.send('GET', ENDPOINT, {
        filter: filters
      }).then(function (response) {
        storage.whiteLabelEmailSettingsLoad(response.data);
        return response.data;
      })["catch"](function (error) {
        return (0, _handle_error["default"])(error, storage, transport);
      });
    }
  }, {
    key: "find",
    value: function find(id) {
      return transport.send('GET', "".concat(ENDPOINT, "/").concat(id)).then(function (response) {
        storage.whiteLabelEmailSettingsAdd(response.data);
        return response;
      })["catch"](function (error) {
        return (0, _handle_error["default"])(error, storage, transport);
      });
    }
  }, {
    key: "create",
    value: function create(attrs) {
      return transport.send('POST', ENDPOINT, {
        wl_email_setting: attrs
      }).then(function (response) {
        storage.whiteLabelEmailSettingsAdd(response.data);
        return response;
      })["catch"](function (error) {
        return (0, _handle_error["default"])(error, storage, transport);
      });
    }
  }, {
    key: "update",
    value: function update(attrs) {
      return transport.send('PUT', "".concat(ENDPOINT, "/").concat(attrs.id), {
        wl_email_setting: attrs
      }).then(function (response) {
        storage.whiteLabelEmailSettingsAdd(response.data);
        return response;
      })["catch"](function (error) {
        return (0, _handle_error["default"])(error, storage, transport);
      });
    }
  }]);

  return WhiteLabelEmailSettings;
}();

exports["default"] = WhiteLabelEmailSettings;
module.exports = exports.default;

/***/ }),

/***/ "./src/collections/white_label_partners.js":
/*!*************************************************!*\
  !*** ./src/collections/white_label_partners.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _handle_error = _interopRequireDefault(__webpack_require__(/*! ../utils/handle_error */ "./src/utils/handle_error.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var transport;
var storage;
var ENDPOINT = 'wl_partners';

var WhiteLabelPartners =
/*#__PURE__*/
function () {
  function WhiteLabelPartners(container) {
    _classCallCheck(this, WhiteLabelPartners);

    transport = container.transport;
    storage = container.storage;
  }

  _createClass(WhiteLabelPartners, [{
    key: "list",
    value: function list() {
      var filters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return transport.send('GET', ENDPOINT, {
        filter: filters
      }).then(function (response) {
        storage.whiteLabelPartnersLoad(response.data);
        return response.data;
      })["catch"](function (error) {
        return (0, _handle_error["default"])(error, storage, transport);
      });
    }
  }, {
    key: "find",
    value: function find(id) {
      return transport.send('GET', "".concat(ENDPOINT, "/").concat(id)).then(function (response) {
        storage.whiteLabelPartnersAdd(response.data);
        return response;
      })["catch"](function (error) {
        return (0, _handle_error["default"])(error, storage, transport);
      });
    }
  }, {
    key: "create",
    value: function create(attrs) {
      return transport.send('POST', ENDPOINT, {
        wl_partner: attrs
      }).then(function (response) {
        storage.whiteLabelPartnersAdd(response.data);
        return response;
      })["catch"](function (error) {
        return (0, _handle_error["default"])(error, storage, transport);
      });
    }
  }, {
    key: "update",
    value: function update(attrs) {
      return transport.send('PUT', "".concat(ENDPOINT, "/").concat(attrs.id), {
        wl_partner: attrs
      }).then(function (response) {
        storage.whiteLabelPartnersAdd(response.data);
        return response;
      })["catch"](function (error) {
        return (0, _handle_error["default"])(error, storage, transport);
      });
    }
  }]);

  return WhiteLabelPartners;
}();

exports["default"] = WhiteLabelPartners;
module.exports = exports.default;

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _collections = _interopRequireDefault(__webpack_require__(/*! ./collections */ "./src/collections/index.js"));

var _transport = __webpack_require__(/*! ./transport */ "./src/transport/index.js");

var _storage = _interopRequireDefault(__webpack_require__(/*! ./storage */ "./src/storage/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var defaultOptions = {
  protocol: 'http',
  secure: true,
  server: 'staging.channex.io'
};
var instance = null;

function getToken(storage) {
  return storage.session ? storage.session.token : null;
}

var ChannexBL = function ChannexBL() {
  var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  _classCallCheck(this, ChannexBL);

  if (!instance) {
    this.storage = (0, _storage["default"])({});
    this.settings = Object.assign(defaultOptions, opts); // Register transport methods

    this.http = new _transport.HTTPTransport(this.settings, getToken(this.storage.getState()));
    this.ws = new _transport.WSTransport(this.settings, getToken(this.storage.getState()));
    this.transport = this.http;
    var Raw = new _collections["default"].Raw(this);
    this.Auth = new _collections["default"].Auth(this);
    this.Properties = new _collections["default"].Properties(this);
    this.Groups = new _collections["default"].Groups(this);
    this.RoomTypes = new _collections["default"].RoomTypes(this);
    this.RatePlans = new _collections["default"].RatePlans(this);
    this.RateCategories = new _collections["default"].RateCategories(this);
    this.Channels = new _collections["default"].Channels(this);
    this.ChannelEvents = new _collections["default"].ChannelEvents(this);
    this.ARI = new _collections["default"].ARI(this);
    this.CustomRates = new _collections["default"].CustomRates(this);
    this.CustomMinStayArrivals = new _collections["default"].CustomMinStayArrivals(this);
    this.CustomMinStayThroughs = new _collections["default"].CustomMinStayThroughs(this);
    this.CustomMaxStays = new _collections["default"].CustomMaxStays(this);
    this.CustomClosedToArrivals = new _collections["default"].CustomClosedToArrivals(this);
    this.CustomClosedToDepartures = new _collections["default"].CustomClosedToDepartures(this);
    this.CustomStopSells = new _collections["default"].CustomStopSells(this);
    this.CustomMaxSells = new _collections["default"].CustomMaxSells(this);
    this.CustomAvailabilityOffsets = new _collections["default"].CustomAvailabilityOffsets(this);
    this.CustomMaxAvailabilities = new _collections["default"].CustomMaxAvailabilities(this);
    this.CustomDerivedOptions = new _collections["default"].CustomDerivedOptions(this);
    this.EmailTemplates = new _collections["default"].EmailTemplates(this);
    this.Users = new _collections["default"].Users(this);
    this.WhiteLabelPartners = new _collections["default"].WhiteLabelPartners(this);
    this.WhiteLabelDomains = new _collections["default"].WhiteLabelDomains(this);
    this.WhiteLabelEmailSettings = new _collections["default"].WhiteLabelEmailSettings(this);
    this.Tasks = new _collections["default"].Tasks(this);
    this.Taxes = new _collections["default"].Taxes(this);
    this.TaxSets = new _collections["default"].TaxSets(this);
    this.Bookings = new _collections["default"].Bookings(this);
    this.PropertyUsers = new _collections["default"].PropertyUsers(this);
    this.Geocoding = new _collections["default"].Geocoding(this);
    this.GroupUsers = new _collections["default"].GroupUsers(this);
    this.HotelPolicies = new _collections["default"].HotelPolicies(this);
    this.CancellationPolicies = new _collections["default"].CancellationPolicies(this);
    this.subscribe = this.ws.subscribe;
    this.publish = this.ws.publish;
    this.query = Raw.query;
    instance = this;
  } else {
    return instance;
  }
};

var _default = new ChannexBL(window.channexSettings || {});

exports["default"] = _default;
module.exports = exports.default;

/***/ }),

/***/ "./src/storage/actions/booking_actions.js":
/*!************************************************!*\
  !*** ./src/storage/actions/booking_actions.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _constants = __webpack_require__(/*! ../constants */ "./src/storage/constants.js");

function bookingsLoad(storage) {
  return function (bookings, meta) {
    storage.dispatch({
      type: _constants.BOOKINGS_LOAD,
      payload: {
        bookings: bookings,
        meta: meta
      }
    });
  };
}

function bookingsAdd(storage) {
  return function (booking) {
    storage.dispatch({
      type: _constants.BOOKINGS_ADD,
      payload: booking
    });
  };
}

var _default = {
  bookingsLoad: bookingsLoad,
  bookingsAdd: bookingsAdd
};
exports["default"] = _default;
module.exports = exports.default;

/***/ }),

/***/ "./src/storage/actions/cancellation_policies_actions.js":
/*!**************************************************************!*\
  !*** ./src/storage/actions/cancellation_policies_actions.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _constants = __webpack_require__(/*! ../constants */ "./src/storage/constants.js");

function cancellationPoliciesLoad(storage) {
  return function (records, meta) {
    storage.dispatch({
      type: _constants.CANCELLATION_POLICIES_LOAD,
      payload: {
        records: records,
        meta: meta
      }
    });
  };
}

function cancellationPoliciesAdd(storage) {
  return function (cancellationPolicy) {
    storage.dispatch({
      type: _constants.CANCELLATION_POLICIES_ADD,
      payload: cancellationPolicy
    });
  };
}

function cancellationPoliciesDrop(storage) {
  return function (cancellationPolicy) {
    storage.dispatch({
      type: _constants.CANCELLATION_POLICIES_DROP,
      payload: cancellationPolicy
    });
  };
}

var _default = {
  cancellationPoliciesLoad: cancellationPoliciesLoad,
  cancellationPoliciesAdd: cancellationPoliciesAdd,
  cancellationPoliciesDrop: cancellationPoliciesDrop
};
exports["default"] = _default;
module.exports = exports.default;

/***/ }),

/***/ "./src/storage/actions/channel_actions.js":
/*!************************************************!*\
  !*** ./src/storage/actions/channel_actions.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _constants = __webpack_require__(/*! ../constants */ "./src/storage/constants.js");

function channelsLoad(storage) {
  return function (channels) {
    storage.dispatch({
      type: _constants.CHANNELS_LOAD,
      payload: channels
    });
  };
}

function channelsAdd(storage) {
  return function (channel) {
    storage.dispatch({
      type: _constants.CHANNELS_ADD,
      payload: channel
    });
  };
}

function channelsDrop(storage) {
  return function (channel) {
    storage.dispatch({
      type: _constants.CHANNELS_DROP,
      payload: channel
    });
  };
}

var _default = {
  channelsLoad: channelsLoad,
  channelsAdd: channelsAdd,
  channelsDrop: channelsDrop
};
exports["default"] = _default;
module.exports = exports.default;

/***/ }),

/***/ "./src/storage/actions/channel_events_actions.js":
/*!*******************************************************!*\
  !*** ./src/storage/actions/channel_events_actions.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _constants = __webpack_require__(/*! ../constants */ "./src/storage/constants.js");

function channelEventsLoad(storage) {
  return function (channelEvents, meta) {
    storage.dispatch({
      type: _constants.CHANNEL_EVENTS_LOAD,
      payload: {
        channelEvents: channelEvents,
        meta: meta
      }
    });
  };
}

var _default = {
  channelEventsLoad: channelEventsLoad
};
exports["default"] = _default;
module.exports = exports.default;

/***/ }),

/***/ "./src/storage/actions/channel_health_actions.js":
/*!*******************************************************!*\
  !*** ./src/storage/actions/channel_health_actions.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _constants = __webpack_require__(/*! ../constants */ "./src/storage/constants.js");

function channelsHealthLoad(storage) {
  return function (stats, meta) {
    storage.dispatch({
      type: _constants.CHANNELS_HEALTH_LOAD,
      payload: {
        stats: stats,
        meta: meta
      }
    });
  };
}

var _default = {
  channelsHealthLoad: channelsHealthLoad
};
exports["default"] = _default;
module.exports = exports.default;

/***/ }),

/***/ "./src/storage/actions/current_user_actions.js":
/*!*****************************************************!*\
  !*** ./src/storage/actions/current_user_actions.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _constants = __webpack_require__(/*! ../constants */ "./src/storage/constants.js");

function userAdd(storage) {
  return function (user) {
    storage.dispatch({
      type: _constants.USER_ADD,
      payload: user
    });
  };
}

var _default = {
  userAdd: userAdd
};
exports["default"] = _default;
module.exports = exports.default;

/***/ }),

/***/ "./src/storage/actions/email_template_actions.js":
/*!*******************************************************!*\
  !*** ./src/storage/actions/email_template_actions.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _constants = __webpack_require__(/*! ../constants */ "./src/storage/constants.js");

function emailTemplatesLoad(storage) {
  return function (emailTemplates) {
    storage.dispatch({
      type: _constants.EMAIL_TEMPLATES_LOAD,
      payload: emailTemplates
    });
  };
}

function emailTemplatesAdd(storage) {
  return function (emailTemplate) {
    storage.dispatch({
      type: _constants.EMAIL_TEMPLATES_ADD,
      payload: emailTemplate
    });
  };
}

function emailTemplatesDrop(storage) {
  return function (emailTemplate) {
    storage.dispatch({
      type: _constants.EMAIL_TEMPLATES_DROP,
      payload: emailTemplate
    });
  };
}

var _default = {
  emailTemplatesLoad: emailTemplatesLoad,
  emailTemplatesAdd: emailTemplatesAdd,
  emailTemplatesDrop: emailTemplatesDrop
};
exports["default"] = _default;
module.exports = exports.default;

/***/ }),

/***/ "./src/storage/actions/group_actions.js":
/*!**********************************************!*\
  !*** ./src/storage/actions/group_actions.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _constants = __webpack_require__(/*! ../constants */ "./src/storage/constants.js");

function groupsLoad(storage) {
  return function (groups) {
    storage.dispatch({
      type: _constants.GROUPS_LOAD,
      payload: groups
    });
  };
}

function groupsAdd(storage) {
  return function (group) {
    storage.dispatch({
      type: _constants.GROUPS_ADD,
      payload: group
    });
  };
}

function groupsDrop(storage) {
  return function (group) {
    storage.dispatch({
      type: _constants.GROUPS_DROP,
      payload: group
    });
  };
}

var _default = {
  groupsLoad: groupsLoad,
  groupsAdd: groupsAdd,
  groupsDrop: groupsDrop
};
exports["default"] = _default;
module.exports = exports.default;

/***/ }),

/***/ "./src/storage/actions/hotel_policies_actions.js":
/*!*******************************************************!*\
  !*** ./src/storage/actions/hotel_policies_actions.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _constants = __webpack_require__(/*! ../constants */ "./src/storage/constants.js");

function hotelPoliciesLoad(storage) {
  return function (records, meta) {
    storage.dispatch({
      type: _constants.HOTEL_POLICIES_LOAD,
      payload: {
        records: records,
        meta: meta
      }
    });
  };
}

function hotelPoliciesAdd(storage) {
  return function (hotelPolicy) {
    storage.dispatch({
      type: _constants.HOTEL_POLICIES_ADD,
      payload: hotelPolicy
    });
  };
}

function hotelPoliciesDrop(storage) {
  return function (hotelPolicy) {
    storage.dispatch({
      type: _constants.HOTEL_POLICIES_DROP,
      payload: hotelPolicy
    });
  };
}

var _default = {
  hotelPoliciesLoad: hotelPoliciesLoad,
  hotelPoliciesAdd: hotelPoliciesAdd,
  hotelPoliciesDrop: hotelPoliciesDrop
};
exports["default"] = _default;
module.exports = exports.default;

/***/ }),

/***/ "./src/storage/actions/index.js":
/*!**************************************!*\
  !*** ./src/storage/actions/index.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _session_actions = __webpack_require__(/*! ./session_actions */ "./src/storage/actions/session_actions.js");

var _property_actions = __webpack_require__(/*! ./property_actions */ "./src/storage/actions/property_actions.js");

var _property_health_actions = __webpack_require__(/*! ./property_health_actions */ "./src/storage/actions/property_health_actions.js");

var _room_type_actions = __webpack_require__(/*! ./room_type_actions */ "./src/storage/actions/room_type_actions.js");

var _rate_plan_actions = __webpack_require__(/*! ./rate_plan_actions */ "./src/storage/actions/rate_plan_actions.js");

var _rate_category_actions = __webpack_require__(/*! ./rate_category_actions */ "./src/storage/actions/rate_category_actions.js");

var _channel_actions = __webpack_require__(/*! ./channel_actions */ "./src/storage/actions/channel_actions.js");

var _channel_health_actions = __webpack_require__(/*! ./channel_health_actions */ "./src/storage/actions/channel_health_actions.js");

var _channel_events_actions = __webpack_require__(/*! ./channel_events_actions */ "./src/storage/actions/channel_events_actions.js");

var _email_template_actions = __webpack_require__(/*! ./email_template_actions */ "./src/storage/actions/email_template_actions.js");

var _current_user_actions = __webpack_require__(/*! ./current_user_actions */ "./src/storage/actions/current_user_actions.js");

var _user_actions = __webpack_require__(/*! ./user_actions */ "./src/storage/actions/user_actions.js");

var _white_label_partner_actions = __webpack_require__(/*! ./white_label_partner_actions */ "./src/storage/actions/white_label_partner_actions.js");

var _white_label_domain_actions = __webpack_require__(/*! ./white_label_domain_actions */ "./src/storage/actions/white_label_domain_actions.js");

var _white_label_email_settings_actions = __webpack_require__(/*! ./white_label_email_settings_actions */ "./src/storage/actions/white_label_email_settings_actions.js");

var _tasks_actions = __webpack_require__(/*! ./tasks_actions */ "./src/storage/actions/tasks_actions.js");

var _taxes_actions = __webpack_require__(/*! ./taxes_actions */ "./src/storage/actions/taxes_actions.js");

var _tax_sets_actions = __webpack_require__(/*! ./tax_sets_actions */ "./src/storage/actions/tax_sets_actions.js");

var _group_actions = __webpack_require__(/*! ./group_actions */ "./src/storage/actions/group_actions.js");

var _booking_actions = __webpack_require__(/*! ./booking_actions */ "./src/storage/actions/booking_actions.js");

var _hotel_policies_actions = __webpack_require__(/*! ./hotel_policies_actions */ "./src/storage/actions/hotel_policies_actions.js");

var _cancellation_policies_actions = __webpack_require__(/*! ./cancellation_policies_actions */ "./src/storage/actions/cancellation_policies_actions.js");

var _default = {
  sessionAdd: _session_actions.sessionAdd,
  chooseProperty: _session_actions.chooseProperty,
  chooseGroup: _session_actions.chooseGroup,
  propertiesLoad: _property_actions.propertiesLoad,
  propertiesHealthLoad: _property_health_actions.propertiesHealthLoad,
  propertiesAdd: _property_actions.propertiesAdd,
  roomTypesLoad: _room_type_actions.roomTypesLoad,
  roomTypesAdd: _room_type_actions.roomTypesAdd,
  roomTypesDrop: _room_type_actions.roomTypesDrop,
  ratePlansLoad: _rate_plan_actions.ratePlansLoad,
  ratePlansAdd: _rate_plan_actions.ratePlansAdd,
  ratePlansDrop: _rate_plan_actions.ratePlansDrop,
  rateCategoriesLoad: _rate_category_actions.rateCategoriesLoad,
  rateCategoriesAdd: _rate_category_actions.rateCategoriesAdd,
  rateCategoriesDrop: _rate_category_actions.rateCategoriesDrop,
  channelsLoad: _channel_actions.channelsLoad,
  channelsAdd: _channel_actions.channelsAdd,
  channelsDrop: _channel_actions.channelsDrop,
  channelsHealthLoad: _channel_health_actions.channelsHealthLoad,
  channelEventsLoad: _channel_events_actions.channelEventsLoad,
  emailTemplatesLoad: _email_template_actions.emailTemplatesLoad,
  emailTemplatesAdd: _email_template_actions.emailTemplatesAdd,
  emailTemplatesDrop: _email_template_actions.emailTemplatesDrop,
  userAdd: _current_user_actions.userAdd,
  usersLoad: _user_actions.usersLoad,
  usersAdd: _user_actions.usersAdd,
  usersDrop: _user_actions.usersDrop,
  whiteLabelPartnersLoad: _white_label_partner_actions.whiteLabelPartnersLoad,
  whiteLabelPartnersAdd: _white_label_partner_actions.whiteLabelPartnersAdd,
  whiteLabelPartnersDrop: _white_label_partner_actions.whiteLabelPartnersDrop,
  whiteLabelDomainsLoad: _white_label_domain_actions.whiteLabelDomainsLoad,
  whiteLabelDomainsAdd: _white_label_domain_actions.whiteLabelDomainsAdd,
  whiteLabelDomainsDrop: _white_label_domain_actions.whiteLabelDomainsDrop,
  whiteLabelEmailSettingsLoad: _white_label_email_settings_actions.whiteLabelEmailSettingsLoad,
  whiteLabelEmailSettingsAdd: _white_label_email_settings_actions.whiteLabelEmailSettingsAdd,
  whiteLabelEmailSettingsDrop: _white_label_email_settings_actions.whiteLabelEmailSettingsDrop,
  tasksLoad: _tasks_actions.tasksLoad,
  taxesAdd: _taxes_actions.taxesAdd,
  taxesDrop: _taxes_actions.taxesDrop,
  taxesLoad: _taxes_actions.taxesLoad,
  taxSetsAdd: _tax_sets_actions.taxSetsAdd,
  taxSetsDrop: _tax_sets_actions.taxSetsDrop,
  taxSetsLoad: _tax_sets_actions.taxSetsLoad,
  groupsLoad: _group_actions.groupsLoad,
  groupsAdd: _group_actions.groupsAdd,
  groupsDrop: _group_actions.groupsDrop,
  bookingsLoad: _booking_actions.bookingsLoad,
  bookingsAdd: _booking_actions.bookingsAdd,
  hotelPoliciesLoad: _hotel_policies_actions.hotelPoliciesLoad,
  hotelPoliciesAdd: _hotel_policies_actions.hotelPoliciesAdd,
  hotelPoliciesDrop: _hotel_policies_actions.hotelPoliciesDrop,
  cancellationPoliciesLoad: _cancellation_policies_actions.cancellationPoliciesLoad,
  cancellationPoliciesAdd: _cancellation_policies_actions.cancellationPoliciesAdd,
  cancellationPoliciesDrop: _cancellation_policies_actions.cancellationPoliciesDrop
};
exports["default"] = _default;
module.exports = exports.default;

/***/ }),

/***/ "./src/storage/actions/property_actions.js":
/*!*************************************************!*\
  !*** ./src/storage/actions/property_actions.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _constants = __webpack_require__(/*! ../constants */ "./src/storage/constants.js");

function propertiesLoad(storage) {
  return function (properties, meta) {
    storage.dispatch({
      type: _constants.PROPERTIES_LOAD,
      payload: {
        properties: properties,
        meta: meta
      }
    });
  };
}

function propertiesAdd(storage) {
  return function (property) {
    storage.dispatch({
      type: _constants.PROPERTIES_ADD,
      payload: property
    });
  };
}

var _default = {
  propertiesLoad: propertiesLoad,
  propertiesAdd: propertiesAdd
};
exports["default"] = _default;
module.exports = exports.default;

/***/ }),

/***/ "./src/storage/actions/property_health_actions.js":
/*!********************************************************!*\
  !*** ./src/storage/actions/property_health_actions.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _constants = __webpack_require__(/*! ../constants */ "./src/storage/constants.js");

function propertiesHealthLoad(storage) {
  return function (stats, meta) {
    storage.dispatch({
      type: _constants.PROPERTIES_HEALTH_LOAD,
      payload: {
        stats: stats,
        meta: meta
      }
    });
  };
}

var _default = {
  propertiesHealthLoad: propertiesHealthLoad
};
exports["default"] = _default;
module.exports = exports.default;

/***/ }),

/***/ "./src/storage/actions/rate_category_actions.js":
/*!******************************************************!*\
  !*** ./src/storage/actions/rate_category_actions.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _constants = __webpack_require__(/*! ../constants */ "./src/storage/constants.js");

function rateCategoriesLoad(storage) {
  return function (rateCategories) {
    storage.dispatch({
      type: _constants.RATE_CATEGORIES_LOAD,
      payload: rateCategories
    });
  };
}

function rateCategoriesAdd(storage) {
  return function (rateCategory) {
    storage.dispatch({
      type: _constants.RATE_CATEGORIES_ADD,
      payload: rateCategory
    });
  };
}

function rateCategoriesDrop(storage) {
  return function (rateCategory) {
    storage.dispatch({
      type: _constants.RATE_CATEGORIES_DROP,
      payload: rateCategory
    });
  };
}

var _default = {
  rateCategoriesLoad: rateCategoriesLoad,
  rateCategoriesAdd: rateCategoriesAdd,
  rateCategoriesDrop: rateCategoriesDrop
};
exports["default"] = _default;
module.exports = exports.default;

/***/ }),

/***/ "./src/storage/actions/rate_plan_actions.js":
/*!**************************************************!*\
  !*** ./src/storage/actions/rate_plan_actions.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _constants = __webpack_require__(/*! ../constants */ "./src/storage/constants.js");

function ratePlansLoad(storage) {
  return function (ratePlans) {
    storage.dispatch({
      type: _constants.RATE_PLANS_LOAD,
      payload: ratePlans
    });
  };
}

function ratePlansAdd(storage) {
  return function (ratePlan) {
    storage.dispatch({
      type: _constants.RATE_PLANS_ADD,
      payload: ratePlan
    });
  };
}

function ratePlansDrop(storage) {
  return function (ratePlan) {
    storage.dispatch({
      type: _constants.RATE_PLANS_DROP,
      payload: ratePlan
    });
  };
}

var _default = {
  ratePlansLoad: ratePlansLoad,
  ratePlansAdd: ratePlansAdd,
  ratePlansDrop: ratePlansDrop
};
exports["default"] = _default;
module.exports = exports.default;

/***/ }),

/***/ "./src/storage/actions/room_type_actions.js":
/*!**************************************************!*\
  !*** ./src/storage/actions/room_type_actions.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _constants = __webpack_require__(/*! ../constants */ "./src/storage/constants.js");

function roomTypesLoad(storage) {
  return function (records, meta) {
    storage.dispatch({
      type: _constants.ROOM_TYPES_LOAD,
      payload: {
        records: records,
        meta: meta
      }
    });
  };
}

function roomTypesAdd(storage) {
  return function (roomType) {
    storage.dispatch({
      type: _constants.ROOM_TYPES_ADD,
      payload: roomType
    });
  };
}

function roomTypesDrop(storage) {
  return function (roomType) {
    storage.dispatch({
      type: _constants.ROOM_TYPES_DROP,
      payload: roomType
    });
  };
}

var _default = {
  roomTypesLoad: roomTypesLoad,
  roomTypesAdd: roomTypesAdd,
  roomTypesDrop: roomTypesDrop
};
exports["default"] = _default;
module.exports = exports.default;

/***/ }),

/***/ "./src/storage/actions/session_actions.js":
/*!************************************************!*\
  !*** ./src/storage/actions/session_actions.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _constants = __webpack_require__(/*! ../constants */ "./src/storage/constants.js");

function sessionAdd(storage) {
  return function (session) {
    storage.dispatch({
      type: _constants.SESSION_ADD,
      payload: session
    });
  };
}

function chooseProperty(storage) {
  return function (property) {
    storage.dispatch({
      type: _constants.CHOOSE_PROPERTY,
      payload: property
    });
  };
}

function chooseGroup(storage) {
  return function (group) {
    storage.dispatch({
      type: _constants.CHOOSE_GROUP,
      payload: group
    });
  };
}

var _default = {
  sessionAdd: sessionAdd,
  chooseProperty: chooseProperty,
  chooseGroup: chooseGroup
};
exports["default"] = _default;
module.exports = exports.default;

/***/ }),

/***/ "./src/storage/actions/tasks_actions.js":
/*!**********************************************!*\
  !*** ./src/storage/actions/tasks_actions.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _constants = __webpack_require__(/*! ../constants */ "./src/storage/constants.js");

function tasksLoad(storage) {
  return function (tasks, meta) {
    storage.dispatch({
      type: _constants.TASKS_LOAD,
      payload: {
        tasks: tasks,
        meta: meta
      }
    });
  };
}

var _default = {
  tasksLoad: tasksLoad
};
exports["default"] = _default;
module.exports = exports.default;

/***/ }),

/***/ "./src/storage/actions/tax_sets_actions.js":
/*!*************************************************!*\
  !*** ./src/storage/actions/tax_sets_actions.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _constants = __webpack_require__(/*! ../constants */ "./src/storage/constants.js");

function taxSetsLoad(storage) {
  return function (records, meta) {
    storage.dispatch({
      type: _constants.TAX_SETS_LOAD,
      payload: {
        records: records,
        meta: meta
      }
    });
  };
}

function taxSetsAdd(storage) {
  return function (payload) {
    storage.dispatch({
      type: _constants.TAX_SETS_ADD,
      payload: payload
    });
  };
}

function taxSetsDrop(storage) {
  return function (payload) {
    storage.dispatch({
      type: _constants.TAX_SETS_DROP,
      payload: payload
    });
  };
}

var _default = {
  taxSetsLoad: taxSetsLoad,
  taxSetsAdd: taxSetsAdd,
  taxSetsDrop: taxSetsDrop
};
exports["default"] = _default;
module.exports = exports.default;

/***/ }),

/***/ "./src/storage/actions/taxes_actions.js":
/*!**********************************************!*\
  !*** ./src/storage/actions/taxes_actions.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _constants = __webpack_require__(/*! ../constants */ "./src/storage/constants.js");

function taxesLoad(storage) {
  return function (records, meta) {
    storage.dispatch({
      type: _constants.TAXES_LOAD,
      payload: {
        records: records,
        meta: meta
      }
    });
  };
}

function taxesAdd(storage) {
  return function (payload) {
    storage.dispatch({
      type: _constants.TAXES_ADD,
      payload: payload
    });
  };
}

function taxesDrop(storage) {
  return function (payload) {
    storage.dispatch({
      type: _constants.TAXES_DROP,
      payload: payload
    });
  };
}

var _default = {
  taxesLoad: taxesLoad,
  taxesAdd: taxesAdd,
  taxesDrop: taxesDrop
};
exports["default"] = _default;
module.exports = exports.default;

/***/ }),

/***/ "./src/storage/actions/user_actions.js":
/*!*********************************************!*\
  !*** ./src/storage/actions/user_actions.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _constants = __webpack_require__(/*! ../constants */ "./src/storage/constants.js");

function usersLoad(storage) {
  return function (users) {
    storage.dispatch({
      type: _constants.USERS_LOAD,
      payload: users
    });
  };
}

function usersAdd(storage) {
  return function (user) {
    storage.dispatch({
      type: _constants.USERS_ADD,
      payload: user
    });
  };
}

function usersDrop(storage) {
  return function (user) {
    storage.dispatch({
      type: _constants.USERS_DROP,
      payload: user
    });
  };
}

var _default = {
  usersLoad: usersLoad,
  usersAdd: usersAdd,
  usersDrop: usersDrop
};
exports["default"] = _default;
module.exports = exports.default;

/***/ }),

/***/ "./src/storage/actions/white_label_domain_actions.js":
/*!***********************************************************!*\
  !*** ./src/storage/actions/white_label_domain_actions.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _constants = __webpack_require__(/*! ../constants */ "./src/storage/constants.js");

function whiteLabelDomainsLoad(storage) {
  return function (whiteLabelDomains) {
    storage.dispatch({
      type: _constants.WHITE_LABEL_DOMAINS_LOAD,
      payload: whiteLabelDomains
    });
  };
}

function whiteLabelDomainsAdd(storage) {
  return function (whiteLabelDomain) {
    storage.dispatch({
      type: _constants.WHITE_LABEL_DOMAINS_ADD,
      payload: whiteLabelDomain
    });
  };
}

function whiteLabelDomainsDrop(storage) {
  return function (whiteLabelDomain) {
    storage.dispatch({
      type: _constants.WHITE_LABEL_DOMAINS_DROP,
      payload: whiteLabelDomain
    });
  };
}

var _default = {
  whiteLabelDomainsLoad: whiteLabelDomainsLoad,
  whiteLabelDomainsAdd: whiteLabelDomainsAdd,
  whiteLabelDomainsDrop: whiteLabelDomainsDrop
};
exports["default"] = _default;
module.exports = exports.default;

/***/ }),

/***/ "./src/storage/actions/white_label_email_settings_actions.js":
/*!*******************************************************************!*\
  !*** ./src/storage/actions/white_label_email_settings_actions.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _constants = __webpack_require__(/*! ../constants */ "./src/storage/constants.js");

function whiteLabelEmailSettingsLoad(storage) {
  return function (whiteLabelEmailSettings) {
    storage.dispatch({
      type: _constants.WHITE_LABEL_EMAIL_SETTINGS_LOAD,
      payload: whiteLabelEmailSettings
    });
  };
}

function whiteLabelEmailSettingsAdd(storage) {
  return function (whiteLabelEmailSetting) {
    storage.dispatch({
      type: _constants.WHITE_LABEL_EMAIL_SETTINGS_ADD,
      payload: whiteLabelEmailSetting
    });
  };
}

function whiteLabelEmailSettingsDrop(storage) {
  return function (whiteLabelEmailSetting) {
    storage.dispatch({
      type: _constants.WHITE_LABEL_EMAIL_SETTINGS_DROP,
      payload: whiteLabelEmailSetting
    });
  };
}

var _default = {
  whiteLabelEmailSettingsLoad: whiteLabelEmailSettingsLoad,
  whiteLabelEmailSettingsAdd: whiteLabelEmailSettingsAdd,
  whiteLabelEmailSettingsDrop: whiteLabelEmailSettingsDrop
};
exports["default"] = _default;
module.exports = exports.default;

/***/ }),

/***/ "./src/storage/actions/white_label_partner_actions.js":
/*!************************************************************!*\
  !*** ./src/storage/actions/white_label_partner_actions.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _constants = __webpack_require__(/*! ../constants */ "./src/storage/constants.js");

function whiteLabelPartnersLoad(storage) {
  return function (whiteLabelPartners) {
    storage.dispatch({
      type: _constants.WHITE_LABEL_PARTNERS_LOAD,
      payload: whiteLabelPartners
    });
  };
}

function whiteLabelPartnersAdd(storage) {
  return function (whiteLabelPartner) {
    storage.dispatch({
      type: _constants.WHITE_LABEL_PARTNERS_ADD,
      payload: whiteLabelPartner
    });
  };
}

function whiteLabelPartnersDrop(storage) {
  return function (whiteLabelPartner) {
    storage.dispatch({
      type: _constants.WHITE_LABEL_PARTNERS_DROP,
      payload: whiteLabelPartner
    });
  };
}

var _default = {
  whiteLabelPartnersLoad: whiteLabelPartnersLoad,
  whiteLabelPartnersAdd: whiteLabelPartnersAdd,
  whiteLabelPartnersDrop: whiteLabelPartnersDrop
};
exports["default"] = _default;
module.exports = exports.default;

/***/ }),

/***/ "./src/storage/constants.js":
/*!**********************************!*\
  !*** ./src/storage/constants.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CANCELLATION_POLICIES_DROP = exports.CANCELLATION_POLICIES_ADD = exports.CANCELLATION_POLICIES_LOAD = exports.HOTEL_POLICIES_DROP = exports.HOTEL_POLICIES_ADD = exports.HOTEL_POLICIES_LOAD = exports.BOOKINGS_ADD = exports.BOOKINGS_LOAD = exports.CHANNEL_EVENTS_LOAD = exports.GROUPS_DROP = exports.GROUPS_ADD = exports.GROUPS_LOAD = exports.TAX_SETS_DROP = exports.TAX_SETS_ADD = exports.TAX_SETS_LOAD = exports.TAXES_DROP = exports.TAXES_ADD = exports.TAXES_LOAD = exports.TASKS_LOAD = exports.EMAIL_TEMPLATES_DROP = exports.EMAIL_TEMPLATES_ADD = exports.EMAIL_TEMPLATES_LOAD = exports.WHITE_LABEL_EMAIL_SETTINGS_DROP = exports.WHITE_LABEL_EMAIL_SETTINGS_ADD = exports.WHITE_LABEL_EMAIL_SETTINGS_LOAD = exports.WHITE_LABEL_DOMAINS_DROP = exports.WHITE_LABEL_DOMAINS_ADD = exports.WHITE_LABEL_DOMAINS_LOAD = exports.WHITE_LABEL_PARTNERS_DROP = exports.WHITE_LABEL_PARTNERS_ADD = exports.WHITE_LABEL_PARTNERS_LOAD = exports.USERS_DROP = exports.USERS_ADD = exports.USERS_LOAD = exports.USER_ADD = exports.CHANNELS_HEALTH_LOAD = exports.CHANNELS_DROP = exports.CHANNELS_ADD = exports.CHANNELS_LOAD = exports.RATE_PLANS_DROP = exports.RATE_PLANS_ADD = exports.RATE_PLANS_LOAD = exports.RATE_CATEGORIES_DROP = exports.RATE_CATEGORIES_ADD = exports.RATE_CATEGORIES_LOAD = exports.ROOM_TYPES_DROP = exports.ROOM_TYPES_ADD = exports.ROOM_TYPES_LOAD = exports.PROPERTIES_HEALTH_LOAD = exports.PROPERTIES_DROP = exports.PROPERTIES_ADD = exports.PROPERTIES_LOAD = exports.CHOOSE_GROUP = exports.CHOOSE_PROPERTY = exports.SESSION_ADD = exports.STORAGE_CACHE_KEY = void 0;
var STORAGE_CACHE_KEY = 'CHANNEX_BL_CACHE';
exports.STORAGE_CACHE_KEY = STORAGE_CACHE_KEY;
var SESSION_ADD = 'SESSION_ADD';
exports.SESSION_ADD = SESSION_ADD;
var CHOOSE_PROPERTY = 'CHOOSE_PROPERTY';
exports.CHOOSE_PROPERTY = CHOOSE_PROPERTY;
var CHOOSE_GROUP = 'CHOOSE_GROUP';
exports.CHOOSE_GROUP = CHOOSE_GROUP;
var PROPERTIES_LOAD = 'PROPERTIES_LOAD';
exports.PROPERTIES_LOAD = PROPERTIES_LOAD;
var PROPERTIES_ADD = 'PROPERTIES_ADD';
exports.PROPERTIES_ADD = PROPERTIES_ADD;
var PROPERTIES_DROP = 'PROPERTIES_DROP';
exports.PROPERTIES_DROP = PROPERTIES_DROP;
var PROPERTIES_HEALTH_LOAD = 'PROPERTIES_HEALTH_LOAD';
exports.PROPERTIES_HEALTH_LOAD = PROPERTIES_HEALTH_LOAD;
var ROOM_TYPES_LOAD = 'ROOM_TYPES_LOAD';
exports.ROOM_TYPES_LOAD = ROOM_TYPES_LOAD;
var ROOM_TYPES_ADD = 'ROOM_TYPES_ADD';
exports.ROOM_TYPES_ADD = ROOM_TYPES_ADD;
var ROOM_TYPES_DROP = 'ROOM_TYPES_DROP';
exports.ROOM_TYPES_DROP = ROOM_TYPES_DROP;
var RATE_CATEGORIES_LOAD = 'RATE_CATEGORIES_LOAD';
exports.RATE_CATEGORIES_LOAD = RATE_CATEGORIES_LOAD;
var RATE_CATEGORIES_ADD = 'RATE_CATEGORIES_ADD';
exports.RATE_CATEGORIES_ADD = RATE_CATEGORIES_ADD;
var RATE_CATEGORIES_DROP = 'RATE_CATEGORIES_DROP';
exports.RATE_CATEGORIES_DROP = RATE_CATEGORIES_DROP;
var RATE_PLANS_LOAD = 'RATE_PLANS_LOAD';
exports.RATE_PLANS_LOAD = RATE_PLANS_LOAD;
var RATE_PLANS_ADD = 'RATE_PLANS_ADD';
exports.RATE_PLANS_ADD = RATE_PLANS_ADD;
var RATE_PLANS_DROP = 'RATE_PLANS_DROP';
exports.RATE_PLANS_DROP = RATE_PLANS_DROP;
var CHANNELS_LOAD = 'CHANNELS_LOAD';
exports.CHANNELS_LOAD = CHANNELS_LOAD;
var CHANNELS_ADD = 'CHANNELS_ADD';
exports.CHANNELS_ADD = CHANNELS_ADD;
var CHANNELS_DROP = 'CHANNELS_DROP';
exports.CHANNELS_DROP = CHANNELS_DROP;
var CHANNELS_HEALTH_LOAD = 'CHANNELS_HEALTH_LOAD';
exports.CHANNELS_HEALTH_LOAD = CHANNELS_HEALTH_LOAD;
var USER_ADD = 'USER_ADD';
exports.USER_ADD = USER_ADD;
var USERS_LOAD = 'USERS_LOAD';
exports.USERS_LOAD = USERS_LOAD;
var USERS_ADD = 'USERS_ADD';
exports.USERS_ADD = USERS_ADD;
var USERS_DROP = 'USERS_DROP';
exports.USERS_DROP = USERS_DROP;
var WHITE_LABEL_PARTNERS_LOAD = 'WHITE_LABEL_PARTNERS_LOAD';
exports.WHITE_LABEL_PARTNERS_LOAD = WHITE_LABEL_PARTNERS_LOAD;
var WHITE_LABEL_PARTNERS_ADD = 'WHITE_LABEL_PARTNERS_ADD';
exports.WHITE_LABEL_PARTNERS_ADD = WHITE_LABEL_PARTNERS_ADD;
var WHITE_LABEL_PARTNERS_DROP = 'WHITE_LABEL_PARTNERS_DROP';
exports.WHITE_LABEL_PARTNERS_DROP = WHITE_LABEL_PARTNERS_DROP;
var WHITE_LABEL_DOMAINS_LOAD = 'WHITE_LABEL_DOMAINS_LOAD';
exports.WHITE_LABEL_DOMAINS_LOAD = WHITE_LABEL_DOMAINS_LOAD;
var WHITE_LABEL_DOMAINS_ADD = 'WHITE_LABEL_DOMAINS_ADD';
exports.WHITE_LABEL_DOMAINS_ADD = WHITE_LABEL_DOMAINS_ADD;
var WHITE_LABEL_DOMAINS_DROP = 'WHITE_LABEL_DOMAINS_DROP';
exports.WHITE_LABEL_DOMAINS_DROP = WHITE_LABEL_DOMAINS_DROP;
var WHITE_LABEL_EMAIL_SETTINGS_LOAD = 'WHITE_LABEL_EMAIL_SETTINGS_LOAD';
exports.WHITE_LABEL_EMAIL_SETTINGS_LOAD = WHITE_LABEL_EMAIL_SETTINGS_LOAD;
var WHITE_LABEL_EMAIL_SETTINGS_ADD = 'WHITE_LABEL_EMAIL_SETTINGS_ADD';
exports.WHITE_LABEL_EMAIL_SETTINGS_ADD = WHITE_LABEL_EMAIL_SETTINGS_ADD;
var WHITE_LABEL_EMAIL_SETTINGS_DROP = 'WHITE_LABEL_EMAIL_SETTINGS_DROP';
exports.WHITE_LABEL_EMAIL_SETTINGS_DROP = WHITE_LABEL_EMAIL_SETTINGS_DROP;
var EMAIL_TEMPLATES_LOAD = 'EMAIL_TEMPLATES_LOAD';
exports.EMAIL_TEMPLATES_LOAD = EMAIL_TEMPLATES_LOAD;
var EMAIL_TEMPLATES_ADD = 'EMAIL_TEMPLATES_ADD';
exports.EMAIL_TEMPLATES_ADD = EMAIL_TEMPLATES_ADD;
var EMAIL_TEMPLATES_DROP = 'EMAIL_TEMPLATES_DROP';
exports.EMAIL_TEMPLATES_DROP = EMAIL_TEMPLATES_DROP;
var TASKS_LOAD = 'TASKS_LOAD';
exports.TASKS_LOAD = TASKS_LOAD;
var TAXES_LOAD = 'TAXES_LOAD';
exports.TAXES_LOAD = TAXES_LOAD;
var TAXES_ADD = 'TAXES_ADD';
exports.TAXES_ADD = TAXES_ADD;
var TAXES_DROP = 'TAXES_DROP';
exports.TAXES_DROP = TAXES_DROP;
var TAX_SETS_LOAD = 'TAX_SETS_LOAD';
exports.TAX_SETS_LOAD = TAX_SETS_LOAD;
var TAX_SETS_ADD = 'TAX_SETS_ADD';
exports.TAX_SETS_ADD = TAX_SETS_ADD;
var TAX_SETS_DROP = 'TAX_SETS_DROP';
exports.TAX_SETS_DROP = TAX_SETS_DROP;
var GROUPS_LOAD = 'GROUPS_LOAD';
exports.GROUPS_LOAD = GROUPS_LOAD;
var GROUPS_ADD = 'GROUPS_ADD';
exports.GROUPS_ADD = GROUPS_ADD;
var GROUPS_DROP = 'GROUPS_DROP';
exports.GROUPS_DROP = GROUPS_DROP;
var CHANNEL_EVENTS_LOAD = 'CHANNEL_EVENTS_LOAD';
exports.CHANNEL_EVENTS_LOAD = CHANNEL_EVENTS_LOAD;
var BOOKINGS_LOAD = 'BOOKINGS_LOAD';
exports.BOOKINGS_LOAD = BOOKINGS_LOAD;
var BOOKINGS_ADD = 'BOOKINGS_ADD';
exports.BOOKINGS_ADD = BOOKINGS_ADD;
var HOTEL_POLICIES_LOAD = 'HOTEL_POLICIES_LOAD';
exports.HOTEL_POLICIES_LOAD = HOTEL_POLICIES_LOAD;
var HOTEL_POLICIES_ADD = 'HOTEL_POLICIES_ADD';
exports.HOTEL_POLICIES_ADD = HOTEL_POLICIES_ADD;
var HOTEL_POLICIES_DROP = 'HOTEL_POLICIES_DROP';
exports.HOTEL_POLICIES_DROP = HOTEL_POLICIES_DROP;
var CANCELLATION_POLICIES_LOAD = 'CANCELLATION_POLICIES_LOAD';
exports.CANCELLATION_POLICIES_LOAD = CANCELLATION_POLICIES_LOAD;
var CANCELLATION_POLICIES_ADD = 'CANCELLATION_POLICIES_ADD';
exports.CANCELLATION_POLICIES_ADD = CANCELLATION_POLICIES_ADD;
var CANCELLATION_POLICIES_DROP = 'CANCELLATION_POLICIES_DROP';
exports.CANCELLATION_POLICIES_DROP = CANCELLATION_POLICIES_DROP;

/***/ }),

/***/ "./src/storage/index.js":
/*!******************************!*\
  !*** ./src/storage/index.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _redux = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");

var _developmentOnly = __webpack_require__(/*! redux-devtools-extension/developmentOnly */ "./node_modules/redux-devtools-extension/developmentOnly.js");

var _actions = _interopRequireDefault(__webpack_require__(/*! ./actions */ "./src/storage/actions/index.js"));

var _reducers = _interopRequireDefault(__webpack_require__(/*! ./reducers */ "./src/storage/reducers/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function assignActions(target) {
  Object.keys(_actions["default"]).forEach(function (action) {
    if (typeof target[action] === 'undefined') {
      target[action] = _actions["default"][action](target);
    } else {
      throw new Error("".concat(action, " is present at storage object"));
    }
  });
  return target;
}

var Storage = function Storage(preloadedState) {
  var storage = (0, _redux.createStore)(_reducers["default"], preloadedState, (0, _developmentOnly.composeWithDevTools)());
  return assignActions(storage);
};

var _default = Storage;
exports["default"] = _default;
module.exports = exports.default;

/***/ }),

/***/ "./src/storage/reducers/bookings_reducer.js":
/*!**************************************************!*\
  !*** ./src/storage/reducers/bookings_reducer.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = groupsReducer;

var _constants = __webpack_require__(/*! ../constants */ "./src/storage/constants.js");

var _ACTION_HANDLERS;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var initialState = null;
var ACTION_HANDLERS = (_ACTION_HANDLERS = {}, _defineProperty(_ACTION_HANDLERS, _constants.BOOKINGS_LOAD, function (state, action) {
  var entities = action.payload.bookings.reduce(function (acc, el) {
    acc[el.id] = el.attributes;

    if (el.relationships) {
      Object.keys(el.relationships).forEach(function (key) {
        acc[el.id]["".concat(key, "_id")] = el.relationships[key].data.id;
      });
    }

    return acc;
  }, {});
  return {
    entities: entities,
    meta: action.payload.meta
  };
}), _defineProperty(_ACTION_HANDLERS, _constants.BOOKINGS_ADD, function (state, action) {
  var item = {};
  item[action.payload.id] = action.payload.attributes;

  if (action.payload.relationships) {
    Object.keys(action.payload.relationships).forEach(function (key) {
      item[action.payload.id]["".concat(key, "_id")] = action.payload.relationships[key].data.id;
    });
  }

  var entities = Object.assign({}, state ? state.entities || {} : {}, item);
  return {
    entities: entities,
    meta: state ? state.meta : {}
  };
}), _ACTION_HANDLERS);

function groupsReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments.length > 1 ? arguments[1] : undefined;
  var handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}

module.exports = exports.default;

/***/ }),

/***/ "./src/storage/reducers/cancellation_policies_reducer.js":
/*!***************************************************************!*\
  !*** ./src/storage/reducers/cancellation_policies_reducer.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = cancellationPoliciesReducer;

var _constants = __webpack_require__(/*! ../constants */ "./src/storage/constants.js");

var _ACTION_HANDLERS;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var initialState = null;
var ACTION_HANDLERS = (_ACTION_HANDLERS = {}, _defineProperty(_ACTION_HANDLERS, _constants.CANCELLATION_POLICIES_LOAD, function (state, action) {
  var entities = action.payload.records.reduce(function (acc, _ref) {
    var id = _ref.id,
        attributes = _ref.attributes;
    acc[id] = attributes;
    return acc;
  }, {});
  return {
    entities: entities,
    meta: action.payload.meta
  };
}), _defineProperty(_ACTION_HANDLERS, _constants.CANCELLATION_POLICIES_ADD, function (state, action) {
  var state_entities = state && state.entities ? state.entities : {};
  var _action$payload = action.payload,
      id = _action$payload.id,
      attributes = _action$payload.attributes;
  var entities = Object.assign({}, state_entities, _defineProperty({}, id, attributes));
  return Object.assign({}, state, {
    entities: entities
  });
}), _defineProperty(_ACTION_HANDLERS, _constants.CANCELLATION_POLICIES_DROP, function (state, action) {
  if (state && state.entities) {
    delete state.entities[action.payload.id];
  }

  return Object.assign({}, state || {}, {});
}), _ACTION_HANDLERS);

function cancellationPoliciesReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments.length > 1 ? arguments[1] : undefined;
  var handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}

module.exports = exports.default;

/***/ }),

/***/ "./src/storage/reducers/channel_events_reducer.js":
/*!********************************************************!*\
  !*** ./src/storage/reducers/channel_events_reducer.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = channelEventsReducer;

var _constants = __webpack_require__(/*! ../constants */ "./src/storage/constants.js");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var initialState = {
  entities: null,
  meta: null
};

var ACTION_HANDLERS = _defineProperty({}, _constants.CHANNEL_EVENTS_LOAD, function (state, action) {
  var entities = action.payload.channelEvents.reduce(function (acc, el) {
    acc[el.id] = el.attributes;

    if (el.relationships) {
      Object.keys(el.relationships).forEach(function (key) {
        acc[el.id]["".concat(key, "_id")] = el.relationships[key].data.id;
      });
    }

    return acc;
  }, {});
  return {
    entities: entities,
    meta: action.payload.meta
  };
});

function channelEventsReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments.length > 1 ? arguments[1] : undefined;
  var handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}

module.exports = exports.default;

/***/ }),

/***/ "./src/storage/reducers/channels_health_reducer.js":
/*!*********************************************************!*\
  !*** ./src/storage/reducers/channels_health_reducer.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = channelsHealthReducer;

var _constants = __webpack_require__(/*! ../constants */ "./src/storage/constants.js");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var initialState = null;

var ACTION_HANDLERS = _defineProperty({}, _constants.CHANNELS_HEALTH_LOAD, function (state, action) {
  var entities = action.payload.stats.reduce(function (acc, el) {
    acc[el.id] = el.attributes;
    return acc;
  }, {});
  return {
    entities: entities,
    meta: action.payload.meta
  };
});

function channelsHealthReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments.length > 1 ? arguments[1] : undefined;
  var handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}

module.exports = exports.default;

/***/ }),

/***/ "./src/storage/reducers/channels_reducer.js":
/*!**************************************************!*\
  !*** ./src/storage/reducers/channels_reducer.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = channelsReducer;

var _constants = __webpack_require__(/*! ../constants */ "./src/storage/constants.js");

var _ACTION_HANDLERS;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var initialState = null;
var ACTION_HANDLERS = (_ACTION_HANDLERS = {}, _defineProperty(_ACTION_HANDLERS, _constants.CHANNELS_LOAD, function (state, action) {
  return action.payload.reduce(function (acc, el) {
    acc[el.id] = el.attributes;

    if (el.relationships) {
      Object.keys(el.relationships).forEach(function (key) {
        acc[el.id]["".concat(key, "_id")] = el.relationships[key].data.id;
      });
    }

    return acc;
  }, {});
}), _defineProperty(_ACTION_HANDLERS, _constants.CHANNELS_ADD, function (state, action) {
  var item = {};
  item[action.payload.id] = action.payload.attributes;

  if (action.payload.relationships) {
    Object.keys(action.payload.relationships).forEach(function (key) {
      item[action.payload.id]["".concat(key, "_id")] = action.payload.relationships[key].data.id;
    });
  }

  return Object.assign({}, state || {}, item);
}), _defineProperty(_ACTION_HANDLERS, _constants.CHANNELS_DROP, function (state, action) {
  delete state[action.payload.id];
  return Object.assign({}, state || {}, {});
}), _ACTION_HANDLERS);

function channelsReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments.length > 1 ? arguments[1] : undefined;
  var handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}

module.exports = exports.default;

/***/ }),

/***/ "./src/storage/reducers/email_templates_reducer.js":
/*!*********************************************************!*\
  !*** ./src/storage/reducers/email_templates_reducer.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = emailTemplatesReducer;

var _constants = __webpack_require__(/*! ../constants */ "./src/storage/constants.js");

var _ACTION_HANDLERS;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var initialState = null;
var ACTION_HANDLERS = (_ACTION_HANDLERS = {}, _defineProperty(_ACTION_HANDLERS, _constants.EMAIL_TEMPLATES_LOAD, function (state, action) {
  return action.payload.reduce(function (acc, el) {
    acc[el.id] = el.attributes;

    if (el.relationships) {
      Object.keys(el.relationships).forEach(function (key) {
        acc[el.id]["".concat(key, "_id")] = el.relationships[key].data.id;
      });
    }

    return acc;
  }, {});
}), _defineProperty(_ACTION_HANDLERS, _constants.EMAIL_TEMPLATES_ADD, function (state, action) {
  var item = {};
  item[action.payload.id] = action.payload.attributes;
  return Object.assign({}, state || {}, item);
}), _defineProperty(_ACTION_HANDLERS, _constants.EMAIL_TEMPLATES_DROP, function (state, action) {
  delete state[action.payload.id];
  return Object.assign({}, state || {}, {});
}), _ACTION_HANDLERS);

function emailTemplatesReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments.length > 1 ? arguments[1] : undefined;
  var handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}

module.exports = exports.default;

/***/ }),

/***/ "./src/storage/reducers/groups_reducer.js":
/*!************************************************!*\
  !*** ./src/storage/reducers/groups_reducer.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = groupsReducer;

var _constants = __webpack_require__(/*! ../constants */ "./src/storage/constants.js");

var _ACTION_HANDLERS;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var initialState = null;
var ACTION_HANDLERS = (_ACTION_HANDLERS = {}, _defineProperty(_ACTION_HANDLERS, _constants.GROUPS_LOAD, function (state, action) {
  return action.payload.reduce(function (acc, el) {
    acc[el.id] = el.attributes;

    if (el.relationships) {
      Object.keys(el.relationships).forEach(function (key) {
        if (Array.isArray(el.relationships[key].data)) {
          acc[el.id][key] = el.relationships[key].data.map(function (el) {
            return el.attributes;
          }).reduce(function (acc, el) {
            acc[el.id] = el;
            return acc;
          }, {});
        } else {
          acc[el.id]["".concat(key, "_id")] = el.relationships[key].data.id;
        }
      });
    }

    return acc;
  }, {});
}), _defineProperty(_ACTION_HANDLERS, _constants.GROUPS_ADD, function (state, action) {
  var item = {};
  item[action.payload.id] = action.payload.attributes;

  if (action.payload.relationships) {
    Object.keys(action.payload.relationships).forEach(function (key) {
      if (Array.isArray(action.payload.relationships[key].data)) {
        item[action.payload.id][key] = action.payload.relationships[key].data.map(function (el) {
          return el.attributes;
        }).reduce(function (acc, el) {
          acc[el.id] = el;
          return acc;
        }, {});
      } else {
        item[action.payload.id]["".concat(key, "_id")] = action.payload.relationships[key].data.id;
      }
    });
  }

  return Object.assign({}, state || {}, item);
}), _defineProperty(_ACTION_HANDLERS, _constants.GROUPS_DROP, function (state, action) {
  return Object.keys(state).filter(function (key) {
    return key !== action.payload.id;
  }).reduce(function (acc, key) {
    acc[key] = state[key];
    return acc;
  }, {});
}), _ACTION_HANDLERS);

function groupsReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments.length > 1 ? arguments[1] : undefined;
  var handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}

module.exports = exports.default;

/***/ }),

/***/ "./src/storage/reducers/hotel_policies_reducer.js":
/*!********************************************************!*\
  !*** ./src/storage/reducers/hotel_policies_reducer.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = hotelPoliciesReducer;

var _constants = __webpack_require__(/*! ../constants */ "./src/storage/constants.js");

var _ACTION_HANDLERS;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var initialState = null;
var ACTION_HANDLERS = (_ACTION_HANDLERS = {}, _defineProperty(_ACTION_HANDLERS, _constants.HOTEL_POLICIES_LOAD, function (state, action) {
  var entities = action.payload.records.reduce(function (acc, _ref) {
    var id = _ref.id,
        attributes = _ref.attributes;
    acc[id] = attributes;
    return acc;
  }, {});
  return {
    entities: entities,
    meta: action.payload.meta
  };
}), _defineProperty(_ACTION_HANDLERS, _constants.HOTEL_POLICIES_ADD, function (state, action) {
  var state_entities = state && state.entities ? state.entities : {};
  var _action$payload = action.payload,
      id = _action$payload.id,
      attributes = _action$payload.attributes;
  var entities = Object.assign({}, state_entities, _defineProperty({}, id, attributes));
  return Object.assign({}, state, {
    entities: entities
  });
}), _defineProperty(_ACTION_HANDLERS, _constants.HOTEL_POLICIES_DROP, function (state, action) {
  if (state && state.entities) {
    delete state.entities[action.payload.id];
  }

  return Object.assign({}, state || {}, {});
}), _ACTION_HANDLERS);

function hotelPoliciesReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments.length > 1 ? arguments[1] : undefined;
  var handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}

module.exports = exports.default;

/***/ }),

/***/ "./src/storage/reducers/index.js":
/*!***************************************!*\
  !*** ./src/storage/reducers/index.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _redux = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");

var _session_reducer = _interopRequireDefault(__webpack_require__(/*! ./session_reducer */ "./src/storage/reducers/session_reducer.js"));

var _properties_reducer = _interopRequireDefault(__webpack_require__(/*! ./properties_reducer */ "./src/storage/reducers/properties_reducer.js"));

var _properties_health_reducer = _interopRequireDefault(__webpack_require__(/*! ./properties_health_reducer */ "./src/storage/reducers/properties_health_reducer.js"));

var _room_types_reducer = _interopRequireDefault(__webpack_require__(/*! ./room_types_reducer */ "./src/storage/reducers/room_types_reducer.js"));

var _rate_plans_reducer = _interopRequireDefault(__webpack_require__(/*! ./rate_plans_reducer */ "./src/storage/reducers/rate_plans_reducer.js"));

var _rate_categories_reducer = _interopRequireDefault(__webpack_require__(/*! ./rate_categories_reducer */ "./src/storage/reducers/rate_categories_reducer.js"));

var _channels_reducer = _interopRequireDefault(__webpack_require__(/*! ./channels_reducer */ "./src/storage/reducers/channels_reducer.js"));

var _channels_health_reducer = _interopRequireDefault(__webpack_require__(/*! ./channels_health_reducer */ "./src/storage/reducers/channels_health_reducer.js"));

var _channel_events_reducer = _interopRequireDefault(__webpack_require__(/*! ./channel_events_reducer */ "./src/storage/reducers/channel_events_reducer.js"));

var _email_templates_reducer = _interopRequireDefault(__webpack_require__(/*! ./email_templates_reducer */ "./src/storage/reducers/email_templates_reducer.js"));

var _user_reducer = _interopRequireDefault(__webpack_require__(/*! ./user_reducer */ "./src/storage/reducers/user_reducer.js"));

var _users_reducer = _interopRequireDefault(__webpack_require__(/*! ./users_reducer */ "./src/storage/reducers/users_reducer.js"));

var _white_label_partners_reducer = _interopRequireDefault(__webpack_require__(/*! ./white_label_partners_reducer */ "./src/storage/reducers/white_label_partners_reducer.js"));

var _white_label_domains_reducer = _interopRequireDefault(__webpack_require__(/*! ./white_label_domains_reducer */ "./src/storage/reducers/white_label_domains_reducer.js"));

var _white_label_email_settings_reducer = _interopRequireDefault(__webpack_require__(/*! ./white_label_email_settings_reducer */ "./src/storage/reducers/white_label_email_settings_reducer.js"));

var _tasks_reducer = _interopRequireDefault(__webpack_require__(/*! ./tasks_reducer */ "./src/storage/reducers/tasks_reducer.js"));

var _taxes_reducer = _interopRequireDefault(__webpack_require__(/*! ./taxes_reducer */ "./src/storage/reducers/taxes_reducer.js"));

var _tax_sets_reducer = _interopRequireDefault(__webpack_require__(/*! ./tax_sets_reducer */ "./src/storage/reducers/tax_sets_reducer.js"));

var _groups_reducer = _interopRequireDefault(__webpack_require__(/*! ./groups_reducer */ "./src/storage/reducers/groups_reducer.js"));

var _bookings_reducer = _interopRequireDefault(__webpack_require__(/*! ./bookings_reducer */ "./src/storage/reducers/bookings_reducer.js"));

var _hotel_policies_reducer = _interopRequireDefault(__webpack_require__(/*! ./hotel_policies_reducer */ "./src/storage/reducers/hotel_policies_reducer.js"));

var _cancellation_policies_reducer = _interopRequireDefault(__webpack_require__(/*! ./cancellation_policies_reducer */ "./src/storage/reducers/cancellation_policies_reducer.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var rootReducer = (0, _redux.combineReducers)({
  session: _session_reducer["default"],
  properties: _properties_reducer["default"],
  propertiesHealth: _properties_health_reducer["default"],
  roomTypes: _room_types_reducer["default"],
  ratePlans: _rate_plans_reducer["default"],
  rateCategories: _rate_categories_reducer["default"],
  channels: _channels_reducer["default"],
  channelsHealth: _channels_health_reducer["default"],
  channelEvents: _channel_events_reducer["default"],
  emailTemplates: _email_templates_reducer["default"],
  user: _user_reducer["default"],
  users: _users_reducer["default"],
  whiteLabelPartners: _white_label_partners_reducer["default"],
  whiteLabelDomains: _white_label_domains_reducer["default"],
  whiteLabelEmailSettings: _white_label_email_settings_reducer["default"],
  tasks: _tasks_reducer["default"],
  taxes: _taxes_reducer["default"],
  taxSets: _tax_sets_reducer["default"],
  groups: _groups_reducer["default"],
  bookings: _bookings_reducer["default"],
  hotelPolicies: _hotel_policies_reducer["default"],
  cancellationPolicies: _cancellation_policies_reducer["default"]
});
var _default = rootReducer;
exports["default"] = _default;
module.exports = exports.default;

/***/ }),

/***/ "./src/storage/reducers/properties_health_reducer.js":
/*!***********************************************************!*\
  !*** ./src/storage/reducers/properties_health_reducer.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = propertiesHealthReducer;

var _constants = __webpack_require__(/*! ../constants */ "./src/storage/constants.js");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var initialState = null;

var ACTION_HANDLERS = _defineProperty({}, _constants.PROPERTIES_HEALTH_LOAD, function (state, action) {
  var entities = action.payload.stats.reduce(function (acc, el) {
    acc[el.id] = el.attributes;
    return acc;
  }, {});
  return {
    entities: entities,
    meta: action.payload.meta
  };
});

function propertiesHealthReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments.length > 1 ? arguments[1] : undefined;
  var handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}

module.exports = exports.default;

/***/ }),

/***/ "./src/storage/reducers/properties_reducer.js":
/*!****************************************************!*\
  !*** ./src/storage/reducers/properties_reducer.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = propertiesReducer;

var _constants = __webpack_require__(/*! ../constants */ "./src/storage/constants.js");

var _relationships_extractor = _interopRequireDefault(__webpack_require__(/*! ../../utils/relationships_extractor */ "./src/utils/relationships_extractor.js"));

var _ACTION_HANDLERS;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var initialState = null;
var ACTION_HANDLERS = (_ACTION_HANDLERS = {}, _defineProperty(_ACTION_HANDLERS, _constants.PROPERTIES_LOAD, function (state, action) {
  return {
    entities: (0, _relationships_extractor["default"])(action.payload.properties),
    meta: action.payload.meta
  };
}), _defineProperty(_ACTION_HANDLERS, _constants.PROPERTIES_ADD, function (state, action) {
  var state_entities = state && state.entities ? state.entities : {};
  var entities = Object.assign({}, state_entities || {}, _defineProperty({}, action.payload.id, (0, _relationships_extractor["default"])(action.payload)));
  return Object.assign({}, state || {}, {
    entities: entities
  });
}), _defineProperty(_ACTION_HANDLERS, _constants.PROPERTIES_DROP, function (state, action) {
  if (state && state.entities) {
    delete state.entities[action.payload.id];
  }

  return Object.assign({}, state || {}, {});
}), _ACTION_HANDLERS);

function propertiesReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments.length > 1 ? arguments[1] : undefined;
  var handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}

module.exports = exports.default;

/***/ }),

/***/ "./src/storage/reducers/rate_categories_reducer.js":
/*!*********************************************************!*\
  !*** ./src/storage/reducers/rate_categories_reducer.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = rateCategoriesReducer;

var _constants = __webpack_require__(/*! ../constants */ "./src/storage/constants.js");

var _ACTION_HANDLERS;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var initialState = null;
var ACTION_HANDLERS = (_ACTION_HANDLERS = {}, _defineProperty(_ACTION_HANDLERS, _constants.RATE_CATEGORIES_LOAD, function (state, action) {
  return action.payload.reduce(function (acc, el) {
    acc[el.id] = el.attributes;

    if (el.relationships) {
      Object.keys(el.relationships).forEach(function (key) {
        acc[el.id]["".concat(key, "_id")] = el.relationships[key].data.id;
      });
    }

    return acc;
  }, {});
}), _defineProperty(_ACTION_HANDLERS, _constants.RATE_CATEGORIES_ADD, function (state, action) {
  var item = {};
  item[action.payload.id] = action.payload.attributes;

  if (action.payload.relationships) {
    Object.keys(action.payload.relationships).forEach(function (key) {
      item[action.payload.id]["".concat(key, "_id")] = action.payload.relationships[key].data.id;
    });
  }

  return Object.assign({}, state || {}, item);
}), _defineProperty(_ACTION_HANDLERS, _constants.RATE_CATEGORIES_DROP, function (state, action) {
  return Object.keys(state).filter(function (key) {
    return key !== action.payload.id && state[key].parent_rate_category_id !== action.payload.id;
  }).reduce(function (acc, key) {
    acc[key] = state[key];
    return acc;
  }, {});
}), _ACTION_HANDLERS);

function rateCategoriesReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments.length > 1 ? arguments[1] : undefined;
  var handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}

module.exports = exports.default;

/***/ }),

/***/ "./src/storage/reducers/rate_plans_reducer.js":
/*!****************************************************!*\
  !*** ./src/storage/reducers/rate_plans_reducer.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = ratePlansReducer;

var _constants = __webpack_require__(/*! ../constants */ "./src/storage/constants.js");

var _relationships_extractor = _interopRequireDefault(__webpack_require__(/*! utils/relationships_extractor */ "./src/utils/relationships_extractor.js"));

var _ACTION_HANDLERS;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var initialState = null;
var ACTION_HANDLERS = (_ACTION_HANDLERS = {}, _defineProperty(_ACTION_HANDLERS, _constants.RATE_PLANS_LOAD, function (state, action) {
  return (0, _relationships_extractor["default"])(action.payload);
}), _defineProperty(_ACTION_HANDLERS, _constants.RATE_PLANS_ADD, function (state, action) {
  var item = (0, _relationships_extractor["default"])(action.payload);
  return _objectSpread({}, state, _defineProperty({}, item.id, item));
}), _defineProperty(_ACTION_HANDLERS, _constants.RATE_PLANS_DROP, function (state, action) {
  return Object.keys(state).filter(function (key) {
    return key !== action.payload.id && state[key].parent_rate_plan_id !== action.payload.id;
  }).reduce(function (acc, key) {
    acc[key] = state[key];
    return acc;
  }, {});
}), _ACTION_HANDLERS);

function ratePlansReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments.length > 1 ? arguments[1] : undefined;
  var handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}

module.exports = exports.default;

/***/ }),

/***/ "./src/storage/reducers/room_types_reducer.js":
/*!****************************************************!*\
  !*** ./src/storage/reducers/room_types_reducer.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = roomTypesReducer;

var _constants = __webpack_require__(/*! ../constants */ "./src/storage/constants.js");

var _relationships_extractor = _interopRequireDefault(__webpack_require__(/*! ../../utils/relationships_extractor */ "./src/utils/relationships_extractor.js"));

var _ACTION_HANDLERS;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var initialState = null;
var ACTION_HANDLERS = (_ACTION_HANDLERS = {}, _defineProperty(_ACTION_HANDLERS, _constants.ROOM_TYPES_LOAD, function (state, action) {
  return {
    entities: (0, _relationships_extractor["default"])(action.payload.records),
    meta: action.payload.meta
  };
}), _defineProperty(_ACTION_HANDLERS, _constants.ROOM_TYPES_ADD, function (state, action) {
  var state_entities = state && state.entities ? state.entities : {};
  var entities = Object.assign({}, state_entities || {}, _defineProperty({}, action.payload.id, (0, _relationships_extractor["default"])(action.payload)));
  return Object.assign({}, state || {}, {
    entities: entities
  });
}), _defineProperty(_ACTION_HANDLERS, _constants.ROOM_TYPES_DROP, function (state, action) {
  if (state && state.entities) {
    delete state.entities[action.payload.id];
  }

  return Object.assign({}, state || {}, {});
}), _ACTION_HANDLERS);

function roomTypesReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments.length > 1 ? arguments[1] : undefined;
  var handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}

module.exports = exports.default;

/***/ }),

/***/ "./src/storage/reducers/session_reducer.js":
/*!*************************************************!*\
  !*** ./src/storage/reducers/session_reducer.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = sessionReducer;

var _constants = __webpack_require__(/*! ../constants */ "./src/storage/constants.js");

var _ACTION_HANDLERS;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var CACHE_KEY = 'CHANNEX_SESSION';
var cache = localStorage.getItem(CACHE_KEY);
var initialState = cache ? JSON.parse(cache) : null;
var ACTION_HANDLERS = (_ACTION_HANDLERS = {}, _defineProperty(_ACTION_HANDLERS, _constants.SESSION_ADD, function (state, action) {
  return action.payload;
}), _defineProperty(_ACTION_HANDLERS, _constants.CHOOSE_PROPERTY, function (state, action) {
  var result = null;

  switch (state) {
    case null:
      result = state;
      break;

    default:
      result = Object.assign({}, state, {
        activeProperty: action.payload
      });
      break;
  }

  return result;
}), _defineProperty(_ACTION_HANDLERS, _constants.CHOOSE_GROUP, function (state, action) {
  var result = null;

  switch (state) {
    case null:
      result = state;
      break;

    default:
      result = Object.assign({}, state, {
        activeGroup: action.payload
      });
      break;
  }

  return result;
}), _ACTION_HANDLERS);

function sessionReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments.length > 1 ? arguments[1] : undefined;
  var handler = ACTION_HANDLERS[action.type];
  var updated_state = handler ? handler(state, action) : state;
  localStorage.setItem(CACHE_KEY, JSON.stringify(updated_state));
  return updated_state;
}

module.exports = exports.default;

/***/ }),

/***/ "./src/storage/reducers/tasks_reducer.js":
/*!***********************************************!*\
  !*** ./src/storage/reducers/tasks_reducer.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = tasksReducer;

var _constants = __webpack_require__(/*! ../constants */ "./src/storage/constants.js");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var initialState = {
  entities: null,
  meta: null
};

var ACTION_HANDLERS = _defineProperty({}, _constants.TASKS_LOAD, function (state, action) {
  var entities = action.payload.tasks.reduce(function (acc, el) {
    acc[el.id] = el.attributes;

    if (el.relationships) {
      Object.keys(el.relationships).forEach(function (key) {
        acc[el.id]["".concat(key, "_id")] = el.relationships[key].data.id;
      });
    }

    return acc;
  }, {});
  return {
    entities: entities,
    meta: action.payload.meta
  };
});

function tasksReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments.length > 1 ? arguments[1] : undefined;
  var handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}

module.exports = exports.default;

/***/ }),

/***/ "./src/storage/reducers/tax_sets_reducer.js":
/*!**************************************************!*\
  !*** ./src/storage/reducers/tax_sets_reducer.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = taxSetsReducer;

var _constants = __webpack_require__(/*! ../constants */ "./src/storage/constants.js");

var _ACTION_HANDLERS;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var initialState = null;
var ACTION_HANDLERS = (_ACTION_HANDLERS = {}, _defineProperty(_ACTION_HANDLERS, _constants.TAX_SETS_LOAD, function (state, action) {
  var entities = action.payload.records.reduce(function (acc, _ref) {
    var id = _ref.id,
        attributes = _ref.attributes;
    acc[id] = attributes;
    return acc;
  }, {});
  return {
    entities: entities,
    meta: action.payload.meta
  };
}), _defineProperty(_ACTION_HANDLERS, _constants.TAX_SETS_ADD, function (state, action) {
  var state_entities = state && state.entities ? state.entities : {};
  var _action$payload = action.payload,
      id = _action$payload.id,
      attributes = _action$payload.attributes;
  var entities = Object.assign({}, state_entities, _defineProperty({}, id, attributes));
  return Object.assign({}, state, {
    entities: entities
  });
}), _defineProperty(_ACTION_HANDLERS, _constants.TAX_SETS_DROP, function (state, action) {
  if (state && state.entities) {
    delete state.entities[action.payload.id];
  }

  return Object.assign({}, state || {}, {});
}), _ACTION_HANDLERS);

function taxSetsReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments.length > 1 ? arguments[1] : undefined;
  var handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}

module.exports = exports.default;

/***/ }),

/***/ "./src/storage/reducers/taxes_reducer.js":
/*!***********************************************!*\
  !*** ./src/storage/reducers/taxes_reducer.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = taxesReducer;

var _constants = __webpack_require__(/*! ../constants */ "./src/storage/constants.js");

var _ACTION_HANDLERS;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var initialState = null;
var ACTION_HANDLERS = (_ACTION_HANDLERS = {}, _defineProperty(_ACTION_HANDLERS, _constants.TAXES_LOAD, function (state, action) {
  var entities = action.payload.records.reduce(function (acc, _ref) {
    var id = _ref.id,
        attributes = _ref.attributes;
    acc[id] = attributes;
    return acc;
  }, {});
  return {
    entities: entities,
    meta: action.payload.meta
  };
}), _defineProperty(_ACTION_HANDLERS, _constants.TAXES_ADD, function (state, action) {
  var state_entities = state && state.entities ? state.entities : {};
  var _action$payload = action.payload,
      id = _action$payload.id,
      attributes = _action$payload.attributes;
  var entities = Object.assign({}, state_entities, _defineProperty({}, id, attributes));
  return Object.assign({}, state, {
    entities: entities
  });
}), _defineProperty(_ACTION_HANDLERS, _constants.TAXES_DROP, function (state, action) {
  if (state && state.entities) {
    delete state.entities[action.payload.id];
  }

  return Object.assign({}, state || {}, {});
}), _ACTION_HANDLERS);

function taxesReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments.length > 1 ? arguments[1] : undefined;
  var handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}

module.exports = exports.default;

/***/ }),

/***/ "./src/storage/reducers/user_reducer.js":
/*!**********************************************!*\
  !*** ./src/storage/reducers/user_reducer.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = usersReducer;

var _constants = __webpack_require__(/*! ../constants */ "./src/storage/constants.js");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var CACHE_KEY = 'CHANNEX_USER';
var cache = localStorage.getItem(CACHE_KEY);
var initialState = cache ? JSON.parse(cache) : null;

var ACTION_HANDLERS = _defineProperty({}, _constants.USER_ADD, function (state, action) {
  return action.payload;
});

function usersReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments.length > 1 ? arguments[1] : undefined;
  var handler = ACTION_HANDLERS[action.type];
  var updated_state = handler ? handler(state, action) : state;
  localStorage.setItem(CACHE_KEY, JSON.stringify(updated_state));
  return updated_state;
}

module.exports = exports.default;

/***/ }),

/***/ "./src/storage/reducers/users_reducer.js":
/*!***********************************************!*\
  !*** ./src/storage/reducers/users_reducer.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = usersReducer;

var _constants = __webpack_require__(/*! ../constants */ "./src/storage/constants.js");

var _ACTION_HANDLERS;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var initialState = null;
var ACTION_HANDLERS = (_ACTION_HANDLERS = {}, _defineProperty(_ACTION_HANDLERS, _constants.USERS_LOAD, function (state, action) {
  return action.payload.reduce(function (acc, el) {
    acc[el.id] = el.attributes;

    if (el.relationships) {
      Object.keys(el.relationships).forEach(function (key) {
        acc[el.id]["".concat(key, "_id")] = el.relationships[key].data.id;
      });
    }

    return acc;
  }, {});
}), _defineProperty(_ACTION_HANDLERS, _constants.USERS_ADD, function (state, action) {
  var item = {};
  item[action.payload.id] = action.payload.attributes;
  return Object.assign({}, state || {}, item);
}), _defineProperty(_ACTION_HANDLERS, _constants.USERS_DROP, function (state, action) {
  delete state[action.payload.id];
  return Object.assign({}, state || {}, {});
}), _ACTION_HANDLERS);

function usersReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments.length > 1 ? arguments[1] : undefined;
  var handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}

module.exports = exports.default;

/***/ }),

/***/ "./src/storage/reducers/white_label_domains_reducer.js":
/*!*************************************************************!*\
  !*** ./src/storage/reducers/white_label_domains_reducer.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = whiteLabelDomainsReducer;

var _constants = __webpack_require__(/*! ../constants */ "./src/storage/constants.js");

var _ACTION_HANDLERS;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var initialState = null;
var ACTION_HANDLERS = (_ACTION_HANDLERS = {}, _defineProperty(_ACTION_HANDLERS, _constants.WHITE_LABEL_DOMAINS_LOAD, function (state, action) {
  return action.payload.reduce(function (acc, el) {
    acc[el.id] = el.attributes;

    if (el.relationships) {
      Object.keys(el.relationships).forEach(function (key) {
        acc[el.id]["".concat(key, "_id")] = el.relationships[key].data.id;
      });
    }

    return acc;
  }, {});
}), _defineProperty(_ACTION_HANDLERS, _constants.WHITE_LABEL_DOMAINS_ADD, function (state, action) {
  var item = {};
  item[action.payload.id] = action.payload.attributes;

  if (action.payload.relationships) {
    Object.keys(action.payload.relationships).forEach(function (key) {
      item[action.payload.id]["".concat(key, "_id")] = action.payload.relationships[key].data.id;
    });
  }

  return Object.assign({}, state || {}, item);
}), _defineProperty(_ACTION_HANDLERS, _constants.WHITE_LABEL_DOMAINS_DROP, function (state, action) {
  delete state[action.payload.id];
  return Object.assign({}, state || {}, {});
}), _ACTION_HANDLERS);

function whiteLabelDomainsReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments.length > 1 ? arguments[1] : undefined;
  var handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}

module.exports = exports.default;

/***/ }),

/***/ "./src/storage/reducers/white_label_email_settings_reducer.js":
/*!********************************************************************!*\
  !*** ./src/storage/reducers/white_label_email_settings_reducer.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = whiteLabelEmailSettingsReducer;

var _constants = __webpack_require__(/*! ../constants */ "./src/storage/constants.js");

var _ACTION_HANDLERS;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var initialState = null;
var ACTION_HANDLERS = (_ACTION_HANDLERS = {}, _defineProperty(_ACTION_HANDLERS, _constants.WHITE_LABEL_EMAIL_SETTINGS_LOAD, function (state, action) {
  return action.payload.reduce(function (acc, el) {
    acc[el.id] = el.attributes;

    if (el.relationships) {
      Object.keys(el.relationships).forEach(function (key) {
        acc[el.id]["".concat(key, "_id")] = el.relationships[key].data.id;
      });
    }

    return acc;
  }, {});
}), _defineProperty(_ACTION_HANDLERS, _constants.WHITE_LABEL_EMAIL_SETTINGS_ADD, function (state, action) {
  var item = {};
  item[action.payload.id] = action.payload.attributes;

  if (action.payload.relationships) {
    Object.keys(action.payload.relationships).forEach(function (key) {
      item[action.payload.id]["".concat(key, "_id")] = action.payload.relationships[key].data.id;
    });
  }

  return Object.assign({}, state || {}, item);
}), _defineProperty(_ACTION_HANDLERS, _constants.WHITE_LABEL_EMAIL_SETTINGS_DROP, function (state, action) {
  delete state[action.payload.id];
  return Object.assign({}, state || {}, {});
}), _ACTION_HANDLERS);

function whiteLabelEmailSettingsReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments.length > 1 ? arguments[1] : undefined;
  var handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}

module.exports = exports.default;

/***/ }),

/***/ "./src/storage/reducers/white_label_partners_reducer.js":
/*!**************************************************************!*\
  !*** ./src/storage/reducers/white_label_partners_reducer.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = whiteLabelPartnersReducer;

var _constants = __webpack_require__(/*! ../constants */ "./src/storage/constants.js");

var _ACTION_HANDLERS;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var initialState = null;
var ACTION_HANDLERS = (_ACTION_HANDLERS = {}, _defineProperty(_ACTION_HANDLERS, _constants.WHITE_LABEL_PARTNERS_LOAD, function (state, action) {
  return action.payload.reduce(function (acc, el) {
    acc[el.id] = el.attributes;

    if (el.relationships) {
      Object.keys(el.relationships).forEach(function (key) {
        acc[el.id]["".concat(key, "_id")] = el.relationships[key].data.id;
      });
    }

    return acc;
  }, {});
}), _defineProperty(_ACTION_HANDLERS, _constants.WHITE_LABEL_PARTNERS_ADD, function (state, action) {
  var item = {};
  item[action.payload.id] = action.payload.attributes;

  if (action.payload.relationships) {
    Object.keys(action.payload.relationships).forEach(function (key) {
      item[action.payload.id]["".concat(key, "_id")] = action.payload.relationships[key].data.id;
    });
  }

  return Object.assign({}, state || {}, item);
}), _defineProperty(_ACTION_HANDLERS, _constants.WHITE_LABEL_PARTNERS_DROP, function (state, action) {
  delete state[action.payload.id];
  return Object.assign({}, state || {}, {});
}), _ACTION_HANDLERS);

function whiteLabelPartnersReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments.length > 1 ? arguments[1] : undefined;
  var handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}

module.exports = exports.default;

/***/ }),

/***/ "./src/transport/http.js":
/*!*******************************!*\
  !*** ./src/transport/http.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _stringify_arguments = _interopRequireDefault(__webpack_require__(/*! ../utils/stringify_arguments */ "./src/utils/stringify_arguments.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var HTTPTransport =
/*#__PURE__*/
function () {
  function HTTPTransport(settings) {
    var token = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

    _classCallCheck(this, HTTPTransport);

    this.settings = settings;
    this.token = token || null;
  }

  _createClass(HTTPTransport, [{
    key: "send",
    value: function send(method, endpoint, data) {
      return this["_".concat(method.toLowerCase())].apply(this, [endpoint, data]).then(function (response) {
        return response.json();
      }).then(this._prepareAnswer);
    }
  }, {
    key: "registerAccessToken",
    value: function registerAccessToken(token) {
      this.token = token;
    }
  }, {
    key: "_post",
    value: function _post(endpoint, data) {
      return fetch(this._url(endpoint), {
        method: 'POST',
        headers: this._headers(),
        body: JSON.stringify(data)
      });
    }
  }, {
    key: "_put",
    value: function _put(endpoint, data) {
      return fetch(this._url(endpoint), {
        method: 'PUT',
        headers: this._headers(),
        body: JSON.stringify(data)
      });
    }
  }, {
    key: "_get",
    value: function _get(endpoint, filters) {
      return fetch(this._url(endpoint, filters), {
        method: 'GET',
        headers: this._headers()
      });
    }
  }, {
    key: "_delete",
    value: function _delete(endpoint, filters) {
      return fetch(this._url(endpoint, filters), {
        method: 'DELETE',
        headers: this._headers()
      });
    }
  }, {
    key: "_headers",
    value: function _headers() {
      var headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      };

      if (this.token) {
        headers['Authorization'] = "Bearer ".concat(this.token);
      }

      return headers;
    }
  }, {
    key: "_url",
    value: function _url(endpoint) {
      var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var protocol = this.settings.secure ? 'https' : 'http';
      return "".concat(protocol, "://").concat(this.settings.server, "/api/v1/").concat(endpoint).concat((0, _stringify_arguments["default"])(params));
    }
  }, {
    key: "_prepareAnswer",
    value: function _prepareAnswer(response) {
      var answer;

      if (response.data || response.meta) {
        answer = Promise.resolve(response);
      } else {
        answer = Promise.reject(response);
      }

      return answer;
    }
  }]);

  return HTTPTransport;
}();

exports["default"] = HTTPTransport;
module.exports = exports.default;

/***/ }),

/***/ "./src/transport/index.js":
/*!********************************!*\
  !*** ./src/transport/index.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _http = _interopRequireDefault(__webpack_require__(/*! ./http */ "./src/transport/http.js"));

var _ws = _interopRequireDefault(__webpack_require__(/*! ./ws */ "./src/transport/ws.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = {
  HTTPTransport: _http["default"],
  WSTransport: _ws["default"]
};
exports["default"] = _default;
module.exports = exports.default;

/***/ }),

/***/ "./src/transport/ws.js":
/*!*****************************!*\
  !*** ./src/transport/ws.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _phoenixChannels = __webpack_require__(/*! phoenix-channels */ "./node_modules/phoenix-channels/src/index.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var CONNECTION_ERROR_MSG = 'there was an error with the connection!';
var CONNECTION_CLOSE_MSG = 'the connection dropped';
var API_CHANNEL = 'api';
var JWT_FIELD = '__jwt';
var JOIN_SUCCESS_MSG = 'Joined successfully';
var JOIN_ERROR_MSG = 'Unable to join';
var TIMEOUT_ERROR_MSG = 'Timeout Error';
var EVENTS = ['property:state_changed', 'channel:health_changed', 'channel_rate_plan:settings_changed'];
var subscriptions = {};

function createSocket(context) {
  var socket = new _phoenixChannels.Socket("".concat(context.settings.secure ? 'wss' : 'ws', "://").concat(context.settings.server, "/socket"));
  socket.onError(function () {
    return console.log(CONNECTION_ERROR_MSG);
  });
  socket.onClose(function () {
    return console.log(CONNECTION_CLOSE_MSG);
  });
  socket.connect();
  context.socket = socket;
}

function connectAPIChannel(context) {
  var apiChannel = context.socket.channel(API_CHANNEL, {});
  apiChannel.join().receive('ok', function (resp) {
    console.log(JOIN_SUCCESS_MSG, resp);
  }).receive('error', function (resp) {
    console.log(JOIN_ERROR_MSG, resp);
  }).receive('timeout', function (resp) {
    console.log(TIMEOUT_ERROR_MSG);
  });
  context.apiChannel = apiChannel;
}

function publishEvent(event, payload) {
  if (!subscriptions[event]) {
    return;
  }

  subscriptions[event].forEach(function (item) {
    item(payload !== undefined ? payload : {});
  });
}

function receiveEvent(event) {
  return function (payload) {
    publishEvent(event, payload);
  };
}

function subscribeToEvents(context) {
  EVENTS.forEach(function (event) {
    context.apiChannel.on(event, receiveEvent(event));
  });
}

var WSTransport =
/*#__PURE__*/
function () {
  function WSTransport(settings) {
    var token = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

    _classCallCheck(this, WSTransport);

    this.settings = settings;
    this.token = token || null;
    createSocket(this);
    connectAPIChannel(this);
    subscribeToEvents(this);
  }

  _createClass(WSTransport, [{
    key: "send",
    value: function send(method, endpoint, payload) {
      var _this = this;

      if (this.token) {
        payload[JWT_FIELD] = this.token;
      }

      return new Promise(function (resolve, reject) {
        _this.apiChannel.push("".concat(method, ":").concat(endpoint), payload).receive('ok', function (resp) {
          return resolve(resp);
        }).receive('error', function (resp) {
          return reject(resp);
        }).receive('timeout', function () {
          return reject(Error(TIMEOUT_ERROR_MSG));
        });
      });
    }
  }, {
    key: "registerAccessToken",
    value: function registerAccessToken(token) {
      this.token = token;
    }
  }, {
    key: "disconnect",
    value: function disconnect() {
      this.socket.disconnect();
    }
  }, {
    key: "subscribe",
    value: function subscribe(event, callback) {
      if (!subscriptions[event]) {
        subscriptions[event] = [];
      }

      var index = subscriptions[event].push(callback) - 1;
      return {
        remove: function remove() {
          delete subscriptions[event][index];
        }
      };
    }
  }, {
    key: "publish",
    value: function publish(event, payload) {
      return publishEvent(event, payload);
    }
  }]);

  return WSTransport;
}();

exports["default"] = WSTransport;
module.exports = exports.default;

/***/ }),

/***/ "./src/utils/attributes_extractor.js":
/*!*******************************************!*\
  !*** ./src/utils/attributes_extractor.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

function _default() {
  var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  return data.map(function (_ref) {
    var attributes = _ref.attributes;
    return attributes;
  });
}

module.exports = exports.default;

/***/ }),

/***/ "./src/utils/handle_error.js":
/*!***********************************!*\
  !*** ./src/utils/handle_error.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _default = function _default(error, storage, transport) {
  if (error && error.errors && error.errors.code === 'unauthorized') {
    transport.registerAccessToken(null);
    storage.sessionAdd({});
    storage.userAdd({});
  }

  throw error;
};

exports["default"] = _default;
module.exports = exports.default;

/***/ }),

/***/ "./src/utils/relationships_extractor.js":
/*!**********************************************!*\
  !*** ./src/utils/relationships_extractor.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function extractRelationshipsFromEntity(model) {
  Object.keys(model.relationships || {}).forEach(function (key) {
    if (Array.isArray(model.relationships[key].data)) {
      model.attributes[key] = model.relationships[key].data.map(function (el) {
        return el.attributes;
      }).reduce(function (acc, el) {
        acc[el.id] = el;
        return acc;
      }, {});
    } else {
      model.attributes["".concat(key, "_id")] = model.relationships[key].data.id;
      model.attributes[key] = model.relationships[key].data;
    }
  });
  return model.attributes;
}

function extractRelationships(models) {
  var result;

  if (Array.isArray(models)) {
    result = models.reduce(function (acc, el) {
      acc[el.id] = extractRelationshipsFromEntity(el);
      return acc;
    }, {});
  } else {
    result = extractRelationshipsFromEntity(models);
  }

  return result;
}

var _default = extractRelationships;
exports["default"] = _default;
module.exports = exports.default;

/***/ }),

/***/ "./src/utils/stringify_arguments.js":
/*!******************************************!*\
  !*** ./src/utils/stringify_arguments.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var prepareArgument, parseArgs, prepareKey;

prepareKey = function prepareKey(key, prefix) {
  var output;

  if (prefix === null) {
    output = key;
  } else {
    output = "".concat(prefix, "[").concat(key, "]");
  }

  return output;
};

prepareArgument = function prepareArgument(args, key, prefix) {
  var output;

  switch (_typeof(args[key])) {
    case 'object':
      if (typeof args[key].length === 'undefined') {
        output = parseArgs(args[key], prepareKey(key, prefix));
      } else {
        output = "".concat(prepareKey(key, prefix), "=").concat(args[key].map(encodeURIComponent).join(','));
      }

      break;

    default:
      output = "".concat(prepareKey(key, prefix), "=").concat(encodeURIComponent(args[key]));
      break;
  }

  return output;
};

parseArgs = function parseArgs(args) {
  var prefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  return Object.keys(args).reduce(function (acc, key) {
    acc.push(prepareArgument(args, key, prefix));
    return acc;
  }, []).join('&');
};

function stringifyArguments(args) {
  var query;

  if (args && _typeof(args) === 'object' && typeof args.length === 'undefined') {
    var parsedArgs = parseArgs(args);
    query = parsedArgs.length > 1 ? "?".concat(parseArgs(args)) : '';
  } else {
    query = '';
  }

  return query;
}

;
var _default = stringifyArguments;
exports["default"] = _default;
module.exports = exports.default;

/***/ })

/******/ });
});
//# sourceMappingURL=channex-bl.js.map