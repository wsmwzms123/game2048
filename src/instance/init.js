import initState from './init-state'
import initMove from './init-move'
import { initDom } from './init-dom'
import { query } from '../utils/dom'
export default function init (Game) {
  const proto = Game.prototype
  proto._init = function (options = {}) {
    const gm = this
    gm.options = options
    gm.el = query(options.el)
    initState(gm)
    initDom(gm, Game)
    initMove(gm, Game)
  }
  proto._clearTiles = function () {
    const { el } = this
    if (el) {
      let child = null
      while ((child = el.firstElementChild)) {
        el.removeChild(child)
      }
    }
  }
  proto._getTiles = function () {
    const { el } = this
    if (el) {
      return el.children
    }
  }
}
