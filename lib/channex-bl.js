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
  "development" !== 'production' && typeof window !== 'undefined' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ :
    function() {
      if (arguments.length === 0) return undefined;
      if (typeof arguments[0] === 'object') return compose;
      return compose.apply(null, arguments);
    }
);

exports.devToolsEnhancer = (
  "development" !== 'production' && typeof window !== 'undefined' &&
  window.__REDUX_DEVTOOLS_EXTENSION__ ?
    window.__REDUX_DEVTOOLS_EXTENSION__ :
    function() { return function(noop) { return noop; } }
);


/***/ }),

/***/ "./node_modules/redux/es/redux.js":
/*!****************************************!*\
  !*** ./node_modules/redux/es/redux.js ***!
  \****************************************/
/*! exports provided: createStore, combineReducers, bindActionCreators, applyMiddleware, compose, __DO_NOT_USE__ActionTypes */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createStore", function() { return createStore; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "combineReducers", function() { return combineReducers; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "bindActionCreators", function() { return bindActionCreators; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "applyMiddleware", function() { return applyMiddleware; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "compose", function() { return compose; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__DO_NOT_USE__ActionTypes", function() { return ActionTypes; });
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
    throw new Error('It looks like you are passing several store enhancers to ' + 'createStore(). This is not supported. Instead, compose them ' + 'together to a single function');
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
      throw new Error('You may not call store.subscribe() while the reducer is executing. ' + 'If you would like to be notified after the store has been updated, subscribe from a ' + 'component and invoke store.getState() in the callback to access the latest state. ' + 'See https://redux.js.org/api-reference/store#subscribe(listener) for more details.');
    }

    var isSubscribed = true;
    ensureCanMutateNextListeners();
    nextListeners.push(listener);
    return function unsubscribe() {
      if (!isSubscribed) {
        return;
      }

      if (isDispatching) {
        throw new Error('You may not unsubscribe from a store listener while the reducer is executing. ' + 'See https://redux.js.org/api-reference/store#subscribe(listener) for more details.');
      }

      isSubscribed = false;
      ensureCanMutateNextListeners();
      var index = nextListeners.indexOf(listener);
      nextListeners.splice(index, 1);
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

    currentReducer = nextReducer;
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

  var finalReducerKeys = Object.keys(finalReducers);
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
 * For convenience, you can also pass a single function as the first argument,
 * and get a function in return.
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

  var keys = Object.keys(actionCreators);
  var boundActionCreators = {};

  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
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

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    var ownKeys = Object.keys(source);

    if (typeof Object.getOwnPropertySymbols === 'function') {
      ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
        return Object.getOwnPropertyDescriptor(source, sym).enumerable;
      }));
    }

    ownKeys.forEach(function (key) {
      _defineProperty(target, key, source[key]);
    });
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
        throw new Error("Dispatching while constructing your middleware is not allowed. " + "Other middleware would not be applied to this dispatch.");
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
      return _objectSpread({}, store, {
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

if ("development" !== 'production' && typeof isCrushed.name === 'string' && isCrushed.name !== 'isCrushed') {
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
	g = g || Function("return this")() || (1, eval)("this");
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

var _global = (function() { return this; })();
var NativeWebSocket = _global.WebSocket || _global.MozWebSocket;
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

module.exports = {"name":"websocket","description":"Websocket Client & Server Library implementing the WebSocket protocol as specified in RFC 6455.","keywords":["websocket","websockets","socket","networking","comet","push","RFC-6455","realtime","server","client"],"author":"Brian McKelvey <theturtle32@gmail.com> (https://github.com/theturtle32)","contributors":["Iñaki Baz Castillo <ibc@aliax.net> (http://dev.sipdoc.net)"],"version":"1.0.28","repository":{"type":"git","url":"https://github.com/theturtle32/WebSocket-Node.git"},"homepage":"https://github.com/theturtle32/WebSocket-Node","engines":{"node":">=0.10.0"},"dependencies":{"debug":"^2.2.0","nan":"^2.11.0","typedarray-to-buffer":"^3.1.5","yaeti":"^0.0.6"},"devDependencies":{"buffer-equal":"^1.0.0","faucet":"^0.0.1","gulp":"git+https://github.com/gulpjs/gulp.git#4.0","gulp-jshint":"^2.0.4","jshint-stylish":"^2.2.1","jshint":"^2.0.0","tape":"^4.9.1"},"config":{"verbose":false},"scripts":{"install":"(node-gyp rebuild 2> builderror.log) || (exit 0)","test":"faucet test/unit","gulp":"gulp"},"main":"index","directories":{"lib":"./lib"},"browser":"lib/browser.js","license":"Apache-2.0"};

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

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var transport = void 0;

var ARI = function () {
  function ARI(container) {
    _classCallCheck(this, ARI);

    transport = container.transport;
  }

  _createClass(ARI, [{
    key: 'get',
    value: function get(filters) {
      return transport.send('GET', 'restrictions', { filter: filters }).then(function (response) {
        return response;
      });
    }
  }]);

  return ARI;
}();

exports.default = ARI;
module.exports = exports['default'];

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

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var transport = void 0;
var storage = void 0;

var Auth = function () {
  function Auth(container) {
    _classCallCheck(this, Auth);

    transport = container.transport;
    storage = container.storage;
  }

  _createClass(Auth, [{
    key: 'signIn',
    value: function signIn(attrs) {
      return transport.send('POST', 'sign_in', { user: attrs }).then(function (response) {
        if (response.data.attributes.token) {
          transport.registerAccessToken(response.data.attributes.token);
          storage.sessionAdd(response.data.attributes);
        }

        return response;
      });
    }
  }, {
    key: 'signUp',
    value: function signUp(attrs) {
      return transport.send('POST', 'sign_up', { user: attrs }).then(function (response) {
        if (response.data.attributes.token) {
          transport.registerAccessToken(response.data.attributes.token);
          storage.sessionAdd(response.data.attributes);
        }

        return response;
      });
    }
  }, {
    key: 'whiteLabelSignUp',
    value: function whiteLabelSignUp(attrs) {
      return transport.send('POST', 'wl_sign_up', { user: attrs }).then(function (response) {
        if (response.data.attributes.token) {
          transport.registerAccessToken(response.data.attributes.token);
          storage.sessionAdd(response.data.attributes);
        }

        return response;
      });
    }
  }, {
    key: 'requestRestorePassword',
    value: function requestRestorePassword(email) {
      return transport.send('POST', 'request_restore_password', { user: { email: email } }).then(function (response) {
        return response;
      });
    }
  }, {
    key: 'restorePassword',
    value: function restorePassword(attrs) {
      return transport.send('POST', 'restore_password', { user: attrs }).then(function (response) {
        return response;
      });
    }
  }, {
    key: 'confirmRegistration',
    value: function confirmRegistration(token) {
      return transport.send('GET', 'confirm_registration?token=' + token).then(function (response) {
        return response;
      });
    }
  }, {
    key: 'chooseHotel',
    value: function chooseHotel(hotel) {
      storage.chooseHotel(hotel);
    }
  }]);

  return Auth;
}();

exports.default = Auth;
module.exports = exports['default'];

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

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var transport = void 0;
var storage = void 0;
var ENDPOINT = 'channels';

var Channels = function () {
  function Channels(container) {
    _classCallCheck(this, Channels);

    transport = container.transport;
    storage = container.storage;
  }

  _createClass(Channels, [{
    key: 'list',
    value: function list() {
      var filters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      return transport.send('GET', ENDPOINT, { filter: filters }).then(function (response) {
        storage.channelsLoad(response.data);
        return response.data;
      });
    }
  }, {
    key: 'find',
    value: function find(id) {
      return transport.send('GET', ENDPOINT + '/' + id).then(function (response) {
        storage.channelsAdd(response.data);
        return response;
      });
    }
  }, {
    key: 'create',
    value: function create(attrs) {
      return transport.send('POST', ENDPOINT, { channel: attrs }).then(function (response) {
        storage.channelsAdd(response.data);
        return response;
      });
    }
  }, {
    key: 'update',
    value: function update(attrs) {
      return transport.send('PUT', ENDPOINT + '/' + attrs.id, { channel: attrs }).then(function (response) {
        storage.channelsAdd(response.data);
        return response;
      });
    }
  }, {
    key: 'remove',
    value: function remove(attrs) {
      return transport.send('DELETE', ENDPOINT + '/' + attrs.id).then(function (response) {
        storage.channelsDrop(attrs);
        return response;
      });
    }
  }]);

  return Channels;
}();

exports.default = Channels;
module.exports = exports['default'];

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

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var transport = void 0;
var ENDPOINT = 'custom_availability_offset';

var CustomAvailabilityOffsets = function () {
  function CustomAvailabilityOffsets(container) {
    _classCallCheck(this, CustomAvailabilityOffsets);

    transport = container.transport;
  }

  _createClass(CustomAvailabilityOffsets, [{
    key: 'list',
    value: function list() {
      var filters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      return transport.send('GET', ENDPOINT, { filter: filters }).then(function (response) {
        return response;
      });
    }
  }, {
    key: 'create',
    value: function create(attrs) {
      return transport.send('POST', ENDPOINT, { value: attrs }).then(function (response) {
        return response;
      });
    }
  }, {
    key: 'remove',
    value: function remove() {
      var filters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      return transport.send('DELETE', ENDPOINT, { filter: filters }).then(function (response) {
        return response;
      });
    }
  }]);

  return CustomAvailabilityOffsets;
}();

exports.default = CustomAvailabilityOffsets;
module.exports = exports['default'];

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

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var transport = void 0;
var ENDPOINT = 'custom_closed_to_arrival';

var CustomClosedToArrivals = function () {
  function CustomClosedToArrivals(container) {
    _classCallCheck(this, CustomClosedToArrivals);

    transport = container.transport;
  }

  _createClass(CustomClosedToArrivals, [{
    key: 'list',
    value: function list() {
      var filters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      return transport.send('GET', ENDPOINT, { filter: filters }).then(function (response) {
        return response;
      });
    }
  }, {
    key: 'create',
    value: function create(attrs) {
      return transport.send('POST', ENDPOINT, { value: attrs }).then(function (response) {
        return response;
      });
    }
  }, {
    key: 'remove',
    value: function remove() {
      var filters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      return transport.send('DELETE', ENDPOINT, { filter: filters }).then(function (response) {
        return response;
      });
    }
  }]);

  return CustomClosedToArrivals;
}();

exports.default = CustomClosedToArrivals;
module.exports = exports['default'];

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

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var transport = void 0;
var ENDPOINT = 'custom_closed_to_departure';

var CustomClosedToDepartures = function () {
  function CustomClosedToDepartures(container) {
    _classCallCheck(this, CustomClosedToDepartures);

    transport = container.transport;
  }

  _createClass(CustomClosedToDepartures, [{
    key: 'list',
    value: function list() {
      var filters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      return transport.send('GET', ENDPOINT, { filter: filters }).then(function (response) {
        return response;
      });
    }
  }, {
    key: 'create',
    value: function create(attrs) {
      return transport.send('POST', ENDPOINT, { value: attrs }).then(function (response) {
        return response;
      });
    }
  }, {
    key: 'remove',
    value: function remove() {
      var filters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      return transport.send('DELETE', ENDPOINT, { filter: filters }).then(function (response) {
        return response;
      });
    }
  }]);

  return CustomClosedToDepartures;
}();

exports.default = CustomClosedToDepartures;
module.exports = exports['default'];

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

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var transport = void 0;
var ENDPOINT = 'custom_derived_option';

var CustomDerivedOptions = function () {
  function CustomDerivedOptions(container) {
    _classCallCheck(this, CustomDerivedOptions);

    transport = container.transport;
  }

  _createClass(CustomDerivedOptions, [{
    key: 'list',
    value: function list() {
      var filters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      return transport.send('GET', ENDPOINT, { filter: filters }).then(function (response) {
        return response;
      });
    }
  }, {
    key: 'create',
    value: function create(attrs) {
      return transport.send('POST', ENDPOINT, { value: attrs }).then(function (response) {
        return response;
      });
    }
  }, {
    key: 'remove',
    value: function remove() {
      var filters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      return transport.send('DELETE', ENDPOINT, { filter: filters }).then(function (response) {
        return response;
      });
    }
  }]);

  return CustomDerivedOptions;
}();

exports.default = CustomDerivedOptions;
module.exports = exports['default'];

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

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var transport = void 0;
var ENDPOINT = 'custom_max_availability';

var CustomMaxAvailabilities = function () {
  function CustomMaxAvailabilities(container) {
    _classCallCheck(this, CustomMaxAvailabilities);

    transport = container.transport;
  }

  _createClass(CustomMaxAvailabilities, [{
    key: 'list',
    value: function list() {
      var filters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      return transport.send('GET', ENDPOINT, { filter: filters }).then(function (response) {
        return response;
      });
    }
  }, {
    key: 'create',
    value: function create(attrs) {
      return transport.send('POST', ENDPOINT, { value: attrs }).then(function (response) {
        return response;
      });
    }
  }, {
    key: 'remove',
    value: function remove() {
      var filters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      return transport.send('DELETE', ENDPOINT, { filter: filters }).then(function (response) {
        return response;
      });
    }
  }]);

  return CustomMaxAvailabilities;
}();

exports.default = CustomMaxAvailabilities;
module.exports = exports['default'];

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

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var transport = void 0;
var ENDPOINT = 'custom_max_sell';

var CustomMaxSells = function () {
  function CustomMaxSells(container) {
    _classCallCheck(this, CustomMaxSells);

    transport = container.transport;
  }

  _createClass(CustomMaxSells, [{
    key: 'list',
    value: function list() {
      var filters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      return transport.send('GET', ENDPOINT, { filter: filters }).then(function (response) {
        return response;
      });
    }
  }, {
    key: 'create',
    value: function create(attrs) {
      return transport.send('POST', ENDPOINT, { value: attrs }).then(function (response) {
        return response;
      });
    }
  }, {
    key: 'remove',
    value: function remove() {
      var filters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      return transport.send('DELETE', ENDPOINT, { filter: filters }).then(function (response) {
        return response;
      });
    }
  }]);

  return CustomMaxSells;
}();

exports.default = CustomMaxSells;
module.exports = exports['default'];

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

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var transport = void 0;
var ENDPOINT = 'custom_max_stay';

var CustomMaxStays = function () {
  function CustomMaxStays(container) {
    _classCallCheck(this, CustomMaxStays);

    transport = container.transport;
  }

  _createClass(CustomMaxStays, [{
    key: 'list',
    value: function list() {
      var filters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      return transport.send('GET', ENDPOINT, { filter: filters }).then(function (response) {
        return response;
      });
    }
  }, {
    key: 'create',
    value: function create(attrs) {
      return transport.send('POST', ENDPOINT, { value: attrs }).then(function (response) {
        return response;
      });
    }
  }, {
    key: 'remove',
    value: function remove() {
      var filters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      return transport.send('DELETE', ENDPOINT, { filter: filters }).then(function (response) {
        return response;
      });
    }
  }]);

  return CustomMaxStays;
}();

exports.default = CustomMaxStays;
module.exports = exports['default'];

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

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var transport = void 0;
var ENDPOINT = 'custom_min_stay_arrival';

var CustomMinStayArrivals = function () {
  function CustomMinStayArrivals(container) {
    _classCallCheck(this, CustomMinStayArrivals);

    transport = container.transport;
  }

  _createClass(CustomMinStayArrivals, [{
    key: 'list',
    value: function list() {
      var filters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      return transport.send('GET', ENDPOINT, { filter: filters }).then(function (response) {
        return response;
      });
    }
  }, {
    key: 'create',
    value: function create(attrs) {
      return transport.send('POST', ENDPOINT, { value: attrs }).then(function (response) {
        return response;
      });
    }
  }, {
    key: 'remove',
    value: function remove() {
      var filters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      return transport.send('DELETE', ENDPOINT, { filter: filters }).then(function (response) {
        return response;
      });
    }
  }]);

  return CustomMinStayArrivals;
}();

exports.default = CustomMinStayArrivals;
module.exports = exports['default'];

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

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var transport = void 0;
var ENDPOINT = 'custom_min_stay_through';

var CustomMinStayThroughs = function () {
  function CustomMinStayThroughs(container) {
    _classCallCheck(this, CustomMinStayThroughs);

    transport = container.transport;
  }

  _createClass(CustomMinStayThroughs, [{
    key: 'list',
    value: function list() {
      var filters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      return transport.send('GET', ENDPOINT, { filter: filters }).then(function (response) {
        return response;
      });
    }
  }, {
    key: 'create',
    value: function create(attrs) {
      return transport.send('POST', ENDPOINT, { value: attrs }).then(function (response) {
        return response;
      });
    }
  }, {
    key: 'remove',
    value: function remove() {
      var filters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      return transport.send('DELETE', ENDPOINT, { filter: filters }).then(function (response) {
        return response;
      });
    }
  }]);

  return CustomMinStayThroughs;
}();

exports.default = CustomMinStayThroughs;
module.exports = exports['default'];

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

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var transport = void 0;
var ENDPOINT = 'custom_rate';

var CustomRates = function () {
  function CustomRates(container) {
    _classCallCheck(this, CustomRates);

    transport = container.transport;
  }

  _createClass(CustomRates, [{
    key: 'list',
    value: function list() {
      var filters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      return transport.send('GET', ENDPOINT, { filter: filters }).then(function (response) {
        return response;
      });
    }
  }, {
    key: 'create',
    value: function create(attrs) {
      return transport.send('POST', ENDPOINT, { value: attrs }).then(function (response) {
        return response;
      });
    }
  }, {
    key: 'remove',
    value: function remove() {
      var filters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      return transport.send('DELETE', ENDPOINT, { filter: filters }).then(function (response) {
        return response;
      });
    }
  }]);

  return CustomRates;
}();

exports.default = CustomRates;
module.exports = exports['default'];

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

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var transport = void 0;
var ENDPOINT = 'custom_stop_sell';

var CustomStopSells = function () {
  function CustomStopSells(container) {
    _classCallCheck(this, CustomStopSells);

    transport = container.transport;
  }

  _createClass(CustomStopSells, [{
    key: 'list',
    value: function list() {
      var filters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      return transport.send('GET', ENDPOINT, { filter: filters }).then(function (response) {
        return response;
      });
    }
  }, {
    key: 'create',
    value: function create(attrs) {
      return transport.send('POST', ENDPOINT, { value: attrs }).then(function (response) {
        return response;
      });
    }
  }, {
    key: 'remove',
    value: function remove() {
      var filters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      return transport.send('DELETE', ENDPOINT, { filter: filters }).then(function (response) {
        return response;
      });
    }
  }]);

  return CustomStopSells;
}();

exports.default = CustomStopSells;
module.exports = exports['default'];

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

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var transport = void 0;
var storage = void 0;
var ENDPOINT = 'email_templates';

var EmailTemplates = function () {
  function EmailTemplates(container) {
    _classCallCheck(this, EmailTemplates);

    transport = container.transport;
    storage = container.storage;
  }

  _createClass(EmailTemplates, [{
    key: 'list',
    value: function list() {
      var filters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      return transport.send('GET', ENDPOINT, { filter: filters }).then(function (response) {
        storage.emailTemplatesLoad(response.data);
        return response.data;
      });
    }
  }, {
    key: 'find',
    value: function find(id) {
      return transport.send('GET', ENDPOINT + '/' + id).then(function (response) {
        storage.emailTemplatesAdd(response.data);
        return response;
      });
    }
  }, {
    key: 'create',
    value: function create(attrs) {
      return transport.send('POST', ENDPOINT, { email_template: attrs }).then(function (response) {
        storage.emailTemplatesAdd(response.data);
        return response;
      });
    }
  }, {
    key: 'update',
    value: function update(attrs) {
      return transport.send('PUT', ENDPOINT + '/' + attrs.id, { email_template: attrs }).then(function (response) {
        storage.emailTemplatesAdd(response.data);
        return response;
      });
    }
  }]);

  return EmailTemplates;
}();

exports.default = EmailTemplates;
module.exports = exports['default'];

/***/ }),

/***/ "./src/collections/hotels.js":
/*!***********************************!*\
  !*** ./src/collections/hotels.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var transport = void 0;
var storage = void 0;
var ENDPOINT = 'hotels';

var Hotels = function () {
  function Hotels(container) {
    _classCallCheck(this, Hotels);

    transport = container.transport;
    storage = container.storage;
  }

  _createClass(Hotels, [{
    key: 'list',
    value: function list() {
      var filters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      return transport.send('GET', ENDPOINT, { filter: filters }).then(function (response) {
        storage.hotelsLoad(response.data);
        return response.data;
      });
    }
  }, {
    key: 'stats',
    value: function stats() {
      return transport.send('GET', ENDPOINT + '/stats').then(function (response) {
        storage.hotelsStatsLoad(response.data);
        return response.data;
      });
    }
  }, {
    key: 'find',
    value: function find(id) {
      return transport.send('GET', ENDPOINT + '/' + id).then(function (response) {
        storage.hotelsAdd(response.data);
        return response;
      });
    }
  }, {
    key: 'create',
    value: function create(attrs) {
      return transport.send('POST', ENDPOINT, { hotel: attrs }).then(function (response) {
        storage.hotelsAdd(response.data);
        return response;
      });
    }
  }, {
    key: 'update',
    value: function update(attrs) {
      return transport.send('PUT', ENDPOINT + '/' + attrs.id, { hotel: attrs }).then(function (response) {
        storage.hotelsAdd(response.data);
        return response;
      });
    }
  }]);

  return Hotels;
}();

exports.default = Hotels;
module.exports = exports['default'];

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

var _auth = __webpack_require__(/*! ./auth */ "./src/collections/auth.js");

