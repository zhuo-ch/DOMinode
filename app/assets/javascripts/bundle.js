/******/ (function(modules) { // webpackBootstrap
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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DOMNodeCollection = function () {
  function DOMNodeCollection(array) {
    var _this = this;

    _classCallCheck(this, DOMNodeCollection);

    this.elements = array;
    this.on = this.on.bind(this);
    this.off = this.off.bind(this);
    this.elements.forEach(function (el, idx) {
      return _this[idx] = el;
    });
  }

  _createClass(DOMNodeCollection, [{
    key: "each",
    value: function each(func) {
      this.nodes.forEach(func);
    }
  }, {
    key: "html",
    value: function html(string) {
      if (typeof string === "undefined") {
        return this.elements[0].innerHTML;
      } else {
        this.elements.forEach(function (el) {
          return el.innerHTML = string;
        });
      }
    }
  }, {
    key: "empty",
    value: function empty() {
      this.each(function (el) {
        return el.innerHTML = "";
      });
    }
  }, {
    key: "append",
    value: function append() {
      var outer = "";

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      for (var i = 0; i < args.length; i++) {
        if (typeof args[i] === "string") {
          outer = args[i];
        } else if (args[i] instanceof DOMNodeCollection) {
          outer = args[i].elements[0].outerHTML;
        } else {
          outer = args[i].outerHTML;
        }

        for (var j = 0; j < this.elements.length; j++) {
          var inner = this.elements[j].innerHTML + outer;
          this.elements[j].innerHTML = inner;
        }
      }

      return this;
    }
  }, {
    key: "attr",
    value: function attr() {
      for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      if (args.length === 1) {
        if (_typeof(args[0]) === 'object') {
          for (var prop in args[0]) {
            if (prop === 'text') {
              this.elements[0].innerHTML = args[0][prop];
            } else {
              this.elements[0].setAttribute(prop, args[0][prop]);
            }
          }
        } else {
          return this.elements[0].getAttribute(args[0]);
        }
      } else if (args.length === 2) {
        return this.elements[0].setAttribute(args[0], args[1]);
      }
    }
  }, {
    key: "addClass",
    value: function addClass(name) {
      this.elements.forEach(function (el) {
        el.className = el.className + (" " + name);
      });
    }
  }, {
    key: "removeClass",
    value: function removeClass(name) {
      this.elements.forEach(function (el) {
        el.className = el.className.split(" ").filter(function (el2) {
          return el2 !== name;
        }).join(" ");
      });
    }
  }, {
    key: "children",
    value: function children() {
      var childrenArr = [];
      this.elements.forEach(function (el) {
        childrenArr.push(el.children);
      });
      return new DOMNodeCollection(childrenArr);
    }
  }, {
    key: "parent",
    value: function parent() {
      var parentsArr = [];
      this.elements.forEach(function (el) {
        if (!parentsArr.includes(el.parentNode)) {
          parentsArr.push(el.parentNode);
        }
      });
      return new DOMNodeCollection(parentsArr);
    }
  }, {
    key: "find",
    value: function find(selector) {
      var descendants = [];
      this.elements.forEach(function (el) {
        var allDesc = el.querySelectorAll(selector);
        descendants.push(all_desc);
      });
      return new DOMNodeCollection(descendants);
    }
  }, {
    key: "remove",
    value: function remove() {
      this.elements.forEach(function (el) {
        el.remove();
      });
      this.elements = [];
    }
  }, {
    key: "on",
    value: function on(type, callback) {
      this.elements.forEach(function (el) {
        el.addEventListener(type, callback);
        var eventKey = "event" + type;
        if (el[eventKey]) {
          el[eventKey] = el[eventKey].concat([callback]);
        } else {
          el[eventKey] = [callback];
        }
      });
    }
  }, {
    key: "off",
    value: function off(type) {
      this.elements.forEach(function (el) {
        var eventKey = "event" + type;
        el[eventKey].forEach(function (func) {
          return el.removeEventListener(type, func);
        });
        el.removeEventListener(type, el[eventKey]);
      });
    }
  }]);

  return DOMNodeCollection;
}();

module.exports = DOMNodeCollection;

// on (e, callback) {
//   this.elements.forEach((el) => {
//     el.addEventListener(e, callback);
//     if (this[`${e}`]) {
//       this[`${e}`] = this[`${e}`].concat([callback]);
//     } else {
//       this[`${e}`] = [callback];
//     }
//   });
// }

// attr() {
//   let all_matches = [];
//   for (let j = 0; j < this.elements.length; j++) {
//     let outer = this.elements[j].outerHTML;
//     let matches = outer.match(/(\S+)[="]/g);
//     all_matches = all_matches.concat(matches);
//   }
//   return all_matches;
// }


// /(\S+)[=]/
// /\"(\S+)\"/

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var DOMNodeCollection = __webpack_require__(0);

var documentReady = false;
var awaitingCalls = [];

var checkCall = function checkCall(func) {
  if (documentReady) {
    func();
  } else {
    awaitingCalls.push(func);
  }
};

var getNodes = function getNodes(selector) {
  var nodes = void 0;

  if (selector[0] === '<' && selector[selector.length - 1] === '>') {
    nodes = [document.createElement(selector.slice(1, selector.length - 1))];
  } else {
    nodes = document.querySelectorAll(selector);
  }

  var nodesArr = nodes.length < 1 ? [document.createElement(selector)] : Array.from(nodes);

  return new DOMNodeCollection(nodesArr);
};

var $l = function $l(arg) {
  switch (typeof arg === 'undefined' ? 'undefined' : _typeof(arg)) {
    case 'function':
      return checkCall(arg);
    case 'string':
      return getNodes(arg);
    case 'object':
      if (arg instanceof HTMLElement) {
        return new DOMNodeCollection([arg]);
      }
    default:
      break;
  }
  return new DOMNodeCollection(arg);
};

$l.extend = function (base) {
  for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  args.forEach(function (obj) {
    for (var prop in obj) {
      base[prop] = obj[prop];
    }
  });
  return base;
};

$l.ajax = function (options) {
  return new Promise(function (resolve, reject) {
    var defaultUrl = window.location.href;
    var defaults = {
      success: function success() {},
      error: function error() {},
      url: defaultUrl,
      method: 'GET',
      data: {},
      contentType: 'application/x-www-form-urlencoded; charset=UTF-8'
    };

    var request = $l.extend(defaults, options);
    request.method = request.method.toUpperCase();

    var xhr = new XMLHttpRequest();
    xhr.open(request.method, request.url, true);

    xhr.onload = function () {
      if (xhr.status === 200) {
        request.success(JSON.parse(xhr.response));
        resolve(JSON.parse(xhr.response));
      } else {
        request.error(xhr.response);
        reject({ status: xhr.status, statusText: xhr.statusText });
      }
    };

    xhr.send(JSON.stringify(request.data));
  });
};

// function evalInput(e) {
//   e.preventDefault();
//   const str = e.currentTarget.elements[0].value;
//   eval(str);
// }
//
// function preventEnter(e) {
//   if (e.key === 'Enter') {
//     e.preventDefault();
//   }
// }

// module.exports = $l;
window.$l = $l;

// document.addEventListener('DOMContentLoaded', () => {
//   // document.addEventListener('keydown', preventEnter);
//   documentReady = true;
//   awaitingCalls.forEach((call) => call());
//   const inputForm = document.getElementById('input-form');
//   inputForm.addEventListener('submit', evalInput);
//   const root = document.getElementById('root');
//   ReactDom.render(BenchBnb, root);
// })

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map