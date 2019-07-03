import initState from './init-state'
import initMove from './init-move'
import { initDom } from './init-dom'
import { query } from '../utils/dom'

export default function init (Game) {
  const proto = Game.prototype
  proto._init = function (options = {}) {
    const gm = this
    if (Game._hasInstance) {
      Game._hasInstance = false
      Game._currentInstance._clearEvents()
    }
    Game._currentInstance = gm
    Game._hasInstance = true
    gm.el = query('.tile-container')
    initState(gm)
    initDom(gm, Game)
    initMove(gm, Game)
  }
}