var _auth2 = _interopRequireDefault(_auth);

var _hotels = __webpack_require__(/*! ./hotels */ "./src/collections/hotels.js");

var _hotels2 = _interopRequireDefault(_hotels);

var _room_types = __webpack_require__(/*! ./room_types */ "./src/collections/room_types.js");

var _room_types2 = _interopRequireDefault(_room_types);

var _rate_plans = __webpack_require__(/*! ./rate_plans */ "./src/collections/rate_plans.js");

var _rate_plans2 = _interopRequireDefault(_rate_plans);

var _channels = __webpack_require__(/*! ./channels */ "./src/collections/channels.js");

var _channels2 = _interopRequireDefault(_channels);

var _ari = __webpack_require__(/*! ./ari */ "./src/collections/ari.js");

var _ari2 = _interopRequireDefault(_ari);

var _custom_rates = __webpack_require__(/*! ./custom_rates */ "./src/collections/custom_rates.js");

var _custom_rates2 = _interopRequireDefault(_custom_rates);

var _custom_min_stay_arrivals = __webpack_require__(/*! ./custom_min_stay_arrivals */ "./src/collections/custom_min_stay_arrivals.js");

var _custom_min_stay_arrivals2 = _interopRequireDefault(_custom_min_stay_arrivals);

var _custom_min_stay_throughs = __webpack_require__(/*! ./custom_min_stay_throughs */ "./src/collections/custom_min_stay_throughs.js");

