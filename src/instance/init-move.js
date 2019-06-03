// import Game from './index'
import { createTileDom } from './init-dom'
const ACTIONS_MAP = {
  '37': 'left',
  '38': 'up',
  '39': 'right',
  '40': 'down'
}
export default function (gm) {
  window.addEventListener('keydown', function (e) {
    const action = ACTIONS_MAP[e.keyCode]
    console.log(action)
  }, false)
}
