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