var _custom_min_stay_throughs2 = _interopRequireDefault(_custom_min_stay_throughs);

var _custom_max_stays = __webpack_require__(/*! ./custom_max_stays */ "./src/collections/custom_max_stays.js");

var _custom_max_stays2 = _interopRequireDefault(_custom_max_stays);

var _custom_closed_to_arrivals = __webpack_require__(/*! ./custom_closed_to_arrivals */ "./src/collections/custom_closed_to_arrivals.js");

var _custom_closed_to_arrivals2 = _interopRequireDefault(_custom_closed_to_arrivals);

var _custom_closed_to_departures = __webpack_require__(/*! ./custom_closed_to_departures */ "./src/collections/custom_closed_to_departures.js");

var _custom_closed_to_departures2 = _interopRequireDefault(_custom_closed_to_departures);

var _custom_stop_sells = __webpack_require__(/*! ./custom_stop_sells */ "./src/collections/custom_stop_sells.js");

var _custom_stop_sells2 = _interopRequireDefault(_custom_stop_sells);

var _custom_max_sells = __webpack_require__(/*! ./custom_max_sells */ "./src/collections/custom_max_sells.js");

var _custom_max_sells2 = _interopRequireDefault(_custom_max_sells);

var _custom_availability_offsets = __webpack_require__(/*! ./custom_availability_offsets */ "./src/collections/custom_availability_offsets.js");

var _custom_availability_offsets2 = _interopRequireDefault(_custom_availability_offsets);

var _custom_max_availabilities = __webpack_require__(/*! ./custom_max_availabilities */ "./src/collections/custom_max_availabilities.js");

var _custom_max_availabilities2 = _interopRequireDefault(_custom_max_availabilities);

var _custom_derived_options = __webpack_require__(/*! ./custom_derived_options */ "./src/collections/custom_derived_options.js");

var _custom_derived_options2 = _interopRequireDefault(_custom_derived_options);

var _email_templates = __webpack_require__(/*! ./email_templates */ "./src/collections/email_templates.js");

var _email_templates2 = _interopRequireDefault(_email_templates);

var _users = __webpack_require__(/*! ./users */ "./src/collections/users.js");

var _users2 = _interopRequireDefault(_users);

var _white_label_partners = __webpack_require__(/*! ./white_label_partners */ "./src/collections/white_label_partners.js");

var _white_label_partners2 = _interopRequireDefault(_white_label_partners);

var _white_label_domains = __webpack_require__(/*! ./white_label_domains */ "./src/collections/white_label_domains.js");

var _white_label_domains2 = _interopRequireDefault(_white_label_domains);

var _white_label_email_settings = __webpack_require__(/*! ./white_label_email_settings */ "./src/collections/white_label_email_settings.js");

var _white_label_email_settings2 = _interopRequireDefault(_white_label_email_settings);

var _tasks = __webpack_require__(/*! ./tasks */ "./src/collections/tasks.js");

var _tasks2 = _interopRequireDefault(_tasks);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  Auth: _auth2.default,
  Hotels: _hotels2.default,
  RoomTypes: _room_types2.default,
  RatePlans: _rate_plans2.default,
  Channels: _channels2.default,
  ARI: _ari2.default,
  CustomRates: _custom_rates2.default,
  CustomMinStayArrivals: _custom_min_stay_arrivals2.default,
  CustomMinStayThroughs: _custom_min_stay_throughs2.default,
  CustomMaxStays: _custom_max_stays2.default,
  CustomClosedToArrivals: _custom_closed_to_arrivals2.default,
  CustomClosedToDepartures: _custom_closed_to_departures2.default,
  CustomStopSells: _custom_stop_sells2.default,
  CustomMaxSells: _custom_max_sells2.default,
  CustomAvailabilityOffsets: _custom_availability_offsets2.default,
  CustomMaxAvailabilities: _custom_max_availabilities2.default,
  CustomDerivedOptions: _custom_derived_options2.default,
  EmailTemplates: _email_templates2.default,
  Users: _users2.default,
  WhiteLabelPartners: _white_label_partners2.default,
  WhiteLabelDomains: _white_label_domains2.default,
  WhiteLabelEmailSettings: _white_label_email_settings2.default,
  Tasks: _tasks2.default
};
module.exports = exports['default'];

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

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var transport = void 0;
var storage = void 0;
var ENDPOINT = 'rate_plans';

var RatePlans = function () {
  function RatePlans(container) {
    _classCallCheck(this, RatePlans);

    transport = container.transport;
    storage = container.storage;
  }

  _createClass(RatePlans, [{
    key: 'list',
    value: function list() {
      var filters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      return transport.send('GET', ENDPOINT, { filter: filters }).then(function (response) {
        storage.ratePlansLoad(response.data);
        return response.data;
      });
    }
  }, {
    key: 'find',
    value: function find(id) {
      return transport.send('GET', ENDPOINT + '/' + id).then(function (response) {
        storage.ratePlansAdd(response.data);
        return response;
      });
    }
  }, {
    key: 'create',
    value: function create(attrs) {
      return transport.send('POST', ENDPOINT, { rate_plan: attrs }).then(function (response) {
        storage.ratePlansAdd(response.data);
        return response;
      });
    }
  }, {
    key: 'update',
    value: function update(attrs) {
      return transport.send('PUT', ENDPOINT + '/' + attrs.id, { rate_plan: attrs }).then(function (response) {
        storage.ratePlansAdd(response.data);
        return response;
      });
    }
  }, {
    key: 'remove',
    value: function remove(attrs) {
      return transport.send('DELETE', ENDPOINT + '/' + attrs.id).then(function (response) {
        storage.ratePlansDrop(attrs);
        return response;
      });
    }
  }]);

  return RatePlans;
}();

exports.default = RatePlans;
module.exports = exports['default'];

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

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var transport = void 0;
var storage = void 0;
var ENDPOINT = 'room_types';

var RoomTypes = function () {
  function RoomTypes(container) {
    _classCallCheck(this, RoomTypes);

    transport = container.transport;
    storage = container.storage;
  }

  _createClass(RoomTypes, [{
    key: 'list',
    value: function list() {
      var filters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      return transport.send('GET', ENDPOINT, { filter: filters }).then(function (response) {
        storage.roomTypesLoad(response.data);
        return response.data;
      });
    }
  }, {
    key: 'find',
    value: function find(id) {
      return transport.send('GET', ENDPOINT + '/' + id).then(function (response) {
        storage.roomTypesAdd(response.data);
        return response;
      });
    }
  }, {
    key: 'create',
    value: function create(attrs) {
      return transport.send('POST', ENDPOINT, { room_type: attrs }).then(function (response) {
        storage.roomTypesAdd(response.data);
        return response;
      });
    }
  }, {
    key: 'update',
    value: function update(attrs) {
      return transport.send('PUT', ENDPOINT + '/' + attrs.id, { room_type: attrs }).then(function (response) {
        storage.roomTypesAdd(response.data);
        return response;
      });
    }
  }, {
    key: 'remove',
    value: function remove(attrs) {
      return transport.send('DELETE', ENDPOINT + '/' + attrs.id).then(function (response) {
        storage.roomTypesDrop(attrs);
        return response;
      });
    }
  }]);

  return RoomTypes;
}();

