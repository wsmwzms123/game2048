import { types } from './index'
const SPACE_REG = /\s+/

const query = (el) => {
  const GAME_DEFAULT_CONTAINER = '.tile-container'
  el = types.isString(el)
    ? document.querySelector(el)
    : el
  return el || document.querySelector(GAME_DEFAULT_CONTAINER)
}

const addClass = (el, cls) => {
  if (!el || !(cls = cls.trim())) return
  const classList = el.classList
  if (classList) {
    classList.add
      .apply(classList, ~cls.indexOf(' ') ? cls.split(SPACE_REG) : [cls])
  } else {
    const curClass = ` ${el.getAttribute('class') || ''} `
    if (!~curClass.indexOf(` ${cls} `)) {
      el.setAttribute('class', curClass + cls)
    }
  }
}

const removeClass = (el, cls) => {
  if (!el || !(cls = cls.trim())) return

  const classList = el.classList
  if (classList) {
    classList.remove
      .apply(classList, ~cls.indexOf(' ') ? cls.split(SPACE_REG) : [cls])
    if (!classList.length) {
      el.removeAttribute('class')
    }
  } else {
    let curClass = el.getAttribute('class')
    if (~cls.indexOf(' ')) {
      cls.split(SPACE_REG).forEach(c => {
        if (!curClass.indexOf(c)) {
          curClass = curClass.replace(c, '')
        }
      })
    } else {
      curClass = curClass.replace(cls, '')
    }

    if ((curClass = curClass.trim())) {
      el.setAttribute('class', curClass)
    } else {
      el.removeAttribute('class')
    }
  }
}

const on = (el, eventName, cb) => {
  return el.addEventListener(eventName, cb)
}

const off = (el, eventName, cb) => {
  return el.removeEventListener(eventName, cb)
}

export { query, addClass, removeClass, on, off }
