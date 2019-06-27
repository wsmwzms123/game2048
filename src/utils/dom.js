import { types } from './index'
const SPACE_REG = /\s+/
const POSITION_CLASS_PREFIX = 'tile-position'
const TILE_CLASS = 'tile'
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

const changeTilePosClass = (el, pos) => {
  let cls = el.getAttribute('class')
  cls = cls.replace(/(tile-position-)(\d+-\d+)/, `$1${pos.x}-${pos.y}`)
  el.setAttribute('class', cls)
}

const getTileFromPos = (pos, ctx) => {
  ctx = ctx || document
  const clsName = `.${POSITION_CLASS_PREFIX}-${pos.x || 1}-${pos.y || 1}`
  return ctx.querySelector(clsName)
}

const getNum = (el) => {
  return el.textContent
}

const doubleNum = (el, num) => {
  const target = el.querySelector('.tile-inner')
  const value = Number(getNum(el))
  target.textContent = value * 2
  removeClass(el, `${TILE_CLASS}-${value}`)
  addClass(el, `${TILE_CLASS}-${value * 2}`)
}
export { query, addClass, removeClass, on, off, changeTilePosClass, getTileFromPos, getNum, doubleNum }