exports.default = RoomTypes;
module.exports = exports['default'];

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

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var transport = void 0;
var storage = void 0;
var ENDPOINT = 'tasks';

var Tasks = function () {
  function Tasks(container) {
    _classCallCheck(this, Tasks);

    transport = container.transport;
    storage = container.storage;
  }

  _createClass(Tasks, [{
    key: 'list',
    value: function list() {
      var filter = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var pagination = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var order = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      return transport.send('GET', ENDPOINT, { filter: filter, pagination: pagination, order: order }).then(function (response) {
        storage.tasksLoad(response.data, response.meta);
        return response.data;
      });
    }
  }, {
    key: 'find',
    value: function find(id) {
      return transport.send('GET', ENDPOINT + '/' + id).then(function (response) {
        return response;
      });
    }
  }]);

  return Tasks;
}();

exports.default = Tasks;
module.exports = exports['default'];

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

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var transport = void 0;
var storage = void 0;
var ENDPOINT = 'users';

var Users = function () {
  function Users(container) {
    _classCallCheck(this, Users);

    transport = container.transport;
    storage = container.storage;
  }

  _createClass(Users, [{
    key: 'list',
    value: function list() {
      var filters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      return transport.send('GET', ENDPOINT, { filter: filters }).then(function (response) {
        storage.usersLoad(response.data);
        return response.data;
      });
    }
  }, {
    key: 'find',
    value: function find(id) {
      return transport.send('GET', ENDPOINT + '/' + id).then(function (response) {
        storage.usersAdd(response.data);
        return response;
      });
    }
  }, {
    key: 'create',
    value: function create(attrs) {
      return transport.send('POST', ENDPOINT, { user: attrs }).then(function (response) {
        storage.usersAdd(response.data);
        return response;
      });
    }
  }, {
    key: 'update',
    value: function update(attrs) {
      return transport.send('PUT', ENDPOINT + '/' + attrs.id, { user: attrs }).then(function (response) {
        storage.usersAdd(response.data);
        return response;
      });
    }
  }]);

  return Users;
}();

exports.default = Users;
module.exports = exports['default'];

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

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var transport = void 0;
var storage = void 0;
var ENDPOINT = 'wl_domains';

var WhiteLabelDomains = function () {
  function WhiteLabelDomains(container) {
    _classCallCheck(this, WhiteLabelDomains);

    transport = container.transport;
    storage = container.storage;
  }

  _createClass(WhiteLabelDomains, [{
    key: 'list',
    value: function list() {
      var filters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      return transport.send('GET', ENDPOINT, { filter: filters }).then(function (response) {
        storage.whiteLabelDomainsLoad(response.data);
        return response.data;
      });
    }
  }, {
    key: 'find',
    value: function find(id) {
      return transport.send('GET', ENDPOINT + '/' + id).then(function (response) {
        storage.whiteLabelDomainsAdd(response.data);
        return response;
      });
    }
  }, {
    key: 'create',
    value: function create(attrs) {
      return transport.send('POST', ENDPOINT, { wl_domain: attrs }).then(function (response) {
        storage.whiteLabelDomainsAdd(response.data);
        return response;
      });
    }
  }, {
    key: 'update',
    value: function update(attrs) {
      return transport.send('PUT', ENDPOINT + '/' + attrs.id, { wl_domain: attrs }).then(function (response) {
        storage.whiteLabelDomainsAdd(response.data);
        return response;
      });
    }
  }]);

  return WhiteLabelDomains;
}();

exports.default = WhiteLabelDomains;
module.exports = exports['default'];

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

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var transport = void 0;
var storage = void 0;
var ENDPOINT = 'wl_email_settings';

var WhiteLabelEmailSettings = function () {
  function WhiteLabelEmailSettings(container) {
    _classCallCheck(this, WhiteLabelEmailSettings);

    transport = container.transport;
    storage = container.storage;
  }

  _createClass(WhiteLabelEmailSettings, [{
    key: 'list',
    value: function list() {
      var filters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      return transport.send('GET', ENDPOINT, { filter: filters }).then(function (response) {
        storage.whiteLabelEmailSettingsLoad(response.data);
        return response.data;
      });
    }
  }, {
    key: 'find',
    value: function find(id) {
      return transport.send('GET', ENDPOINT + '/' + id).then(function (response) {
        storage.whiteLabelEmailSettingsAdd(response.data);
        return response;
      });
    }
  }, {
    key: 'create',
    value: function create(attrs) {
      return transport.send('POST', ENDPOINT, { wl_email_setting: attrs }).then(function (response) {
        storage.whiteLabelEmailSettingsAdd(response.data);
        return response;
      });
    }
  }, {
    key: 'update',
    value: function update(attrs) {
      return transport.send('PUT', ENDPOINT + '/' + attrs.id, { wl_email_setting: attrs }).then(function (response) {
        storage.whiteLabelEmailSettingsAdd(response.data);
        return response;
      });
    }
  }]);

  return WhiteLabelEmailSettings;
}();

exports.default = WhiteLabelEmailSettings;
module.exports = exports['default'];

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

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var transport = void 0;
var storage = void 0;
var ENDPOINT = 'wl_partners';

var WhiteLabelPartners = function () {
  function WhiteLabelPartners(container) {
    _classCallCheck(this, WhiteLabelPartners);

    transport = container.transport;
    storage = container.storage;
  }

  _createClass(WhiteLabelPartners, [{
    key: 'list',
    value: function list() {
      var filters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      return transport.send('GET', ENDPOINT, { filter: filters }).then(function (response) {
        storage.whiteLabelPartnersLoad(response.data);
        return response.data;
      });
    }
  }, {
    key: 'find',
    value: function find(id) {
      return transport.send('GET', ENDPOINT + '/' + id).then(function (response) {
        storage.whiteLabelPartnersAdd(response.data);
        return response;
      });
    }
  }, {
    key: 'create',
    value: function create(attrs) {
      return transport.send('POST', ENDPOINT, { wl_partner: attrs }).then(function (response) {
        storage.whiteLabelPartnersAdd(response.data);
        return response;
      });
    }
  }, {
    key: 'update',
    value: function update(attrs) {
      return transport.send('PUT', ENDPOINT + '/' + attrs.id, { wl_partner: attrs }).then(function (response) {
        storage.whiteLabelPartnersAdd(response.data);
        return response;
      });
    }
  }]);

  return WhiteLabelPartners;
}();

exports.default = WhiteLabelPartners;
module.exports = exports['default'];

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

var _collections = __webpack_require__(/*! ./collections */ "./src/collections/index.js");

var _collections2 = _interopRequireDefault(_collections);

var _transport = __webpack_require__(/*! ./transport */ "./src/transport/index.js");

var _storage = __webpack_require__(/*! ./storage */ "./src/storage/index.js");

var _storage2 = _interopRequireDefault(_storage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var defaultOptions = {
  protocol: 'http',
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
    this.storage = (0, _storage2.default)({});
    this.settings = Object.assign(defaultOptions, opts);

    // Register transport methods
    this.http = new _transport.HTTPTransport(this.settings, getToken(this.storage.getState()));
    this.ws = new _transport.WSTransport(this.settings, getToken(this.storage.getState()));
    this.transport = this.settings.protocol === 'ws' ? this.ws : this.http;

    this.Auth = new _collections2.default.Auth(this);
    this.Hotels = new _collections2.default.Hotels(this);
    this.RoomTypes = new _collections2.default.RoomTypes(this);
    this.RatePlans = new _collections2.default.RatePlans(this);
    this.Channels = new _collections2.default.Channels(this);
    this.ARI = new _collections2.default.ARI(this);
    this.CustomRates = new _collections2.default.CustomRates(this);
    this.CustomMinStayArrivals = new _collections2.default.CustomMinStayArrivals(this);
    this.CustomMinStayThroughs = new _collections2.default.CustomMinStayThroughs(this);
    this.CustomMaxStays = new _collections2.default.CustomMaxStays(this);
    this.CustomClosedToArrivals = new _collections2.default.CustomClosedToArrivals(this);
    this.CustomClosedToDepartures = new _collections2.default.CustomClosedToDepartures(this);
    this.CustomStopSells = new _collections2.default.CustomStopSells(this);
    this.CustomMaxSells = new _collections2.default.CustomMaxSells(this);
    this.CustomAvailabilityOffsets = new _collections2.default.CustomAvailabilityOffsets(this);
    this.CustomMaxAvailabilities = new _collections2.default.CustomMaxAvailabilities(this);
    this.CustomDerivedOptions = new _collections2.default.CustomDerivedOptions(this);
    this.EmailTemplates = new _collections2.default.EmailTemplates(this);
    this.Users = new _collections2.default.Users(this);
    this.WhiteLabelPartners = new _collections2.default.WhiteLabelPartners(this);
    this.WhiteLabelDomains = new _collections2.default.WhiteLabelDomains(this);
    this.WhiteLabelEmailSettings = new _collections2.default.WhiteLabelEmailSettings(this);
    this.Tasks = new _collections2.default.Tasks(this);
    instance = this;
  } else {
    return instance;
  }
};

exports.default = new ChannexBL(window.channexSettings || {});
module.exports = exports['default'];

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

var _constants = __webpack_require__(/*! ../constants */ "./src/storage/constants.js");

function channelsLoad(storage) {
  return function (channels) {
    storage.dispatch({ type: _constants.CHANNELS_LOAD, payload: channels });
  };
}

