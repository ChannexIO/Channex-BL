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
var ActionTypes = {
  INIT: '@@redux/INIT' + Math.random().toString(36).substring(7).split('').join('.'),
  REPLACE: '@@redux/REPLACE' + Math.random().toString(36).substring(7).split('').join('.')
};

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

/**
 * @param {any} obj The object to inspect.
 * @returns {boolean} True if the argument appears to be a plain object.
 */
function isPlainObject(obj) {
  if ((typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) !== 'object' || obj === null) return false;

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
    dispatch({ type: ActionTypes.REPLACE });
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
        if ((typeof observer === 'undefined' ? 'undefined' : _typeof(observer)) !== 'object' || observer === null) {
          throw new TypeError('Expected the observer to be an object.');
        }

        function observeState() {
          if (observer.next) {
            observer.next(getState());
          }
        }

        observeState();
        var unsubscribe = outerSubscribe(observeState);
        return { unsubscribe: unsubscribe };
      }
    }, _ref[symbol_observable__WEBPACK_IMPORTED_MODULE_0__["default"]] = function () {
      return this;
    }, _ref;
  }

  // When a store is created, an "INIT" action is dispatched so that every
  // reducer returns their initial state. This effectively populates
  // the initial state tree.
  dispatch({ type: ActionTypes.INIT });

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
  var actionDescription = actionType && 'action "' + String(actionType) + '"' || 'an action';

  return 'Given ' + actionDescription + ', reducer "' + key + '" returned undefined. ' + 'To ignore an action, you must explicitly return the previous state. ' + 'If you want this reducer to hold no value, you can return null instead of undefined.';
}

function getUnexpectedStateShapeWarningMessage(inputState, reducers, action, unexpectedKeyCache) {
  var reducerKeys = Object.keys(reducers);
  var argumentName = action && action.type === ActionTypes.INIT ? 'preloadedState argument passed to createStore' : 'previous state received by the reducer';

  if (reducerKeys.length === 0) {
    return 'Store does not have a valid reducer. Make sure the argument passed ' + 'to combineReducers is an object whose values are reducers.';
  }

  if (!isPlainObject(inputState)) {
    return 'The ' + argumentName + ' has unexpected type of "' + {}.toString.call(inputState).match(/\s([a-z|A-Z]+)/)[1] + '". Expected argument to be an object with the following ' + ('keys: "' + reducerKeys.join('", "') + '"');
  }

  var unexpectedKeys = Object.keys(inputState).filter(function (key) {
    return !reducers.hasOwnProperty(key) && !unexpectedKeyCache[key];
  });

  unexpectedKeys.forEach(function (key) {
    unexpectedKeyCache[key] = true;
  });

  if (action && action.type === ActionTypes.REPLACE) return;

  if (unexpectedKeys.length > 0) {
    return 'Unexpected ' + (unexpectedKeys.length > 1 ? 'keys' : 'key') + ' ' + ('"' + unexpectedKeys.join('", "') + '" found in ' + argumentName + '. ') + 'Expected to find one of the known reducer keys instead: ' + ('"' + reducerKeys.join('", "') + '". Unexpected keys will be ignored.');
  }
}

