class DOMNodeCollection {
  constructor(array) {
    this.elements = array;
    this.on = this.on.bind(this);
    this.off = this.off.bind(this);
    this.elements.forEach((el, idx)=> this[idx] = el);
  }

  each(func) {
    this.nodes.forEach(func);
  }

  html(string) {
    if (typeof string === "undefined") {
      return this.elements[0].innerHTML;
    } else {
      this.elements.forEach((el) => el.innerHTML = string);
    }
  }

  empty(){
    this.each((el) => el.innerHTML = "");
  }

  append(...args) {
    let outer = "";

    for (let i = 0; i < args.length; i++) {
      if (typeof args[i] === "string") {
        outer = args[i];
      } else if (args[i] instanceof DOMNodeCollection) {
        outer = args[i].elements[0].outerHTML;
      } else {
        outer = args[i].outerHTML;
      }

      for (let j = 0; j < this.elements.length; j++) {
        const inner = this.elements[j].innerHTML + outer;
        this.elements[j].innerHTML = inner;
      }
    }

    return this;
  }

    attr(...args) {
      if (args.length === 1) {
        if (typeof args[0] === 'object') {
          for (let prop in args[0]) {
            if (prop === 'text') {
              this.elements[0].innerHTML = args[0][prop];
            } else {
              this.elements[0].setAttribute(prop, args[0][prop]);
            }
          }
        } else {
          return this.elements[0].getAttribute(args[0]);
        }
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
      let childrenArr = [];
        this.elements.forEach((el) => {
          childrenArr.push(el.children);
        });

      return new DOMNodeCollection(childrenArr);
    }

    parent() {
      let parentsArr = [];
        this.elements.forEach((el) => {
          if (!(parentsArr.includes(el.parentNode))) {
            parentsArr.push(el.parentNode);
          }
        });
        
      return new DOMNodeCollection(parentsArr);
    }

    find(selector) {
      let descendants = [];
      this.elements.forEach((el) => {
        let allDesc = el.querySelectorAll(selector);
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