function channelsAdd(storage) {
  return function (channel) {
    storage.dispatch({ type: _constants.CHANNELS_ADD, payload: channel });
  };
}

function channelsDrop(storage) {
  return function (channel) {
    storage.dispatch({ type: _constants.CHANNELS_DROP, payload: channel });
  };
}

exports.default = { channelsLoad: channelsLoad, channelsAdd: channelsAdd, channelsDrop: channelsDrop };
module.exports = exports['default'];

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

var _constants = __webpack_require__(/*! ../constants */ "./src/storage/constants.js");

function emailTemplatesLoad(storage) {
  return function (emailTemplates) {
    storage.dispatch({ type: _constants.EMAIL_TEMPLATES_LOAD, payload: emailTemplates });
  };
}

function emailTemplatesAdd(storage) {
  return function (emailTemplate) {
    storage.dispatch({ type: _constants.EMAIL_TEMPLATES_ADD, payload: emailTemplate });
  };
}

function emailTemplatesDrop(storage) {
  return function (emailTemplate) {
    storage.dispatch({ type: _constants.EMAIL_TEMPLATES_DROP, payload: emailTemplate });
  };
}

exports.default = { emailTemplatesLoad: emailTemplatesLoad, emailTemplatesAdd: emailTemplatesAdd, emailTemplatesDrop: emailTemplatesDrop };
module.exports = exports['default'];

/***/ }),

/***/ "./src/storage/actions/hotel_actions.js":
/*!**********************************************!*\
  !*** ./src/storage/actions/hotel_actions.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _constants = __webpack_require__(/*! ../constants */ "./src/storage/constants.js");

function hotelsLoad(storage) {
  return function (hotels) {
    storage.dispatch({ type: _constants.HOTELS_LOAD, payload: hotels });
  };
}

function hotelsAdd(storage) {
  return function (hotel) {
    storage.dispatch({ type: _constants.HOTELS_ADD, payload: hotel });
  };
}

exports.default = { hotelsLoad: hotelsLoad, hotelsAdd: hotelsAdd };
module.exports = exports['default'];

/***/ }),

/***/ "./src/storage/actions/hotel_stats_actions.js":
/*!****************************************************!*\
  !*** ./src/storage/actions/hotel_stats_actions.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _constants = __webpack_require__(/*! ../constants */ "./src/storage/constants.js");

function hotelsStatsLoad(storage) {
  return function (stats) {
    storage.dispatch({ type: _constants.HOTELS_STATS_LOAD, payload: stats });
  };
}

exports.default = { hotelsStatsLoad: hotelsStatsLoad };
module.exports = exports['default'];

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

var _session_actions = __webpack_require__(/*! ./session_actions */ "./src/storage/actions/session_actions.js");

var _hotel_actions = __webpack_require__(/*! ./hotel_actions */ "./src/storage/actions/hotel_actions.js");

var _hotel_stats_actions = __webpack_require__(/*! ./hotel_stats_actions */ "./src/storage/actions/hotel_stats_actions.js");

var _room_type_actions = __webpack_require__(/*! ./room_type_actions */ "./src/storage/actions/room_type_actions.js");

var _rate_plan_actions = __webpack_require__(/*! ./rate_plan_actions */ "./src/storage/actions/rate_plan_actions.js");

var _channel_actions = __webpack_require__(/*! ./channel_actions */ "./src/storage/actions/channel_actions.js");

var _email_template_actions = __webpack_require__(/*! ./email_template_actions */ "./src/storage/actions/email_template_actions.js");

var _user_actions = __webpack_require__(/*! ./user_actions */ "./src/storage/actions/user_actions.js");

var _white_label_partner_actions = __webpack_require__(/*! ./white_label_partner_actions */ "./src/storage/actions/white_label_partner_actions.js");

var _white_label_domain_actions = __webpack_require__(/*! ./white_label_domain_actions */ "./src/storage/actions/white_label_domain_actions.js");

var _white_label_email_settings_actions = __webpack_require__(/*! ./white_label_email_settings_actions */ "./src/storage/actions/white_label_email_settings_actions.js");

var _tasks_actions = __webpack_require__(/*! ./tasks_actions */ "./src/storage/actions/tasks_actions.js");

exports.default = {
  sessionAdd: _session_actions.sessionAdd,
  chooseHotel: _session_actions.chooseHotel,

  hotelsLoad: _hotel_actions.hotelsLoad,
  hotelsStatsLoad: _hotel_stats_actions.hotelsStatsLoad,
  hotelsAdd: _hotel_actions.hotelsAdd,

  roomTypesLoad: _room_type_actions.roomTypesLoad,
  roomTypesAdd: _room_type_actions.roomTypesAdd,
  roomTypesDrop: _room_type_actions.roomTypesDrop,

  ratePlansLoad: _rate_plan_actions.ratePlansLoad,
  ratePlansAdd: _rate_plan_actions.ratePlansAdd,
  ratePlansDrop: _rate_plan_actions.ratePlansDrop,

  channelsLoad: _channel_actions.channelsLoad,
  channelsAdd: _channel_actions.channelsAdd,
  channelsDrop: _channel_actions.channelsDrop,

  emailTemplatesLoad: _email_template_actions.emailTemplatesLoad,
  emailTemplatesAdd: _email_template_actions.emailTemplatesAdd,
  emailTemplatesDrop: _email_template_actions.emailTemplatesDrop,

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

  tasksLoad: _tasks_actions.tasksLoad
};
module.exports = exports['default'];

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

var _constants = __webpack_require__(/*! ../constants */ "./src/storage/constants.js");

function ratePlansLoad(storage) {
  return function (ratePlans) {
    storage.dispatch({ type: _constants.RATE_PLANS_LOAD, payload: ratePlans });
  };
}

function ratePlansAdd(storage) {
  return function (ratePlan) {
    storage.dispatch({ type: _constants.RATE_PLANS_ADD, payload: ratePlan });
  };
}

function ratePlansDrop(storage) {
  return function (ratePlan) {
    storage.dispatch({ type: _constants.RATE_PLANS_DROP, payload: ratePlan });
  };
}

exports.default = { ratePlansLoad: ratePlansLoad, ratePlansAdd: ratePlansAdd, ratePlansDrop: ratePlansDrop };
module.exports = exports['default'];

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

var _constants = __webpack_require__(/*! ../constants */ "./src/storage/constants.js");

function roomTypesLoad(storage) {
  return function (roomTypes) {
    storage.dispatch({ type: _constants.ROOM_TYPES_LOAD, payload: roomTypes });
  };
}

function roomTypesAdd(storage) {
  return function (roomType) {
    storage.dispatch({ type: _constants.ROOM_TYPES_ADD, payload: roomType });
  };
}

function roomTypesDrop(storage) {
  return function (roomType) {
    storage.dispatch({ type: _constants.ROOM_TYPES_DROP, payload: roomType });
  };
}

exports.default = { roomTypesLoad: roomTypesLoad, roomTypesAdd: roomTypesAdd, roomTypesDrop: roomTypesDrop };
module.exports = exports['default'];

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

var _constants = __webpack_require__(/*! ../constants */ "./src/storage/constants.js");

function sessionAdd(storage) {
  return function (session) {
    storage.dispatch({ type: _constants.SESSION_ADD, payload: session });
  };
}

function chooseHotel(storage) {
  return function (hotel) {
    storage.dispatch({ type: _constants.CHOOSE_HOTEL, payload: hotel });
  };
}

exports.default = { sessionAdd: sessionAdd, chooseHotel: chooseHotel };
module.exports = exports['default'];

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

var _constants = __webpack_require__(/*! ../constants */ "./src/storage/constants.js");

function tasksLoad(storage) {
  return function (tasks, meta) {
    storage.dispatch({ type: _constants.TASKS_LOAD, payload: { tasks: tasks, meta: meta } });
  };
}

exports.default = { tasksLoad: tasksLoad };
module.exports = exports['default'];

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

var _constants = __webpack_require__(/*! ../constants */ "./src/storage/constants.js");

function usersLoad(storage) {
  return function (users) {
    storage.dispatch({ type: _constants.USERS_LOAD, payload: users });
  };
}

function usersAdd(storage) {
  return function (user) {
    storage.dispatch({ type: _constants.USERS_ADD, payload: user });
  };
}

function usersDrop(storage) {
  return function (user) {
    storage.dispatch({ type: _constants.USERS_DROP, payload: user });
  };
}

exports.default = { usersLoad: usersLoad, usersAdd: usersAdd, usersDrop: usersDrop };
module.exports = exports['default'];

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

var _constants = __webpack_require__(/*! ../constants */ "./src/storage/constants.js");

function whiteLabelDomainsLoad(storage) {
  return function (whiteLabelDomains) {
    storage.dispatch({ type: _constants.WHITE_LABEL_DOMAINS_LOAD, payload: whiteLabelDomains });
  };
}

function whiteLabelDomainsAdd(storage) {
  return function (whiteLabelDomain) {
    storage.dispatch({ type: _constants.WHITE_LABEL_DOMAINS_ADD, payload: whiteLabelDomain });
  };
}

function whiteLabelDomainsDrop(storage) {
  return function (whiteLabelDomain) {
    storage.dispatch({ type: _constants.WHITE_LABEL_DOMAINS_DROP, payload: whiteLabelDomain });
  };
}

exports.default = { whiteLabelDomainsLoad: whiteLabelDomainsLoad, whiteLabelDomainsAdd: whiteLabelDomainsAdd, whiteLabelDomainsDrop: whiteLabelDomainsDrop };
module.exports = exports['default'];

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

var _constants = __webpack_require__(/*! ../constants */ "./src/storage/constants.js");

function whiteLabelEmailSettingsLoad(storage) {
  return function (whiteLabelEmailSettings) {
    storage.dispatch({ type: _constants.WHITE_LABEL_EMAIL_SETTINGS_LOAD, payload: whiteLabelEmailSettings });
  };
}

