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
  let nodes;

  if (selector[0] === '<' && selector[selector.length - 1] === '>') {
    nodes = [document.createElement(selector.slice(1, selector.length - 1))];
  } else {
    nodes = document.querySelectorAll(selector);
  }

  const nodesArr = nodes.length < 1 ? [document.createElement(selector)] : Array.from(nodes);

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

window.$l = $l;
