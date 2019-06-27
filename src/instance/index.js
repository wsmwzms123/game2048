import { query } from '../utils/dom'
import init from './init'
export default class Game {
  constructor () {
    this.wrap = query('.tile-container')
    this._init()
  }
}

init(Game, Game.prototype)