function whiteLabelEmailSettingsAdd(storage) {
  return function (whiteLabelEmailSetting) {
    storage.dispatch({ type: _constants.WHITE_LABEL_EMAIL_SETTINGS_ADD, payload: whiteLabelEmailSetting });
  };
}

function whiteLabelEmailSettingsDrop(storage) {
  return function (whiteLabelEmailSetting) {
    storage.dispatch({ type: _constants.WHITE_LABEL_EMAIL_SETTINGS_DROP, payload: whiteLabelEmailSetting });
  };
}

exports.default = { whiteLabelEmailSettingsLoad: whiteLabelEmailSettingsLoad, whiteLabelEmailSettingsAdd: whiteLabelEmailSettingsAdd, whiteLabelEmailSettingsDrop: whiteLabelEmailSettingsDrop };
module.exports = exports['default'];

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

var _constants = __webpack_require__(/*! ../constants */ "./src/storage/constants.js");

function whiteLabelPartnersLoad(storage) {
  return function (whiteLabelPartners) {
    storage.dispatch({ type: _constants.WHITE_LABEL_PARTNERS_LOAD, payload: whiteLabelPartners });
  };
}

function whiteLabelPartnersAdd(storage) {
  return function (whiteLabelPartner) {
    storage.dispatch({ type: _constants.WHITE_LABEL_PARTNERS_ADD, payload: whiteLabelPartner });
  };
}

function whiteLabelPartnersDrop(storage) {
  return function (whiteLabelPartner) {
    storage.dispatch({ type: _constants.WHITE_LABEL_PARTNERS_DROP, payload: whiteLabelPartner });
  };
}

exports.default = { whiteLabelPartnersLoad: whiteLabelPartnersLoad, whiteLabelPartnersAdd: whiteLabelPartnersAdd, whiteLabelPartnersDrop: whiteLabelPartnersDrop };
module.exports = exports['default'];

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
var STORAGE_CACHE_KEY = exports.STORAGE_CACHE_KEY = 'CHANNEX_BL_CACHE';
var SESSION_ADD = exports.SESSION_ADD = 'SESSION_ADD';
var CHOOSE_HOTEL = exports.CHOOSE_HOTEL = 'CHOOSE_HOTEL';

var HOTELS_LOAD = exports.HOTELS_LOAD = 'HOTELS_LOAD';
var HOTELS_ADD = exports.HOTELS_ADD = 'HOTELS_ADD';
var HOTELS_DROP = exports.HOTELS_DROP = 'HOTELS_DROP';

var HOTELS_STATS_LOAD = exports.HOTELS_STATS_LOAD = 'HOTELS_STATS_LOAD';

var ROOM_TYPES_LOAD = exports.ROOM_TYPES_LOAD = 'ROOM_TYPES_LOAD';
var ROOM_TYPES_ADD = exports.ROOM_TYPES_ADD = 'ROOM_TYPES_ADD';
var ROOM_TYPES_DROP = exports.ROOM_TYPES_DROP = 'ROOM_TYPES_DROP';

var RATE_PLANS_LOAD = exports.RATE_PLANS_LOAD = 'RATE_PLANS_LOAD';
var RATE_PLANS_ADD = exports.RATE_PLANS_ADD = 'RATE_PLANS_ADD';
var RATE_PLANS_DROP = exports.RATE_PLANS_DROP = 'RATE_PLANS_DROP';

var CHANNELS_LOAD = exports.CHANNELS_LOAD = 'CHANNELS_LOAD';
var CHANNELS_ADD = exports.CHANNELS_ADD = 'CHANNELS_ADD';
var CHANNELS_DROP = exports.CHANNELS_DROP = 'CHANNELS_DROP';

var USERS_LOAD = exports.USERS_LOAD = 'USERS_LOAD';
var USERS_ADD = exports.USERS_ADD = 'USERS_ADD';
var USERS_DROP = exports.USERS_DROP = 'USERS_DROP';

var WHITE_LABEL_PARTNERS_LOAD = exports.WHITE_LABEL_PARTNERS_LOAD = 'WHITE_LABEL_PARTNERS_LOAD';
var WHITE_LABEL_PARTNERS_ADD = exports.WHITE_LABEL_PARTNERS_ADD = 'WHITE_LABEL_PARTNERS_ADD';
var WHITE_LABEL_PARTNERS_DROP = exports.WHITE_LABEL_PARTNERS_DROP = 'WHITE_LABEL_PARTNERS_DROP';

var WHITE_LABEL_DOMAINS_LOAD = exports.WHITE_LABEL_DOMAINS_LOAD = 'WHITE_LABEL_DOMAINS_LOAD';
var WHITE_LABEL_DOMAINS_ADD = exports.WHITE_LABEL_DOMAINS_ADD = 'WHITE_LABEL_DOMAINS_ADD';
var WHITE_LABEL_DOMAINS_DROP = exports.WHITE_LABEL_DOMAINS_DROP = 'WHITE_LABEL_DOMAINS_DROP';

var WHITE_LABEL_EMAIL_SETTINGS_LOAD = exports.WHITE_LABEL_EMAIL_SETTINGS_LOAD = 'WHITE_LABEL_EMAIL_SETTINGS_LOAD';
var WHITE_LABEL_EMAIL_SETTINGS_ADD = exports.WHITE_LABEL_EMAIL_SETTINGS_ADD = 'WHITE_LABEL_EMAIL_SETTINGS_ADD';
var WHITE_LABEL_EMAIL_SETTINGS_DROP = exports.WHITE_LABEL_EMAIL_SETTINGS_DROP = 'WHITE_LABEL_EMAIL_SETTINGS_DROP';

var EMAIL_TEMPLATES_LOAD = exports.EMAIL_TEMPLATES_LOAD = 'EMAIL_TEMPLATES_LOAD';
var EMAIL_TEMPLATES_ADD = exports.EMAIL_TEMPLATES_ADD = 'EMAIL_TEMPLATES_ADD';
var EMAIL_TEMPLATES_DROP = exports.EMAIL_TEMPLATES_DROP = 'EMAIL_TEMPLATES_DROP';

var TASKS_LOAD = exports.TASKS_LOAD = 'TASKS_LOAD';

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

var _redux = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");

var _developmentOnly = __webpack_require__(/*! redux-devtools-extension/developmentOnly */ "./node_modules/redux-devtools-extension/developmentOnly.js");

var _local_storage_cache = __webpack_require__(/*! ./middlewares/local_storage_cache */ "./src/storage/middlewares/local_storage_cache.js");

var _local_storage_cache2 = _interopRequireDefault(_local_storage_cache);

var _actions = __webpack_require__(/*! ./actions */ "./src/storage/actions/index.js");

var _actions2 = _interopRequireDefault(_actions);

var _reducers = __webpack_require__(/*! ./reducers */ "./src/storage/reducers/index.js");

var _reducers2 = _interopRequireDefault(_reducers);

var _constants = __webpack_require__(/*! ./constants */ "./src/storage/constants.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function assignActions(target) {
  Object.keys(_actions2.default).forEach(function (action) {
    if (typeof target[action] === 'undefined') {
      target[action] = _actions2.default[action](target);
    } else {
      throw new Error(action + ' is present at storage object');
    }
  });

  return target;
}

var Storage = function Storage(preloadedState) {
  var savedState = localStorage.getItem(_constants.STORAGE_CACHE_KEY);

  var storage = (0, _redux.createStore)(_reducers2.default, savedState ? JSON.parse(savedState) : preloadedState, (0, _developmentOnly.composeWithDevTools)((0, _redux.applyMiddleware)(_local_storage_cache2.default)));

  return assignActions(storage);
};

exports.default = Storage;
module.exports = exports['default'];

/***/ }),

/***/ "./src/storage/middlewares/local_storage_cache.js":
/*!********************************************************!*\
  !*** ./src/storage/middlewares/local_storage_cache.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _constants = __webpack_require__(/*! ../constants */ "./src/storage/constants.js");

function localStorageCache(_ref) {
  var getState = _ref.getState;

  return function (next) {
    return function (action) {
      var returnValue = next(action);

      localStorage.setItem(_constants.STORAGE_CACHE_KEY, JSON.stringify(getState()));

      return returnValue;
    };
  };
}

exports.default = localStorageCache;
module.exports = exports['default'];

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

var _ACTION_HANDLERS;

exports.default = channelsReducer;

var _constants = __webpack_require__(/*! ../constants */ "./src/storage/constants.js");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var initialState = null;
var ACTION_HANDLERS = (_ACTION_HANDLERS = {}, _defineProperty(_ACTION_HANDLERS, _constants.CHANNELS_LOAD, function (state, action) {
  return Object.assign({}, state || {}, action.payload.reduce(function (acc, el) {
    acc[el.id] = el.attributes;
    if (el.relationships) {
      Object.keys(el.relationships).forEach(function (key) {
        acc[el.id][key + '_id'] = el.relationships[key].data.id;
      });
    }
    return acc;
  }, {}));
}), _defineProperty(_ACTION_HANDLERS, _constants.CHANNELS_ADD, function (state, action) {
  var item = {};

  item[action.payload.id] = action.payload.attributes;
  if (action.payload.relationships) {
    Object.keys(action.payload.relationships).forEach(function (key) {
      item[action.payload.id][key + '_id'] = action.payload.relationships[key].data.id;
    });
  }
  return Object.assign({}, state || {}, item);
}), _defineProperty(_ACTION_HANDLERS, _constants.CHANNELS_DROP, function (state, action) {
  delete state[action.payload.id];
  return Object.assign({}, state || {}, {});
}), _ACTION_HANDLERS);

function channelsReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments[1];

  var handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}
module.exports = exports['default'];

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

var _ACTION_HANDLERS;

exports.default = emailTemplatesReducer;

var _constants = __webpack_require__(/*! ../constants */ "./src/storage/constants.js");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var initialState = null;
var ACTION_HANDLERS = (_ACTION_HANDLERS = {}, _defineProperty(_ACTION_HANDLERS, _constants.EMAIL_TEMPLATES_LOAD, function (state, action) {
  return Object.assign({}, state || {}, action.payload.reduce(function (acc, el) {
    acc[el.id] = el.attributes;
    return acc;
  }, {}));
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
  var action = arguments[1];

  var handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}
module.exports = exports['default'];

/***/ }),

