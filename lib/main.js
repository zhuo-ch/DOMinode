let DOMNodeCollection = require('./dom_node_collection.js');

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
