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
/***/ (function(module, exports) {

class DOMNodeCollection {
  constructor(array) {
    this.elements = array;
    this.on = this.on.bind(this);
    this.off = this.off.bind(this);
  }

  html(string) {
    if (typeof string === "undefined") {
      return this.elements[0].innerHTML;
    } else {
      this.elements.forEach((el) => el.innerHTML = string);
    }
  }

  empty(){
    this.elements.forEach((el) => el.innerHTML = "");
  }

  append(...args) {
    let outer = "";

    for (let i = 0; i < args.length; i++) {
      if (typeof args[i] === "string") {
        outer = args[i];
      } else {
        outer = args[i].outerHTML;
      }
      for (let j = 0; j < this.elements.length; j++) {
        const inner = this.elements[j].innerHTML + outer;
        this.elements[j].innerHTML = inner;
      }
    }
  }

    attr(...args) {
      if (args.length === 1) {
        return this.elements[0].getAttribute(args[0]);
      } else if (args.length === 2){
        return this.elements[0].setAttribute(args[0], args[1]);
      }
    }

    addClass(name) {
      this.elements.forEach((el) => {
        el.className = el.className + ` ${name}`;
      });
    }

    removeClass(name) {
      this.elements.forEach((el) => {
        el.className = el.className.split(" ").filter((el2) => el2 !== name).join(" ");
      });
    }

    children() {
      let children_arr = [];
        this.elements.forEach((el) => {
          children_arr.push(el.children);
        });
      return new DOMNodeCollection(children_arr);
    }

    parent() {
      let parents_arr = [];
        this.elements.forEach((el) => {
          if (!(parents_arr.includes(el.parentNode))) {
            parents_arr.push(el.parentNode);
          }
        });
      return new DOMNodeCollection(parents_arr);
    }

    find(selector) {
      let descendants = [];
      this.elements.forEach((el) => {
        let all_desc = el.querySelectorAll(selector);
        descendants.push(all_desc);
      });
      return new DOMNodeCollection(descendants);
    }

    remove() {
      this.elements.forEach((el) => {
        el.remove();
      });
      this.elements = [];
    }

    on(type, callback) {
      this.elements.forEach((el) => {
        el.addEventListener(type, callback);
        const eventKey = `event${type}`;
        if (el[eventKey]) {
          el[eventKey] = el[eventKey].concat([callback]);
        } else {
          el[eventKey] = [callback];
        }
      });
    }

    off(type) {
      this.elements.forEach((el) => {
        const eventKey = `event${type}`
        el[eventKey].forEach((func) => el.removeEventListener(type, func))
        el.removeEventListener(type, el[eventKey]);
      });
    }

  }





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

let DOMNodeCollection = __webpack_require__(0);

let documentReady = false;
let awaitingCalls = [];

const checkCall = (func) => {
  if (documentReady) {
    func();
  } else {
    awaitingCalls.push(func);
  }
}

const $l = function (arg) {
  switch(typeof arg){
    case "function":
      return checkCall(arg);
    case "string":
      arg = document.querySelectorAll(arg);
      break ;
    default:
      break ;
  }
  return new DOMNodeCollection(arg);
};

// $l.extend = function(base, ...args) {
//   args.forEach((obj) => {
//     for (prop in obj) {
//       base[prop] = obj[prop];
//     }
//   })
//   return base;
// }

// $l.ajax = function(options) {
//   const defaultUrl = window.location.href;
//   let defaults = {
//     success: () => {},
//     error: () => {},
//     url: defaultUrl,
//     method: 'GET',
//     data: {},
//     contentType: 'application/x-www-form-urlencoded; charset=UTF-8'
//   };
//
//   let request = $l.extend(defaults, options);
//   request.method = request.method.toUpperCase();
//
//   const xhr = new XMLHttpRequest();
//   xhr.open(request.method, request.url, true);
//
//   xhr.onload = function (e) {
//     if (xhr.status === 200) {
//       request.success(xhr.response);
//     } else {
//       request.error(xhr.response);
//     }
//   }
//   debugger
//
//   xhr.send(JSON.stringify(request.data));
// }

$l.extend = (base, ...otherObjs) => {
  otherObjs.forEach( obj => {
    for(let prop in obj){
      base[prop] = obj[prop];
    }
  });
  return base;
};

$l.ajax = options => {
  const request = new XMLHttpRequest();
  const defaults = {
    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
    method: "GET",
    url: "",
    success: () => {},
    error: () => {},
    data: {},
  };
  options = $l.extend(defaults, options);
  options.method = options.method.toUpperCase();

  // if (options.method === "GET"){
  //   //data is query string for get
  //   options.url += "?" + toQueryString(options.data);
  // }

  request.open(options.method, options.url, true);
  request.onload = e => {
    //NB: Triggered when request.readyState === XMLHttpRequest.DONE ===  4
    if (request.status === 200) {
      options.success(request.response);
    } else {
      options.error(request.response);
    }
  };
debugger
  request.send(JSON.stringify(options.data));
};



window.$l = $l;

document.addEventListener('DOMContentLoaded', () => {
  documentReady = true;
  awaitingCalls.forEach((call) => call());
})


/***/ })
/******/ ]);