/***/ "./src/storage/reducers/hotels_reducer.js":
/*!************************************************!*\
  !*** ./src/storage/reducers/hotels_reducer.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ACTION_HANDLERS;

exports.default = hotelsReducer;

var _constants = __webpack_require__(/*! ../constants */ "./src/storage/constants.js");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var initialState = null;
var ACTION_HANDLERS = (_ACTION_HANDLERS = {}, _defineProperty(_ACTION_HANDLERS, _constants.HOTELS_LOAD, function (state, action) {
  return Object.assign({}, state || {}, action.payload.reduce(function (acc, el) {
    acc[el.id] = el.attributes;
    return acc;
  }, {}));
}), _defineProperty(_ACTION_HANDLERS, _constants.HOTELS_ADD, function (state, action) {
  var item = {};

  item[action.payload.id] = action.payload.attributes;
  return Object.assign({}, state || {}, item);
}), _defineProperty(_ACTION_HANDLERS, _constants.HOTELS_DROP, function (state, action) {
  delete state[action.payload.id];
  return Object.assign({}, state || {}, {});
}), _ACTION_HANDLERS);

function hotelsReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments[1];

  var handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}
module.exports = exports['default'];

/***/ }),

/***/ "./src/storage/reducers/hotels_stats_reducer.js":
/*!******************************************************!*\
  !*** ./src/storage/reducers/hotels_stats_reducer.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = hotelsStatsReducer;

var _constants = __webpack_require__(/*! ../constants */ "./src/storage/constants.js");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var initialState = null;
var ACTION_HANDLERS = _defineProperty({}, _constants.HOTELS_STATS_LOAD, function (state, action) {
  return Object.assign({}, state || {}, action.payload.reduce(function (acc, el) {
    acc[el.id] = el.attributes;
    return acc;
  }, {}));
});

function hotelsStatsReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments[1];

  var handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}
module.exports = exports['default'];

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

var _redux = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");

var _session_reducer = __webpack_require__(/*! ./session_reducer */ "./src/storage/reducers/session_reducer.js");

var _session_reducer2 = _interopRequireDefault(_session_reducer);

var _hotels_reducer = __webpack_require__(/*! ./hotels_reducer */ "./src/storage/reducers/hotels_reducer.js");

var _hotels_reducer2 = _interopRequireDefault(_hotels_reducer);

var _hotels_stats_reducer = __webpack_require__(/*! ./hotels_stats_reducer */ "./src/storage/reducers/hotels_stats_reducer.js");

var _hotels_stats_reducer2 = _interopRequireDefault(_hotels_stats_reducer);

var _room_types_reducer = __webpack_require__(/*! ./room_types_reducer */ "./src/storage/reducers/room_types_reducer.js");

var _room_types_reducer2 = _interopRequireDefault(_room_types_reducer);

var _rate_plans_reducer = __webpack_require__(/*! ./rate_plans_reducer */ "./src/storage/reducers/rate_plans_reducer.js");

var _rate_plans_reducer2 = _interopRequireDefault(_rate_plans_reducer);

var _channels_reducer = __webpack_require__(/*! ./channels_reducer */ "./src/storage/reducers/channels_reducer.js");

var _channels_reducer2 = _interopRequireDefault(_channels_reducer);

var _email_templates_reducer = __webpack_require__(/*! ./email_templates_reducer */ "./src/storage/reducers/email_templates_reducer.js");

var _email_templates_reducer2 = _interopRequireDefault(_email_templates_reducer);

var _users_reducer = __webpack_require__(/*! ./users_reducer */ "./src/storage/reducers/users_reducer.js");

var _users_reducer2 = _interopRequireDefault(_users_reducer);

var _white_label_partners_reducer = __webpack_require__(/*! ./white_label_partners_reducer */ "./src/storage/reducers/white_label_partners_reducer.js");

var _white_label_partners_reducer2 = _interopRequireDefault(_white_label_partners_reducer);

var _white_label_domains_reducer = __webpack_require__(/*! ./white_label_domains_reducer */ "./src/storage/reducers/white_label_domains_reducer.js");

var _white_label_domains_reducer2 = _interopRequireDefault(_white_label_domains_reducer);

var _white_label_email_settings_reducer = __webpack_require__(/*! ./white_label_email_settings_reducer */ "./src/storage/reducers/white_label_email_settings_reducer.js");

var _white_label_email_settings_reducer2 = _interopRequireDefault(_white_label_email_settings_reducer);

var _tasks_reducer = __webpack_require__(/*! ./tasks_reducer */ "./src/storage/reducers/tasks_reducer.js");

var _tasks_reducer2 = _interopRequireDefault(_tasks_reducer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var rootReducer = (0, _redux.combineReducers)({
  session: _session_reducer2.default,
  hotels: _hotels_reducer2.default,
  hotelsStats: _hotels_stats_reducer2.default,
  roomTypes: _room_types_reducer2.default,
  ratePlans: _rate_plans_reducer2.default,
  channels: _channels_reducer2.default,
  emailTemplates: _email_templates_reducer2.default,
  users: _users_reducer2.default,
  whiteLabelPartners: _white_label_partners_reducer2.default,
  whiteLabelDomains: _white_label_domains_reducer2.default,
  whiteLabelEmailSettings: _white_label_email_settings_reducer2.default,
  tasks: _tasks_reducer2.default
});

exports.default = rootReducer;
module.exports = exports['default'];

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

var _ACTION_HANDLERS;

exports.default = ratePlansReducer;

var _constants = __webpack_require__(/*! ../constants */ "./src/storage/constants.js");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var initialState = null;
var ACTION_HANDLERS = (_ACTION_HANDLERS = {}, _defineProperty(_ACTION_HANDLERS, _constants.RATE_PLANS_LOAD, function (state, action) {
  return Object.assign({}, state || {}, action.payload.reduce(function (acc, el) {
    acc[el.id] = el.attributes;
    if (el.relationships) {
      Object.keys(el.relationships).forEach(function (key) {
        acc[el.id][key + '_id'] = el.relationships[key].data.id;
      });
    }
    return acc;
  }, {}));
}), _defineProperty(_ACTION_HANDLERS, _constants.RATE_PLANS_ADD, function (state, action) {
  var item = {};

  item[action.payload.id] = action.payload.attributes;
  if (action.payload.relationships) {
    Object.keys(action.payload.relationships).forEach(function (key) {
      item[action.payload.id][key + '_id'] = action.payload.relationships[key].data.id;
    });
  }
  return Object.assign({}, state || {}, item);
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
  var action = arguments[1];

  var handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}
module.exports = exports['default'];

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

var _ACTION_HANDLERS;

exports.default = roomTypesReducer;

var _constants = __webpack_require__(/*! ../constants */ "./src/storage/constants.js");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var initialState = null;
var ACTION_HANDLERS = (_ACTION_HANDLERS = {}, _defineProperty(_ACTION_HANDLERS, _constants.ROOM_TYPES_LOAD, function (state, action) {
  return Object.assign({}, state || {}, action.payload.reduce(function (acc, el) {
    acc[el.id] = el.attributes;
    if (el.relationships) {
      Object.keys(el.relationships).forEach(function (key) {
        acc[el.id][key + '_id'] = el.relationships[key].data.id;
      });
    }
    return acc;
  }, {}));
}), _defineProperty(_ACTION_HANDLERS, _constants.ROOM_TYPES_ADD, function (state, action) {
  var item = {};

  item[action.payload.id] = action.payload.attributes;
  if (action.payload.relationships) {
    Object.keys(action.payload.relationships).forEach(function (key) {
      item[action.payload.id][key + '_id'] = action.payload.relationships[key].data.id;
    });
  }
  return Object.assign({}, state || {}, item);
}), _defineProperty(_ACTION_HANDLERS, _constants.ROOM_TYPES_DROP, function (state, action) {
  delete state[action.payload.id];
  return Object.assign({}, state || {}, {});
}), _ACTION_HANDLERS);

function roomTypesReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments[1];

  var handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}
module.exports = exports['default'];

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

var _ACTION_HANDLERS;

exports.default = sessionReducer;

var _constants = __webpack_require__(/*! ../constants */ "./src/storage/constants.js");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var initialState = null;
var ACTION_HANDLERS = (_ACTION_HANDLERS = {}, _defineProperty(_ACTION_HANDLERS, _constants.SESSION_ADD, function (state, action) {
  return action.payload;
}), _defineProperty(_ACTION_HANDLERS, _constants.CHOOSE_HOTEL, function (state, action) {
  var result = null;

  switch (state) {
    case null:
      result = state;
      break;

    default:
      result = Object.assign({}, state, { activeHotel: action.payload });
      break;
  }

  return result;
}), _ACTION_HANDLERS);

function sessionReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments[1];

  var handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}
module.exports = exports['default'];

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
exports.default = tasksReducer;

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
        acc[el.id][key + '_id'] = el.relationships[key].data.id;
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
  var action = arguments[1];

  var handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}
module.exports = exports['default'];

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

var _ACTION_HANDLERS;

exports.default = usersReducer;

