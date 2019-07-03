import { UNIT_TILES } from '../assets/consts'
import storage from '../utils/storage'
import observer from '../utils/observer'
import { types } from '../utils/index'

function setStoreBest (best) {
  storage.set('best', best)
}

function setStoreState (gameState) {
  storage.set('gameState', types.isString(gameState) ? gameState : JSON.stringify(gameState))
}

function createNullState () {
  return Array.from({ length: UNIT_TILES }, () => Array(UNIT_TILES).fill(null))
}

function initStorage (gm) {
  observer(gm, 'best', function (newBest) {
    setStoreBest(newBest)
  })
  observer(gm, 'gameState', function (newState) {
    setStoreState(newState)
  })
}

export default function (gm) {
  initStorage(gm)
  gm.best = gm.best = storage.get('best') || 0
  gm.gameState = storage.get('gameState')
    ? JSON.parse(storage.get('gameState'))
    : createNullState()
}
