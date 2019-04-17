function createElement(tag, props, ...children) {
  const element = document.createElement(tag);

  Object.keys(props).forEach(key => element[key] = props[key]);

  children.forEach(child => {
    if (typeof child === 'string') {
      child = document.createTextNode(child);
    }

    element.appendChild(child);
  });

  return element;
}

function appendChildren(parent, ...children) {
  children.forEach(child => parent.appendChild(child));
  return parent;
}

function insertAfter(lastEl, newEl) {
  return lastEl.parentNode.insertBefore(newEl, lastEl.nextSibling);
}

class EventEmitter {
  constructor() {
    this.events = {};
  }

  on(type, listener) {
    this.events[type] = this.events[type] || [];
    this.events[type].push(listener);
  }

  emit(type, arg) {
    if (this.events[type]) {
      this.events[type].forEach(listener => listener(arg));
    }
  }
}

export { createElement, appendChildren, insertAfter, EventEmitter };