var _constants = __webpack_require__(/*! ../constants */ "./src/storage/constants.js");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var initialState = null;
var ACTION_HANDLERS = (_ACTION_HANDLERS = {}, _defineProperty(_ACTION_HANDLERS, _constants.USERS_LOAD, function (state, action) {
  return Object.assign({}, state || {}, action.payload.reduce(function (acc, el) {
    acc[el.id] = el.attributes;
    return acc;
  }, {}));
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
  var action = arguments[1];

  var handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}
module.exports = exports['default'];

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

var _ACTION_HANDLERS;

exports.default = whiteLabelDomainsReducer;

var _constants = __webpack_require__(/*! ../constants */ "./src/storage/constants.js");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var initialState = null;
var ACTION_HANDLERS = (_ACTION_HANDLERS = {}, _defineProperty(_ACTION_HANDLERS, _constants.WHITE_LABEL_DOMAINS_LOAD, function (state, action) {
  return Object.assign({}, state || {}, action.payload.reduce(function (acc, el) {
    acc[el.id] = el.attributes;
    if (el.relationships) {
      Object.keys(el.relationships).forEach(function (key) {
        acc[el.id][key + '_id'] = el.relationships[key].data.id;
      });
    }
    return acc;
  }, {}));
}), _defineProperty(_ACTION_HANDLERS, _constants.WHITE_LABEL_DOMAINS_ADD, function (state, action) {
  var item = {};

  item[action.payload.id] = action.payload.attributes;
  if (action.payload.relationships) {
    Object.keys(action.payload.relationships).forEach(function (key) {
      item[action.payload.id][key + '_id'] = action.payload.relationships[key].data.id;
    });
  }
  return Object.assign({}, state || {}, item);
}), _defineProperty(_ACTION_HANDLERS, _constants.WHITE_LABEL_DOMAINS_DROP, function (state, action) {
  delete state[action.payload.id];
  return Object.assign({}, state || {}, {});
}), _ACTION_HANDLERS);

function whiteLabelDomainsReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments[1];

  var handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}
module.exports = exports['default'];

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

var _ACTION_HANDLERS;

exports.default = whiteLabelEmailSettingsReducer;

var _constants = __webpack_require__(/*! ../constants */ "./src/storage/constants.js");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var initialState = null;
var ACTION_HANDLERS = (_ACTION_HANDLERS = {}, _defineProperty(_ACTION_HANDLERS, _constants.WHITE_LABEL_EMAIL_SETTINGS_LOAD, function (state, action) {
  return Object.assign({}, state || {}, action.payload.reduce(function (acc, el) {
    acc[el.id] = el.attributes;
    if (el.relationships) {
      Object.keys(el.relationships).forEach(function (key) {
        acc[el.id][key + '_id'] = el.relationships[key].data.id;
      });
    }
    return acc;
  }, {}));
}), _defineProperty(_ACTION_HANDLERS, _constants.WHITE_LABEL_EMAIL_SETTINGS_ADD, function (state, action) {
  var item = {};

  item[action.payload.id] = action.payload.attributes;
  if (action.payload.relationships) {
    Object.keys(action.payload.relationships).forEach(function (key) {
      item[action.payload.id][key + '_id'] = action.payload.relationships[key].data.id;
    });
  }
  return Object.assign({}, state || {}, item);
}), _defineProperty(_ACTION_HANDLERS, _constants.WHITE_LABEL_EMAIL_SETTINGS_DROP, function (state, action) {
  delete state[action.payload.id];
  return Object.assign({}, state || {}, {});
}), _ACTION_HANDLERS);

function whiteLabelEmailSettingsReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments[1];

  var handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}
module.exports = exports['default'];

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

var _ACTION_HANDLERS;

exports.default = whiteLabelPartnersReducer;

var _constants = __webpack_require__(/*! ../constants */ "./src/storage/constants.js");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var initialState = null;
var ACTION_HANDLERS = (_ACTION_HANDLERS = {}, _defineProperty(_ACTION_HANDLERS, _constants.WHITE_LABEL_PARTNERS_LOAD, function (state, action) {
  return Object.assign({}, state || {}, action.payload.reduce(function (acc, el) {
    acc[el.id] = el.attributes;
    if (el.relationships) {
      Object.keys(el.relationships).forEach(function (key) {
        acc[el.id][key + '_id'] = el.relationships[key].data.id;
      });
    }
    return acc;
  }, {}));
}), _defineProperty(_ACTION_HANDLERS, _constants.WHITE_LABEL_PARTNERS_ADD, function (state, action) {
  var item = {};

  item[action.payload.id] = action.payload.attributes;
  if (action.payload.relationships) {
    Object.keys(action.payload.relationships).forEach(function (key) {
      item[action.payload.id][key + '_id'] = action.payload.relationships[key].data.id;
    });
  }
  return Object.assign({}, state || {}, item);
}), _defineProperty(_ACTION_HANDLERS, _constants.WHITE_LABEL_PARTNERS_DROP, function (state, action) {
  delete state[action.payload.id];
  return Object.assign({}, state || {}, {});
}), _ACTION_HANDLERS);

function whiteLabelPartnersReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments[1];

  var handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}
module.exports = exports['default'];

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

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _stringify_arguments = __webpack_require__(/*! ../utils/stringify_arguments */ "./src/utils/stringify_arguments.js");

var _stringify_arguments2 = _interopRequireDefault(_stringify_arguments);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var HTTPTransport = function () {
  function HTTPTransport(settings) {
    var token = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

    _classCallCheck(this, HTTPTransport);

    this.settings = settings;
    this.token = token || null;
  }

  _createClass(HTTPTransport, [{
    key: 'send',
    value: function send(method, endpoint, data) {
      return this['_' + method.toLowerCase()].apply(this, [endpoint, data]).then(function (response) {
        return response.json();
      }).then(this._prepareAnswer);
    }
  }, {
    key: 'registerAccessToken',
    value: function registerAccessToken(token) {
      this.token = token;
    }
  }, {
    key: '_post',
    value: function _post(endpoint, data) {
      return fetch(this._url(endpoint), {
        method: 'POST',
        headers: this._headers(),
        body: JSON.stringify(data)
      });
    }
  }, {
    key: '_put',
    value: function _put(endpoint, data) {
      return fetch(this._url(endpoint), {
        method: 'PUT',
        headers: this._headers(),
        body: JSON.stringify(data)
      });
    }
  }, {
    key: '_get',
    value: function _get(endpoint, filters) {
      return fetch(this._url(endpoint, filters), {
        method: 'GET',
        headers: this._headers()
      });
    }
  }, {
    key: '_delete',
    value: function _delete(endpoint, filters) {
      return fetch(this._url(endpoint, filters), {
        method: 'DELETE',
        headers: this._headers()
      });
    }
  }, {
    key: '_headers',
    value: function _headers() {
      var headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      };

      if (this.token) {
        headers['Authorization'] = 'Bearer ' + this.token;
      }

      return headers;
    }
  }, {
    key: '_url',
    value: function _url(endpoint) {
      var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

      return this.settings.protocol + '://' + this.settings.server + '/api/' + endpoint + (0, _stringify_arguments2.default)(params);
    }
  }, {
    key: '_prepareAnswer',
    value: function _prepareAnswer(response) {
      var answer = void 0;

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

exports.default = HTTPTransport;
module.exports = exports['default'];

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

var _http = __webpack_require__(/*! ./http */ "./src/transport/http.js");

var _http2 = _interopRequireDefault(_http);

var _ws = __webpack_require__(/*! ./ws */ "./src/transport/ws.js");

var _ws2 = _interopRequireDefault(_ws);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = { HTTPTransport: _http2.default, WSTransport: _ws2.default };
module.exports = exports['default'];

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

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _phoenixChannels = __webpack_require__(/*! phoenix-channels */ "./node_modules/phoenix-channels/src/index.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CONNECTION_ERROR_MSG = 'there was an error with the connection!';
var CONNECTION_CLOSE_MSG = 'the connection dropped';
var API_CHANNEL = 'api';
var JWT_FIELD = '__jwt';
var JOIN_SUCCESS_MSG = 'Joined successfully';
var JOIN_ERROR_MSG = 'Unable to join';
var TIMEOUT_ERROR_MSG = 'Timeout Error';

function createSocket(context) {
  var socket = new _phoenixChannels.Socket('ws://' + context.settings.server + '/socket');

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

var WSTransport = function () {
  function WSTransport(settings) {
    var token = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

    _classCallCheck(this, WSTransport);

    this.settings = settings;
    this.token = token || null;

    createSocket(this);
    connectAPIChannel(this);
  }

  _createClass(WSTransport, [{
    key: 'send',
    value: function send(method, endpoint, payload) {
      var _this = this;

      if (this.token) {
        payload[JWT_FIELD] = this.token;
      }

      return new Promise(function (resolve, reject) {
        _this.apiChannel.push(method + ':' + endpoint, payload).receive('ok', function (resp) {
          return resolve(resp);
        }).receive('error', function (resp) {
          return reject(resp);
        }).receive('timeout', function () {
          return reject(Error(TIMEOUT_ERROR_MSG));
        });
      });
    }
  }, {
    key: 'registerAccessToken',
    value: function registerAccessToken(token) {
      this.token = token;
    }
  }, {
    key: 'disconnect',
    value: function disconnect() {
      this.socket.disconnect();
    }
  }]);

  return WSTransport;
}();

exports.default = WSTransport;
module.exports = exports['default'];

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

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var prepareArgument = void 0,
    parseArgs = void 0,
    prepareKey = void 0;

prepareKey = function prepareKey(key, prefix) {
  var output = void 0;

  if (prefix === null) {
    output = key;
  } else {
    output = prefix + '[' + key + ']';
  }

  return output;
};

prepareArgument = function prepareArgument(args, key, prefix) {
  var output = void 0;

  switch (_typeof(args[key])) {
    case 'object':
      if (typeof args[key].length === 'undefined') {
        output = parseArgs(args[key], prepareKey(key, prefix));
      } else {
        output = prepareKey(key, prefix) + '=' + args[key].map(encodeURIComponent).join(',');
      }
      break;

    default:
      output = prepareKey(key, prefix) + '=' + encodeURIComponent(args[key]);
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
  var query = void 0;

  if (args && (typeof args === 'undefined' ? 'undefined' : _typeof(args)) === 'object' && typeof args.length === 'undefined') {
    var parsedArgs = parseArgs(args);

    query = parsedArgs.length > 1 ? '?' + parseArgs(args) : '';
  } else {
    query = '';
  }

  return query;
};

exports.default = stringifyArguments;
module.exports = exports['default'];

/***/ })

/******/ });
});
//# sourceMappingURL=channex-bl.js.map