function assertReducerShape(reducers) {
  Object.keys(reducers).forEach(function (key) {
    var reducer = reducers[key];
    var initialState = reducer(undefined, { type: ActionTypes.INIT });

    if (typeof initialState === 'undefined') {
      throw new Error('Reducer "' + key + '" returned undefined during initialization. ' + 'If the state passed to the reducer is undefined, you must ' + 'explicitly return the initial state. The initial state may ' + 'not be undefined. If you don\'t want to set a value for this reducer, ' + 'you can use null instead of undefined.');
    }

    var type = '@@redux/PROBE_UNKNOWN_ACTION_' + Math.random().toString(36).substring(7).split('').join('.');
    if (typeof reducer(undefined, { type: type }) === 'undefined') {
      throw new Error('Reducer "' + key + '" returned undefined when probed with a random type. ' + ('Don\'t try to handle ' + ActionTypes.INIT + ' or other actions in "redux/*" ') + 'namespace. They are considered private. Instead, you must return the ' + 'current state for any unknown actions, unless it is undefined, ' + 'in which case you must return the initial state, regardless of the ' + 'action type. The initial state may not be undefined, but can be null.');
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
        warning('No reducer provided for key "' + key + '"');
      }
    }

    if (typeof reducers[key] === 'function') {
      finalReducers[key] = reducers[key];
    }
  }
  var finalReducerKeys = Object.keys(finalReducers);

  var unexpectedKeyCache = void 0;
  if (true) {
    unexpectedKeyCache = {};
  }

  var shapeAssertionError = void 0;
  try {
    assertReducerShape(finalReducers);
  } catch (e) {
    shapeAssertionError = e;
  }

  return function combination() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var action = arguments[1];

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

  if ((typeof actionCreators === 'undefined' ? 'undefined' : _typeof(actionCreators)) !== 'object' || actionCreators === null) {
    throw new Error('bindActionCreators expected an object or a function, instead received ' + (actionCreators === null ? 'null' : typeof actionCreators === 'undefined' ? 'undefined' : _typeof(actionCreators)) + '. ' + 'Did you write "import ActionCreators from" instead of "import * as ActionCreators from"?');
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
  for (var _len = arguments.length, funcs = Array(_len), _key = 0; _key < _len; _key++) {
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
      return a(b.apply(undefined, arguments));
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
  for (var _len = arguments.length, middlewares = Array(_len), _key = 0; _key < _len; _key++) {
    middlewares[_key] = arguments[_key];
  }

  return function (createStore) {
    return function () {
      for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      var store = createStore.apply(undefined, args);
      var _dispatch = function dispatch() {
        throw new Error('Dispatching while constructing your middleware is not allowed. ' + 'Other middleware would not be applied to this dispatch.');
      };

      var middlewareAPI = {
        getState: store.getState,
        dispatch: function dispatch() {
          return _dispatch.apply(undefined, arguments);
        }
      };
      var chain = middlewares.map(function (middleware) {
        return middleware(middlewareAPI);
      });
      _dispatch = compose.apply(undefined, chain)(store.dispatch);

      return _extends({}, store, {
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
  warning("You are currently using minified code outside of NODE_ENV === 'production'. " + 'This means that you are running a slower development build of Redux. ' + 'You can use loose-envify (https://github.com/zertosh/loose-envify) for browserify ' + 'or DefinePlugin for webpack (http://stackoverflow.com/questions/30030031) ' + 'to ensure you have the correct code for your production build.');
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
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var ARI =
/*#__PURE__*/
function () {
  function ARI(container) {
    _classCallCheck(this, ARI);

    this.settings = container.settings;
    this.transport = container.transport;
    this.storage = container.storage;
  }

  _createClass(ARI, [{
    key: "get",
    value: function get(filters) {
      return this.transport.send('GET', 'restrictions', {
        filter: filters
      }).then(function (response) {
        return response;
      });
    }
  }]);

  return ARI;
}();

exports.default = ARI;
module.exports = exports["default"];

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
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Auth =
/*#__PURE__*/
function () {
  function Auth(container) {
    _classCallCheck(this, Auth);

    this.settings = container.settings;
    this.transport = container.transport;
    this.storage = container.storage;
  }

  _createClass(Auth, [{
    key: "signIn",
    value: function signIn(attrs) {
      var _this = this;

      return this.transport.send('POST', 'sign_in', {
        user: attrs
      }).then(function (response) {
        if (response.data.attributes.token) {
          _this.transport.registerAccessToken(response.data.attributes.token);

          _this.storage.sessionAdd(response.data.attributes);
        }

        return response;
      });
    }
  }, {
    key: "signUp",
    value: function signUp(attrs) {
      var _this2 = this;

      return this.transport.send('POST', 'sign_up', {
        user: attrs
      }).then(function (response) {
        if (response.data.attributes.token) {
          _this2.transport.registerAccessToken(response.data.attributes.token);

          _this2.storage.sessionAdd(response.data.attributes);
        }

        return response;
      });
    }
  }, {
    key: "whiteLabelSignUp",
    value: function whiteLabelSignUp(attrs) {
      var _this3 = this;

      return this.transport.send('POST', 'wl_sign_up', {
        user: attrs
      }).then(function (response) {
        if (response.data.attributes.token) {
          _this3.transport.registerAccessToken(response.data.attributes.token);

          _this3.storage.sessionAdd(response.data.attributes);
        }

        return response;
      });
    }
  }, {
    key: "requestRestorePassword",
    value: function requestRestorePassword(email) {
      return this.transport.send('POST', 'request_restore_password', {
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
      return this.transport.send('POST', 'restore_password', {
        user: attrs
      }).then(function (response) {
        return response;
      });
    }
  }, {
    key: "confirmRegistration",
    value: function confirmRegistration(token) {
      return this.transport.send('GET', "confirm_registration?token=".concat(token)).then(function (response) {
        return response;
      });
    }
  }]);

  return Auth;
}();

exports.default = Auth;
module.exports = exports["default"];

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
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Channels =
/*#__PURE__*/
function () {
  function Channels(container) {
    _classCallCheck(this, Channels);

    this.settings = container.settings;
    this.transport = container.transport;
    this.storage = container.storage;
    this.endpoint = 'channels';
  }

  _createClass(Channels, [{
    key: "list",
    value: function list() {
      var _this = this;

      var filters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return this.transport.send('GET', this.endpoint, {
        filter: filters
      }).then(function (response) {
        _this.storage.channelsLoad(response.data);

        return response.data;
      });
    }
  }, {
    key: "find",
    value: function find(id) {
      var _this2 = this;

      return this.transport.send('GET', "".concat(this.endpoint, "/").concat(id)).then(function (response) {
        _this2.storage.channelsAdd(response.data);

        return response;
      });
    }
  }, {
    key: "create",
    value: function create(attrs) {
      var _this3 = this;

      return this.transport.send('POST', this.endpoint, {
        room_type: attrs
      }).then(function (response) {
        _this3.storage.channelsAdd(response.data);

        return response;
      });
    }
  }, {
    key: "update",
    value: function update(attrs) {
      var _this4 = this;

      return this.transport.send('PUT', this.endpoint, {
        room_type: attrs
      }).then(function (response) {
        _this4.storage.channelsAdd(response.data);

        return response;
      });
    }
  }]);

  return Channels;
}();

exports.default = Channels;
module.exports = exports["default"];

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
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var CustomAvailabilityOffsets =
/*#__PURE__*/
function () {
  function CustomAvailabilityOffsets(container) {
    _classCallCheck(this, CustomAvailabilityOffsets);

    this.settings = container.settings;
    this.transport = container.transport;
    this.storage = container.storage;
    this.endpoint = 'custom_availability_offset';
  }

  _createClass(CustomAvailabilityOffsets, [{
    key: "list",
    value: function list() {
      var filters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return this.transport.send('GET', this.endpoint, {
        filter: filters
      }).then(function (response) {
        return response;
      });
    }
  }, {
    key: "create",
    value: function create(attrs) {
      return this.transport.send('POST', this.endpoint, {
        value: attrs
      }).then(function (response) {
        return response;
      });
    }
  }, {
    key: "remove",
    value: function remove() {
      var filters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return this.transport.send('DELETE', this.endpoint, {
        filter: filters
      }).then(function (response) {
        return response;
      });
    }
  }]);

  return CustomAvailabilityOffsets;
}();

exports.default = CustomAvailabilityOffsets;
module.exports = exports["default"];

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
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var CustomClosedToArrivals =
/*#__PURE__*/
function () {
  function CustomClosedToArrivals(container) {
    _classCallCheck(this, CustomClosedToArrivals);

    this.settings = container.settings;
    this.transport = container.transport;
    this.storage = container.storage;
    this.endpoint = 'custom_closed_to_arrival';
  }

  _createClass(CustomClosedToArrivals, [{
    key: "list",
    value: function list() {
      var filters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return this.transport.send('GET', this.endpoint, {
        filter: filters
      }).then(function (response) {
        return response;
      });
    }
  }, {
    key: "create",
    value: function create(attrs) {
      return this.transport.send('POST', this.endpoint, {
        value: attrs
      }).then(function (response) {
        return response;
      });
    }
  }, {
    key: "remove",
    value: function remove() {
      var filters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return this.transport.send('DELETE', this.endpoint, {
        filter: filters
      }).then(function (response) {
        return response;
      });
    }
  }]);

  return CustomClosedToArrivals;
}();

exports.default = CustomClosedToArrivals;
module.exports = exports["default"];

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
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var CustomClosedToDepartures =
/*#__PURE__*/
function () {
  function CustomClosedToDepartures(container) {
    _classCallCheck(this, CustomClosedToDepartures);

    this.settings = container.settings;
    this.transport = container.transport;
    this.storage = container.storage;
    this.endpoint = 'custom_closed_to_departure';
  }

  _createClass(CustomClosedToDepartures, [{
    key: "list",
    value: function list() {
      var filters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return this.transport.send('GET', this.endpoint, {
        filter: filters
      }).then(function (response) {
        return response;
      });
    }
  }, {
    key: "create",
    value: function create(attrs) {
      return this.transport.send('POST', this.endpoint, {
        value: attrs
      }).then(function (response) {
        return response;
      });
    }
  }, {
    key: "remove",
    value: function remove() {
      var filters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return this.transport.send('DELETE', this.endpoint, {
        filter: filters
      }).then(function (response) {
        return response;
      });
    }
  }]);

  return CustomClosedToDepartures;
}();

exports.default = CustomClosedToDepartures;
module.exports = exports["default"];

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
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var CustomDerivedOptions =
/*#__PURE__*/
function () {
  function CustomDerivedOptions(container) {
    _classCallCheck(this, CustomDerivedOptions);

    this.settings = container.settings;
    this.transport = container.transport;
    this.storage = container.storage;
    this.endpoint = 'custom_derived_option';
  }

  _createClass(CustomDerivedOptions, [{
    key: "list",
    value: function list() {
      var filters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return this.transport.send('GET', this.endpoint, {
        filter: filters
      }).then(function (response) {
        return response;
      });
    }
  }, {
    key: "create",
    value: function create(attrs) {
      return this.transport.send('POST', this.endpoint, {
        value: attrs
      }).then(function (response) {
        return response;
      });
    }
  }, {
    key: "remove",
    value: function remove() {
      var filters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return this.transport.send('DELETE', this.endpoint, {
        filter: filters
      }).then(function (response) {
        return response;
      });
    }
  }]);

  return CustomDerivedOptions;
}();

exports.default = CustomDerivedOptions;
module.exports = exports["default"];

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
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var CustomMaxAvailabilities =
/*#__PURE__*/
function () {
  function CustomMaxAvailabilities(container) {
    _classCallCheck(this, CustomMaxAvailabilities);

    this.settings = container.settings;
    this.transport = container.transport;
    this.storage = container.storage;
    this.endpoint = 'custom_max_availability';
  }

  _createClass(CustomMaxAvailabilities, [{
    key: "list",
    value: function list() {
      var filters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return this.transport.send('GET', this.endpoint, {
        filter: filters
      }).then(function (response) {
        return response;
      });
    }
  }, {
    key: "create",
    value: function create(attrs) {
      return this.transport.send('POST', this.endpoint, {
        value: attrs
      }).then(function (response) {
        return response;
      });
    }
  }, {
    key: "remove",
    value: function remove() {
      var filters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return this.transport.send('DELETE', this.endpoint, {
        filter: filters
      }).then(function (response) {
        return response;
      });
    }
  }]);

  return CustomMaxAvailabilities;
}();

exports.default = CustomMaxAvailabilities;
module.exports = exports["default"];

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
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var CustomMaxSells =
/*#__PURE__*/
function () {
  function CustomMaxSells(container) {
    _classCallCheck(this, CustomMaxSells);

    this.settings = container.settings;
    this.transport = container.transport;
    this.storage = container.storage;
    this.endpoint = 'custom_max_sell';
  }

  _createClass(CustomMaxSells, [{
    key: "list",
    value: function list() {
      var filters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return this.transport.send('GET', this.endpoint, {
        filter: filters
      }).then(function (response) {
        return response;
      });
    }
  }, {
    key: "create",
    value: function create(attrs) {
      return this.transport.send('POST', this.endpoint, {
        value: attrs
      }).then(function (response) {
        return response;
      });
    }
  }, {
    key: "remove",
    value: function remove() {
      var filters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return this.transport.send('DELETE', this.endpoint, {
        filter: filters
      }).then(function (response) {
        return response;
      });
    }
  }]);

  return CustomMaxSells;
}();

exports.default = CustomMaxSells;
module.exports = exports["default"];

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
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var CustomMaxStays =
/*#__PURE__*/
function () {
  function CustomMaxStays(container) {
    _classCallCheck(this, CustomMaxStays);

    this.settings = container.settings;
    this.transport = container.transport;
    this.storage = container.storage;
    this.endpoint = 'custom_max_stay';
  }

  _createClass(CustomMaxStays, [{
    key: "list",
    value: function list() {
      var filters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return this.transport.send('GET', this.endpoint, {
        filter: filters
      }).then(function (response) {
        return response;
      });
    }
  }, {
    key: "create",
    value: function create(attrs) {
      return this.transport.send('POST', this.endpoint, {
        value: attrs
      }).then(function (response) {
        return response;
      });
    }
  }, {
    key: "remove",
    value: function remove() {
      var filters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return this.transport.send('DELETE', this.endpoint, {
        filter: filters
      }).then(function (response) {
        return response;
      });
    }
  }]);

  return CustomMaxStays;
}();

exports.default = CustomMaxStays;
module.exports = exports["default"];

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
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var CustomMinStayArrivals =
/*#__PURE__*/
function () {
  function CustomMinStayArrivals(container) {
    _classCallCheck(this, CustomMinStayArrivals);

    this.settings = container.settings;
    this.transport = container.transport;
    this.storage = container.storage;
    this.endpoint = 'custom_min_stay_arrival';
  }

  _createClass(CustomMinStayArrivals, [{
    key: "list",
    value: function list() {
      var filters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return this.transport.send('GET', this.endpoint, {
        filter: filters
      }).then(function (response) {
        return response;
      });
    }
  }, {
    key: "create",
    value: function create(attrs) {
      return this.transport.send('POST', this.endpoint, {
        value: attrs
      }).then(function (response) {
        return response;
      });
    }
  }, {
    key: "remove",
    value: function remove() {
      var filters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return this.transport.send('DELETE', this.endpoint, {
        filter: filters
      }).then(function (response) {
        return response;
      });
    }
  }]);

  return CustomMinStayArrivals;
}();

exports.default = CustomMinStayArrivals;
module.exports = exports["default"];

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
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var CustomMinStayThroughs =
/*#__PURE__*/
function () {
  function CustomMinStayThroughs(container) {
    _classCallCheck(this, CustomMinStayThroughs);

    this.settings = container.settings;
    this.transport = container.transport;
    this.storage = container.storage;
    this.endpoint = 'custom_min_stay_through';
  }

  _createClass(CustomMinStayThroughs, [{
    key: "list",
    value: function list() {
      var filters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return this.transport.send('GET', this.endpoint, {
        filter: filters
      }).then(function (response) {
        return response;
      });
    }
  }, {
    key: "create",
    value: function create(attrs) {
      return this.transport.send('POST', this.endpoint, {
        value: attrs
      }).then(function (response) {
        return response;
      });
    }
  }, {
    key: "remove",
    value: function remove() {
      var filters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return this.transport.send('DELETE', this.endpoint, {
        filter: filters
      }).then(function (response) {
        return response;
      });
    }
  }]);

  return CustomMinStayThroughs;
}();

exports.default = CustomMinStayThroughs;
module.exports = exports["default"];

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
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var CustomRates =
/*#__PURE__*/
function () {
  function CustomRates(container) {
    _classCallCheck(this, CustomRates);

    this.settings = container.settings;
    this.transport = container.transport;
    this.storage = container.storage;
    this.endpoint = 'custom_rate';
  }

  _createClass(CustomRates, [{
    key: "list",
    value: function list() {
      var filters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return this.transport.send('GET', this.endpoint, {
        filter: filters
      }).then(function (response) {
        return response;
      });
    }
  }, {
    key: "create",
    value: function create(attrs) {
      return this.transport.send('POST', this.endpoint, {
        value: attrs
      }).then(function (response) {
        return response;
      });
    }
  }, {
    key: "remove",
    value: function remove() {
      var filters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return this.transport.send('DELETE', this.endpoint, {
        filter: filters
      }).then(function (response) {
        return response;
      });
    }
  }]);

  return CustomRates;
}();

exports.default = CustomRates;
module.exports = exports["default"];

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
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var CustomStopSells =
/*#__PURE__*/
function () {
  function CustomStopSells(container) {
    _classCallCheck(this, CustomStopSells);

    this.settings = container.settings;
    this.transport = container.transport;
    this.storage = container.storage;
    this.endpoint = 'custom_stop_sell';
  }

  _createClass(CustomStopSells, [{
    key: "list",
    value: function list() {
      var filters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return this.transport.send('GET', this.endpoint, {
        filter: filters
      }).then(function (response) {
        return response;
      });
    }
  }, {
    key: "create",
    value: function create(attrs) {
      return this.transport.send('POST', this.endpoint, {
        value: attrs
      }).then(function (response) {
        return response;
      });
    }
  }, {
    key: "remove",
    value: function remove() {
      var filters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return this.transport.send('DELETE', this.endpoint, {
        filter: filters
      }).then(function (response) {
        return response;
      });
    }
  }]);

  return CustomStopSells;
}();

exports.default = CustomStopSells;
module.exports = exports["default"];

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
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var EmailTemplates =
/*#__PURE__*/
function () {
  function EmailTemplates(container) {
    _classCallCheck(this, EmailTemplates);

    this.settings = container.settings;
    this.transport = container.transport;
    this.storage = container.storage;
    this.endpoint = 'email_templates';
  }

  _createClass(EmailTemplates, [{
    key: "list",
    value: function list() {
      var _this = this;

      var filters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return this.transport.send('GET', this.endpoint, {
        filter: filters
      }).then(function (response) {
        _this.storage.emailTemplatesLoad(response.data);

        return response.data;
      });
    }
  }, {
    key: "find",
    value: function find(id) {
      var _this2 = this;

      return this.transport.send('GET', "".concat(this.endpoint, "/").concat(id)).then(function (response) {
        _this2.storage.emailTemplatesAdd(response.data);

        return response;
      });
    }
  }, {
    key: "create",
    value: function create(attrs) {
      var _this3 = this;

      return this.transport.send('POST', this.endpoint, {
        room_type: attrs
      }).then(function (response) {
        _this3.storage.emailTemplatesAdd(response.data);

        return response;
      });
    }
  }, {
    key: "update",
    value: function update(attrs) {
      var _this4 = this;

      return this.transport.send('PUT', this.endpoint, {
        room_type: attrs
      }).then(function (response) {
        _this4.storage.emailTemplatesAdd(response.data);

        return response;
      });
    }
  }]);

  return EmailTemplates;
}();

exports.default = EmailTemplates;
module.exports = exports["default"];

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
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Hotels =
/*#__PURE__*/
function () {
  function Hotels(container) {
    _classCallCheck(this, Hotels);

    this.settings = container.settings;
    this.transport = container.transport;
    this.storage = container.storage;
    this.endpoint = 'hotels';
  }

  _createClass(Hotels, [{
    key: "list",
    value: function list() {
      var _this = this;

      var filters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return this.transport.send('GET', this.endpoint, {
        filter: filters
      }).then(function (response) {
        _this.storage.hotelsLoad(response.data);

        return response.data;
      });
    }
  }, {
    key: "find",
    value: function find(id) {
      var _this2 = this;

      return this.transport.send('GET', "".concat(this.endpoint, "/").concat(id)).then(function (response) {
        _this2.storage.hotelsAdd(response.data);

        return response;
      });
    }
  }, {
    key: "create",
    value: function create(attrs) {
      var _this3 = this;

      return this.transport.send('POST', this.endpoint).then(function (response) {
        _this3.storage.hotelsAdd(response.data);

        return response;
      });
    }
  }]);

  return Hotels;
}();

exports.default = Hotels;
module.exports = exports["default"];

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
exports.default = void 0;

var _auth = _interopRequireDefault(__webpack_require__(/*! ./auth */ "./src/collections/auth.js"));

var _hotels = _interopRequireDefault(__webpack_require__(/*! ./hotels */ "./src/collections/hotels.js"));

var _room_types = _interopRequireDefault(__webpack_require__(/*! ./room_types */ "./src/collections/room_types.js"));

var _rate_plans = _interopRequireDefault(__webpack_require__(/*! ./rate_plans */ "./src/collections/rate_plans.js"));

var _channels = _interopRequireDefault(__webpack_require__(/*! ./channels */ "./src/collections/channels.js"));

var _ari = _interopRequireDefault(__webpack_require__(/*! ./ari */ "./src/collections/ari.js"));

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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = {
  Auth: _auth.default,
  Hotels: _hotels.default,
  RoomTypes: _room_types.default,
  RatePlans: _rate_plans.default,
  Channels: _channels.default,
  ARI: _ari.default,
  CustomRates: _custom_rates.default,
  CustomMinStayArrivals: _custom_min_stay_arrivals.default,
  CustomMinStayThroughs: _custom_min_stay_throughs.default,
  CustomMaxStays: _custom_max_stays.default,
  CustomClosedToArrivals: _custom_closed_to_arrivals.default,
  CustomClosedToDepartures: _custom_closed_to_departures.default,
  CustomStopSells: _custom_stop_sells.default,
  CustomMaxSells: _custom_max_sells.default,
  CustomAvailabilityOffsets: _custom_availability_offsets.default,
  CustomMaxAvailabilities: _custom_max_availabilities.default,
  CustomDerivedOptions: _custom_derived_options.default,
  EmailTemplates: _email_templates.default,
  Users: _users.default,
  WhiteLabelPartners: _white_label_partners.default,
  WhiteLabelDomains: _white_label_domains.default,
  WhiteLabelEmailSettings: _white_label_email_settings.default
};
exports.default = _default;
module.exports = exports["default"];

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
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var RatePlans =
/*#__PURE__*/
function () {
  function RatePlans(container) {
    _classCallCheck(this, RatePlans);

    this.settings = container.settings;
    this.transport = container.transport;
    this.storage = container.storage;
    this.endpoint = 'rate_plans';
  }

  _createClass(RatePlans, [{
    key: "list",
    value: function list() {
      var _this = this;

      var filters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return this.transport.send('GET', this.endpoint, {
        filter: filters
      }).then(function (response) {
        _this.storage.ratePlansLoad(response.data);

        return response.data;
      });
    }
  }, {
    key: "find",
    value: function find(id) {
      var _this2 = this;

      return this.transport.send('GET', "".concat(this.endpoint, "/").concat(id)).then(function (response) {
        _this2.storage.ratePlansAdd(response.data);

        return response;
      });
    }
  }, {
    key: "create",
    value: function create(attrs) {
      var _this3 = this;

      return this.transport.send('POST', this.endpoint, {
        room_type: attrs
      }).then(function (response) {
        _this3.storage.ratePlansAdd(response.data);

        return response;
      });
    }
  }, {
    key: "update",
    value: function update(attrs) {
      var _this4 = this;

      return this.transport.send('PUT', this.endpoint, {
        room_type: attrs
      }).then(function (response) {
        _this4.storage.ratePlansAdd(response.data);

        return response;
      });
    }
  }]);

  return RatePlans;
}();

exports.default = RatePlans;
module.exports = exports["default"];

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
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var RoomTypes =
/*#__PURE__*/
function () {
  function RoomTypes(container) {
    _classCallCheck(this, RoomTypes);

    this.settings = container.settings;
    this.transport = container.transport;
    this.storage = container.storage;
    this.endpoint = 'room_types';
  }

  _createClass(RoomTypes, [{
    key: "list",
    value: function list() {
      var _this = this;

      var filters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return this.transport.send('GET', this.endpoint, {
        filter: filters
      }).then(function (response) {
        _this.storage.roomTypesLoad(response.data);

        return response.data;
      });
    }
  }, {
    key: "find",
    value: function find(id) {
      var _this2 = this;

      return this.transport.send('GET', "".concat(this.endpoint, "/").concat(id)).then(function (response) {
        _this2.storage.roomTypesAdd(response.data);

        return response;
      });
    }
  }, {
    key: "create",
    value: function create(attrs) {
      var _this3 = this;

      return this.transport.send('POST', this.endpoint, {
        room_type: attrs
      }).then(function (response) {
        _this3.storage.roomTypesAdd(response.data);

        return response;
      });
    }
  }, {
    key: "update",
    value: function update(attrs) {
      var _this4 = this;

      return this.transport.send('PUT', this.endpoint, {
        room_type: attrs
      }).then(function (response) {
        _this4.storage.roomTypesAdd(response.data);

        return response;
      });
    }
  }]);

  return RoomTypes;
}();

exports.default = RoomTypes;
module.exports = exports["default"];

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
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Users =
/*#__PURE__*/
function () {
  function Users(container) {
    _classCallCheck(this, Users);

    this.settings = container.settings;
    this.transport = container.transport;
    this.storage = container.storage;
    this.endpoint = 'users';
  }

  _createClass(Users, [{
    key: "list",
    value: function list() {
      var _this = this;

      var filters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return this.transport.send('GET', this.endpoint, {
        filter: filters
      }).then(function (response) {
        _this.storage.usersLoad(response.data);

        return response.data;
      });
    }
  }, {
    key: "find",
    value: function find(id) {
      var _this2 = this;

      return this.transport.send('GET', "".concat(this.endpoint, "/").concat(id)).then(function (response) {
        _this2.storage.usersAdd(response.data);

        return response;
      });
    }
  }, {
    key: "create",
    value: function create(attrs) {
      var _this3 = this;

      return this.transport.send('POST', this.endpoint, {
        room_type: attrs
      }).then(function (response) {
        _this3.storage.usersAdd(response.data);

        return response;
      });
    }
  }, {
    key: "update",
    value: function update(attrs) {
      var _this4 = this;

      return this.transport.send('PUT', this.endpoint, {
        room_type: attrs
      }).then(function (response) {
        _this4.storage.usersAdd(response.data);

        return response;
      });
    }
  }]);

  return Users;
}();

exports.default = Users;
module.exports = exports["default"];

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
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var WhiteLabelDomains =
/*#__PURE__*/
function () {
  function WhiteLabelDomains(container) {
    _classCallCheck(this, WhiteLabelDomains);

    this.settings = container.settings;
    this.transport = container.transport;
    this.storage = container.storage;
    this.endpoint = 'wl_domains';
  }

  _createClass(WhiteLabelDomains, [{
    key: "list",
    value: function list() {
      var _this = this;

      var filters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return this.transport.send('GET', this.endpoint, {
        filter: filters
      }).then(function (response) {
        _this.storage.whiteLabelDomainsLoad(response.data);

        return response.data;
      });
    }
  }, {
    key: "find",
    value: function find(id) {
      var _this2 = this;

      return this.transport.send('GET', "".concat(this.endpoint, "/").concat(id)).then(function (response) {
        _this2.storage.whiteLabelDomainsAdd(response.data);

        return response;
      });
    }
  }, {
    key: "create",
    value: function create(attrs) {
      var _this3 = this;

      return this.transport.send('POST', this.endpoint, {
        room_type: attrs
      }).then(function (response) {
        _this3.storage.whiteLabelDomainsAdd(response.data);

        return response;
      });
    }
  }, {
    key: "update",
    value: function update(attrs) {
      var _this4 = this;

      return this.transport.send('PUT', this.endpoint, {
        room_type: attrs
      }).then(function (response) {
        _this4.storage.whiteLabelDomainsAdd(response.data);

        return response;
      });
    }
  }]);

  return WhiteLabelDomains;
}();

exports.default = WhiteLabelDomains;
module.exports = exports["default"];

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
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var WhiteLabelEmailSettings =
/*#__PURE__*/
function () {
  function WhiteLabelEmailSettings(container) {
    _classCallCheck(this, WhiteLabelEmailSettings);

    this.settings = container.settings;
    this.transport = container.transport;
    this.storage = container.storage;
    this.endpoint = 'wl_email_settings';
  }

  _createClass(WhiteLabelEmailSettings, [{
    key: "list",
    value: function list() {
      var _this = this;

      var filters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return this.transport.send('GET', this.endpoint, {
        filter: filters
      }).then(function (response) {
        _this.storage.whiteLabelEmailSettingsLoad(response.data);

        return response.data;
      });
    }
  }, {
    key: "find",
    value: function find(id) {
      var _this2 = this;

      return this.transport.send('GET', "".concat(this.endpoint, "/").concat(id)).then(function (response) {
        _this2.storage.whiteLabelEmailSettingsAdd(response.data);

        return response;
      });
    }
  }, {
    key: "create",
    value: function create(attrs) {
      var _this3 = this;

      return this.transport.send('POST', this.endpoint, {
        room_type: attrs
      }).then(function (response) {
        _this3.storage.whiteLabelEmailSettingsAdd(response.data);

        return response;
      });
    }
  }, {
    key: "update",
    value: function update(attrs) {
      var _this4 = this;

      return this.transport.send('PUT', this.endpoint, {
        room_type: attrs
      }).then(function (response) {
        _this4.storage.whiteLabelEmailSettingsAdd(response.data);

        return response;
      });
    }
  }]);

  return WhiteLabelEmailSettings;
}();

exports.default = WhiteLabelEmailSettings;
module.exports = exports["default"];

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
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var WhiteLabelPartners =
/*#__PURE__*/
function () {
  function WhiteLabelPartners(container) {
    _classCallCheck(this, WhiteLabelPartners);

    this.settings = container.settings;
    this.transport = container.transport;
    this.storage = container.storage;
    this.endpoint = 'wl_partners';
  }

  _createClass(WhiteLabelPartners, [{
    key: "list",
    value: function list() {
      var _this = this;

      var filters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return this.transport.send('GET', this.endpoint, {
        filter: filters
      }).then(function (response) {
        _this.storage.whiteLabelPartnersLoad(response.data);

        return response.data;
      });
    }
  }, {
    key: "find",
    value: function find(id) {
      var _this2 = this;

      return this.transport.send('GET', "".concat(this.endpoint, "/").concat(id)).then(function (response) {
        _this2.storage.whiteLabelPartnersAdd(response.data);

        return response;
      });
    }
  }, {
    key: "create",
    value: function create(attrs) {
      var _this3 = this;

      return this.transport.send('POST', this.endpoint, {
        room_type: attrs
      }).then(function (response) {
        _this3.storage.whiteLabelPartnersAdd(response.data);

        return response;
      });
    }
  }, {
    key: "update",
    value: function update(attrs) {
      var _this4 = this;

      return this.transport.send('PUT', this.endpoint, {
        room_type: attrs
      }).then(function (response) {
        _this4.storage.whiteLabelPartnersAdd(response.data);

        return response;
      });
    }
  }]);

  return WhiteLabelPartners;
}();

exports.default = WhiteLabelPartners;
module.exports = exports["default"];

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
exports.default = void 0;

var _collections = _interopRequireDefault(__webpack_require__(/*! ./collections */ "./src/collections/index.js"));

var _http = _interopRequireDefault(__webpack_require__(/*! ./transport/http */ "./src/transport/http.js"));

var _storage = _interopRequireDefault(__webpack_require__(/*! ./storage */ "./src/storage/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var defaultOptions = {
  protocol: 'http',
  server: 'localhost:4000'
};

var ChannexBL = function ChannexBL() {
  var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  _classCallCheck(this, ChannexBL);

  this.storage = (0, _storage.default)({});
  this.settings = Object.assign(defaultOptions, opts);
  this.transport = new _http.default(this.settings, this.storage.getState().session.token);
  this.Auth = new _collections.default.Auth(this);
  this.Hotels = new _collections.default.Hotels(this);
  this.RoomTypes = new _collections.default.RoomTypes(this);
  this.RatePlans = new _collections.default.RatePlans(this);
  this.Channels = new _collections.default.Channels(this);
  this.ARI = new _collections.default.ARI(this);
  this.CustomRates = new _collections.default.CustomRates(this);
  this.CustomMinStayArrivals = new _collections.default.CustomMinStayArrivals(this);
  this.CustomMinStayThroughs = new _collections.default.CustomMinStayThroughs(this);
  this.CustomMaxStays = new _collections.default.CustomMaxStays(this);
  this.CustomClosedToArrivals = new _collections.default.CustomClosedToArrivals(this);
  this.CustomClosedToDepartures = new _collections.default.CustomClosedToDepartures(this);
  this.CustomStopSells = new _collections.default.CustomStopSells(this);
  this.CustomMaxSells = new _collections.default.CustomMaxSells(this);
  this.CustomAvailabilityOffsets = new _collections.default.CustomAvailabilityOffsets(this);
  this.CustomMaxAvailabilities = new _collections.default.CustomMaxAvailabilities(this);
  this.CustomDerivedOptions = new _collections.default.CustomDerivedOptions(this);
  this.EmailTemplates = new _collections.default.EmailTemplates(this);
  this.Users = new _collections.default.Users(this);
  this.WhiteLabelPartners = new _collections.default.WhiteLabelPartners(this);
  this.WhiteLabelDomains = new _collections.default.WhiteLabelDomains(this);
  this.WhiteLabelEmailSettings = new _collections.default.WhiteLabelEmailSettings(this);
};

exports.default = ChannexBL;
module.exports = exports["default"];

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
exports.default = void 0;

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
exports.default = _default;
module.exports = exports["default"];

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
exports.default = void 0;

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
exports.default = _default;
module.exports = exports["default"];

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
exports.default = void 0;

var _constants = __webpack_require__(/*! ../constants */ "./src/storage/constants.js");

function hotelsLoad(storage) {
  return function (hotels) {
    storage.dispatch({
      type: _constants.HOTELS_LOAD,
      payload: hotels
    });
  };
}

function hotelsAdd(storage) {
  return function (hotel) {
    storage.dispatch({
      type: _constants.HOTELS_ADD,
      payload: hotel
    });
  };
}

var _default = {
  hotelsLoad: hotelsLoad,
  hotelsAdd: hotelsAdd
};
exports.default = _default;
module.exports = exports["default"];

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
exports.default = void 0;

var _session_actions = __webpack_require__(/*! ./session_actions */ "./src/storage/actions/session_actions.js");

var _hotel_actions = __webpack_require__(/*! ./hotel_actions */ "./src/storage/actions/hotel_actions.js");

var _room_type_actions = __webpack_require__(/*! ./room_type_actions */ "./src/storage/actions/room_type_actions.js");

var _rate_plan_actions = __webpack_require__(/*! ./rate_plan_actions */ "./src/storage/actions/rate_plan_actions.js");

var _channel_actions = __webpack_require__(/*! ./channel_actions */ "./src/storage/actions/channel_actions.js");

var _email_template_actions = __webpack_require__(/*! ./email_template_actions */ "./src/storage/actions/email_template_actions.js");

var _user_actions = __webpack_require__(/*! ./user_actions */ "./src/storage/actions/user_actions.js");

var _white_label_partner_actions = __webpack_require__(/*! ./white_label_partner_actions */ "./src/storage/actions/white_label_partner_actions.js");

var _white_label_domain_actions = __webpack_require__(/*! ./white_label_domain_actions */ "./src/storage/actions/white_label_domain_actions.js");

var _white_label_email_settings_actions = __webpack_require__(/*! ./white_label_email_settings_actions */ "./src/storage/actions/white_label_email_settings_actions.js");

var _default = {
  sessionAdd: _session_actions.sessionAdd,
  hotelsLoad: _hotel_actions.hotelsLoad,
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
  whiteLabelEmailSettingsDrop: _white_label_email_settings_actions.whiteLabelEmailSettingsDrop
};
exports.default = _default;
module.exports = exports["default"];

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
exports.default = void 0;

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
exports.default = _default;
module.exports = exports["default"];

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
exports.default = void 0;

var _constants = __webpack_require__(/*! ../constants */ "./src/storage/constants.js");

function roomTypesLoad(storage) {
  return function (roomTypes) {
    storage.dispatch({
      type: _constants.ROOM_TYPES_LOAD,
      payload: roomTypes
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
exports.default = _default;
module.exports = exports["default"];

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
exports.default = void 0;

var _constants = __webpack_require__(/*! ../constants */ "./src/storage/constants.js");

function sessionAdd(storage) {
  return function (session) {
    storage.dispatch({
      type: _constants.SESSION_ADD,
      payload: session
    });
  };
}

var _default = {
  sessionAdd: sessionAdd
};
exports.default = _default;
module.exports = exports["default"];

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
exports.default = void 0;

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
exports.default = _default;
module.exports = exports["default"];

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
exports.default = void 0;

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
exports.default = _default;
module.exports = exports["default"];

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
exports.default = void 0;

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
exports.default = _default;
module.exports = exports["default"];

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
exports.default = void 0;

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
exports.default = _default;
module.exports = exports["default"];

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
exports.EMAIL_TEMPLATES_DROP = exports.EMAIL_TEMPLATES_ADD = exports.EMAIL_TEMPLATES_LOAD = exports.WHITE_LABEL_EMAIL_SETTINGS_DROP = exports.WHITE_LABEL_EMAIL_SETTINGS_ADD = exports.WHITE_LABEL_EMAIL_SETTINGS_LOAD = exports.WHITE_LABEL_DOMAINS_DROP = exports.WHITE_LABEL_DOMAINS_ADD = exports.WHITE_LABEL_DOMAINS_LOAD = exports.WHITE_LABEL_PARTNERS_DROP = exports.WHITE_LABEL_PARTNERS_ADD = exports.WHITE_LABEL_PARTNERS_LOAD = exports.USERS_DROP = exports.USERS_ADD = exports.USERS_LOAD = exports.CHANNELS_DROP = exports.CHANNELs_ADD = exports.CHANNELS_LOAD = exports.RATE_PLANS_DROP = exports.RATE_PLANS_ADD = exports.RATE_PLANS_LOAD = exports.ROOM_TYPES_DROP = exports.ROOM_TYPES_ADD = exports.ROOM_TYPES_LOAD = exports.HOTELS_DROP = exports.HOTELS_ADD = exports.HOTELS_LOAD = exports.SESSION_ADD = exports.STORAGE_CACHE_KEY = void 0;
var STORAGE_CACHE_KEY = 'CHANNEX_BL_CACHE';
exports.STORAGE_CACHE_KEY = STORAGE_CACHE_KEY;
var SESSION_ADD = 'SESSION_ADD';
exports.SESSION_ADD = SESSION_ADD;
var HOTELS_LOAD = 'HOTELS_LOAD';
exports.HOTELS_LOAD = HOTELS_LOAD;
var HOTELS_ADD = 'HOTELS_ADD';
exports.HOTELS_ADD = HOTELS_ADD;
var HOTELS_DROP = 'HOTELS_DROP';
exports.HOTELS_DROP = HOTELS_DROP;
var ROOM_TYPES_LOAD = 'ROOM_TYPES_LOAD';
exports.ROOM_TYPES_LOAD = ROOM_TYPES_LOAD;
var ROOM_TYPES_ADD = 'ROOM_TYPES_ADD';
exports.ROOM_TYPES_ADD = ROOM_TYPES_ADD;
var ROOM_TYPES_DROP = 'ROOM_TYPES_DROP';
exports.ROOM_TYPES_DROP = ROOM_TYPES_DROP;
var RATE_PLANS_LOAD = 'RATE_PLANS_LOAD';
exports.RATE_PLANS_LOAD = RATE_PLANS_LOAD;
var RATE_PLANS_ADD = 'RATE_PLANS_ADD';
exports.RATE_PLANS_ADD = RATE_PLANS_ADD;
var RATE_PLANS_DROP = 'RATE_PLANS_DROP';
exports.RATE_PLANS_DROP = RATE_PLANS_DROP;
var CHANNELS_LOAD = 'CHANNELS_LOAD';
exports.CHANNELS_LOAD = CHANNELS_LOAD;
var CHANNELs_ADD = 'CHANNELS_ADD';
exports.CHANNELs_ADD = CHANNELs_ADD;
var CHANNELS_DROP = 'CHANNELS_DROP';
exports.CHANNELS_DROP = CHANNELS_DROP;
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
exports.default = void 0;

var _redux = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");

var _local_storage_cache = _interopRequireDefault(__webpack_require__(/*! ./middlewares/local_storage_cache */ "./src/storage/middlewares/local_storage_cache.js"));

var _actions = _interopRequireDefault(__webpack_require__(/*! ./actions */ "./src/storage/actions/index.js"));

var _reducers = _interopRequireDefault(__webpack_require__(/*! ./reducers */ "./src/storage/reducers/index.js"));

var _constants = __webpack_require__(/*! ./constants */ "./src/storage/constants.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function assignActions(target) {
  Object.keys(_actions.default).forEach(function (action) {
    if (typeof target[action] === 'undefined') {
      target[action] = _actions.default[action](target);
    } else {
      throw new Error("".concat(action, " is present at storage object"));
    }
  });
  return target;
}

var Storage = function Storage(preloadedState) {
  var storage = (0, _redux.createStore)(_reducers.default, JSON.parse(localStorage.getItem(_constants.STORAGE_CACHE_KEY)) || preloadedState || {}, (0, _redux.compose)((0, _redux.applyMiddleware)(_local_storage_cache.default), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()));
  return assignActions(storage);
};

var _default = Storage;
exports.default = _default;
module.exports = exports["default"];

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
exports.default = void 0;

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

var _default = localStorageCache;
exports.default = _default;
module.exports = exports["default"];

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
exports.default = channelsReducer;

var _constants = __webpack_require__(/*! ../constants */ "./src/storage/constants.js");

var _ACTION_HANDLERS;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var initialState = null;
var ACTION_HANDLERS = (_ACTION_HANDLERS = {}, _defineProperty(_ACTION_HANDLERS, _constants.CHANNELS_LOAD, function (state, action) {
  return Object.assign({}, state || {}, action.payload.reduce(function (acc, el) {
    acc[el.id] = el.attributes;
    return acc;
  }, {}));
}), _defineProperty(_ACTION_HANDLERS, _constants.CHANNELS_ADD, function (state, action) {
  var item = {};
  item[action.payload.id] = action.payload.attributes;
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

module.exports = exports["default"];

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
exports.default = emailTemplatesReducer;

var _constants = __webpack_require__(/*! ../constants */ "./src/storage/constants.js");

var _ACTION_HANDLERS;

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

module.exports = exports["default"];

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
exports.default = hotelsReducer;

var _constants = __webpack_require__(/*! ../constants */ "./src/storage/constants.js");

var _ACTION_HANDLERS;

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

module.exports = exports["default"];

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
exports.default = void 0;

var _redux = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");

var _session_reducer = _interopRequireDefault(__webpack_require__(/*! ./session_reducer */ "./src/storage/reducers/session_reducer.js"));

var _hotels_reducer = _interopRequireDefault(__webpack_require__(/*! ./hotels_reducer */ "./src/storage/reducers/hotels_reducer.js"));

var _room_types_reducer = _interopRequireDefault(__webpack_require__(/*! ./room_types_reducer */ "./src/storage/reducers/room_types_reducer.js"));

var _rate_plans_reducer = _interopRequireDefault(__webpack_require__(/*! ./rate_plans_reducer */ "./src/storage/reducers/rate_plans_reducer.js"));

var _channels_reducer = _interopRequireDefault(__webpack_require__(/*! ./channels_reducer */ "./src/storage/reducers/channels_reducer.js"));

var _email_templates_reducer = _interopRequireDefault(__webpack_require__(/*! ./email_templates_reducer */ "./src/storage/reducers/email_templates_reducer.js"));

var _users_reducer = _interopRequireDefault(__webpack_require__(/*! ./users_reducer */ "./src/storage/reducers/users_reducer.js"));

var _white_label_partners_reducer = _interopRequireDefault(__webpack_require__(/*! ./white_label_partners_reducer */ "./src/storage/reducers/white_label_partners_reducer.js"));

var _white_label_domains_reducer = _interopRequireDefault(__webpack_require__(/*! ./white_label_domains_reducer */ "./src/storage/reducers/white_label_domains_reducer.js"));

var _white_label_email_settings_reducer = _interopRequireDefault(__webpack_require__(/*! ./white_label_email_settings_reducer */ "./src/storage/reducers/white_label_email_settings_reducer.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var rootReducer = (0, _redux.combineReducers)({
  session: _session_reducer.default,
  hotels: _hotels_reducer.default,
  roomTypes: _room_types_reducer.default,
  ratePlans: _rate_plans_reducer.default,
  channels: _channels_reducer.default,
  emailTemplates: _email_templates_reducer.default,
  users: _users_reducer.default,
  whiteLabelPartners: _white_label_partners_reducer.default,
  whiteLabelDomains: _white_label_domains_reducer.default,
  whiteLabelEmailSettings: _white_label_email_settings_reducer.default
});
var _default = rootReducer;
exports.default = _default;
module.exports = exports["default"];

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
exports.default = ratePlansReducer;

var _constants = __webpack_require__(/*! ../constants */ "./src/storage/constants.js");

var _ACTION_HANDLERS;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var initialState = null;
var ACTION_HANDLERS = (_ACTION_HANDLERS = {}, _defineProperty(_ACTION_HANDLERS, _constants.RATE_PLANS_LOAD, function (state, action) {
  return Object.assign({}, state || {}, action.payload.reduce(function (acc, el) {
    acc[el.id] = el.attributes;
    return acc;
  }, {}));
}), _defineProperty(_ACTION_HANDLERS, _constants.RATE_PLANS_ADD, function (state, action) {
  var item = {};
  item[action.payload.id] = action.payload.attributes;
  return Object.assign({}, state || {}, item);
}), _defineProperty(_ACTION_HANDLERS, _constants.RATE_PLANS_DROP, function (state, action) {
  delete state[action.payload.id];
  return Object.assign({}, state || {}, {});
}), _ACTION_HANDLERS);

function ratePlansReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments[1];
  var handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}

module.exports = exports["default"];

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
exports.default = roomTypesReducer;

var _constants = __webpack_require__(/*! ../constants */ "./src/storage/constants.js");

var _ACTION_HANDLERS;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var initialState = null;
var ACTION_HANDLERS = (_ACTION_HANDLERS = {}, _defineProperty(_ACTION_HANDLERS, _constants.ROOM_TYPES_LOAD, function (state, action) {
  return Object.assign({}, state || {}, action.payload.reduce(function (acc, el) {
    acc[el.id] = el.attributes;
    return acc;
  }, {}));
}), _defineProperty(_ACTION_HANDLERS, _constants.ROOM_TYPES_ADD, function (state, action) {
  var item = {};
  item[action.payload.id] = action.payload.attributes;
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

module.exports = exports["default"];

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
exports.default = sessionReducer;

var _constants = __webpack_require__(/*! ../constants */ "./src/storage/constants.js");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var initialState = null;

var ACTION_HANDLERS = _defineProperty({}, _constants.SESSION_ADD, function (state, action) {
  return action.payload;
});

function sessionReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments[1];
  var handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}

module.exports = exports["default"];

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
exports.default = usersReducer;

var _constants = __webpack_require__(/*! ../constants */ "./src/storage/constants.js");

var _ACTION_HANDLERS;

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

module.exports = exports["default"];

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
exports.default = whiteLabelDomainsReducer;

var _constants = __webpack_require__(/*! ../constants */ "./src/storage/constants.js");

var _ACTION_HANDLERS;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var initialState = null;
var ACTION_HANDLERS = (_ACTION_HANDLERS = {}, _defineProperty(_ACTION_HANDLERS, _constants.WHITE_LABEL_DOMAINS_LOAD, function (state, action) {
  return Object.assign({}, state || {}, action.payload.reduce(function (acc, el) {
    acc[el.id] = el.attributes;
    return acc;
  }, {}));
}), _defineProperty(_ACTION_HANDLERS, _constants.WHITE_LABEL_DOMAINS_ADD, function (state, action) {
  var item = {};
  item[action.payload.id] = action.payload.attributes;
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

module.exports = exports["default"];

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
exports.default = whiteLabelEmailSettingsReducer;

var _constants = __webpack_require__(/*! ../constants */ "./src/storage/constants.js");

var _ACTION_HANDLERS;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var initialState = null;
var ACTION_HANDLERS = (_ACTION_HANDLERS = {}, _defineProperty(_ACTION_HANDLERS, _constants.WHITE_LABEL_EMAIL_SETTINGS_LOAD, function (state, action) {
  return Object.assign({}, state || {}, action.payload.reduce(function (acc, el) {
    acc[el.id] = el.attributes;
    return acc;
  }, {}));
}), _defineProperty(_ACTION_HANDLERS, _constants.WHITE_LABEL_EMAIL_SETTINGS_ADD, function (state, action) {
  var item = {};
  item[action.payload.id] = action.payload.attributes;
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

module.exports = exports["default"];

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
exports.default = whiteLabelPartnersReducer;

var _constants = __webpack_require__(/*! ../constants */ "./src/storage/constants.js");

var _ACTION_HANDLERS;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var initialState = null;
var ACTION_HANDLERS = (_ACTION_HANDLERS = {}, _defineProperty(_ACTION_HANDLERS, _constants.WHITE_LABEL_PARTNERS_LOAD, function (state, action) {
  return Object.assign({}, state || {}, action.payload.reduce(function (acc, el) {
    acc[el.id] = el.attributes;
    return acc;
  }, {}));
}), _defineProperty(_ACTION_HANDLERS, _constants.WHITE_LABEL_PARTNERS_ADD, function (state, action) {
  var item = {};
  item[action.payload.id] = action.payload.attributes;
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

module.exports = exports["default"];

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
exports.default = void 0;

var _stringify_arguments = _interopRequireDefault(__webpack_require__(/*! ../utils/stringify_arguments */ "./src/utils/stringify_arguments.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
      return "".concat(this.settings.protocol, "://").concat(this.settings.server, "/api/").concat(endpoint).concat((0, _stringify_arguments.default)(params));
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

exports.default = HTTPTransport;
module.exports = exports["default"];

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
exports.default = void 0;

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
exports.default = _default;
module.exports = exports["default"];

/***/ })

/******/ });
});
//# sourceMappingURL=channex-bl.js.map