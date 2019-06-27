import { TILES_SIZE } from '../assets/consts'
import storage from '../utils/storage'

function createNullState () {
  return Array.from({ length: TILES_SIZE }, () => Array(TILES_SIZE).fill(null))
}

function initStorage (gm) {

}

export default function (gm) {
  gm.best = storage.get('best') || 0
  gm.state = storage.get('state')
    ? JSON.parse(storage.get('state'))
    : createNullState()
}
