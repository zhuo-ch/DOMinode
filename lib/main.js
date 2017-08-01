let DOMNodeCollection = require('./dom_node_collection.js');

let documentReady = false;
let awaitingCalls = [];

const checkCall = func => {
  if (documentReady) {
    func();
  } else {
    awaitingCalls.push(func);
  }
}

const getNodes = selector => {
  const nodes = document.querySelectorAll(selector);
  const nodesArr = Array.from(nodes);

  return new DOMNodeCollection(nodesArr);
}

const $l = arg => {
  switch(typeof arg){
    case 'function':
      return checkCall(arg);
    case 'string':
      return getNodes(arg);
    case 'object':
      if (arg instanceof HTMLElement) {
        return new DOMNodeCollection([arg]);
      }
    default:
      break ;
  }
  return new DOMNodeCollection(arg);
};

$l.extend = (base, ...args) => {
  args.forEach(obj => {
    for (var prop in obj) {
      base[prop] = obj[prop];
    }
  })
  return base;
}

$l.ajax = options => {
  return new Promise((resolve, reject) => {
    const defaultUrl = window.location.href;
    let defaults = {
      success: () => {},
      error: () => {},
      url: defaultUrl,
      method: 'GET',
      data: {},
      contentType: 'application/x-www-form-urlencoded; charset=UTF-8'
    };

    let request = $l.extend(defaults, options);
    request.method = request.method.toUpperCase();

    const xhr = new XMLHttpRequest();
    xhr.open(request.method, request.url, true);

    xhr.onload = () => {
      if (xhr.status === 200) {
        request.success(JSON.parse(xhr.response));
        resolve(JSON.parse(xhr.response));
      } else {
        request.error(xhr.response);
        reject({ status: xhr.status, statusText: xhr.statusText,});
      }
    }

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
