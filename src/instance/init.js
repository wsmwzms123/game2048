import initState from './init-state'
import initMove from './init-move'
import { initDom } from './init-dom'
export default function init (Game) {
  Game.prototype._init = function (options) {
    const gm = this
    gm.options = options || {}
    initState(gm)
    initDom(gm, Game)
    initMove(gm)
  }
}
