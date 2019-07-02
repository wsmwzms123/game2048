import { TILES_SIZE } from '../assets/consts'
import storage from '../utils/storage'
import observer from '../utils/observer'
import { types } from '../utils/index'

function setStoreScore (score) {
  storage.set('score', score)
}

function setStoreState (state) {
  storage.set('state', types.isString(state) ? state : JSON.stringify(state))
}

function createNullState () {
  return Array.from({ length: TILES_SIZE }, () => Array(TILES_SIZE).fill(null))
}

function initState (gm) {
  observer(gm, 'score', function (newScore) {
    setStoreScore(newScore)
  })
  observer(gm, 'state', function (newState) {
    setStoreState(newState)
  })
}

export default function (gm) {
  initState(gm)
  gm.best = gm.score = storage.get('best') || 0
  gm.state = storage.get('state')
    ? JSON.parse(storage.get('state'))
    : createNullState()
  console.log(gm)
}
