// import Game from './index'
import { flatArr, types } from '../utils'
import { on, off } from '../utils/dom'
const UNIT_TILES = 4

const getIndex = (x, y) => {
  if (types.isObject(x)) {
    x = x.x
    y = x.y
  }
  console.log(666)
  return (y - 1) * UNIT_TILES + x - 1
}
const EVENT_METHOD = 'keydown'
const ACTIONS_MAP = {
  '37': 'left',
  '38': 'up',
  '39': 'right',
  '40': 'down'
}
function getCorCategory (action) {
  if (action === 'up' || action === 'down') {
    return 'x'
  } else {
    return 'y'
  }
}

function tileMove (gm, action) {
  const children = Array.from(gm._getTiles())
  const posArr = flatArr(gm.gameState).filter(Boolean)
  const corName = getCorCategory(action)
  // console.log(children)
  // console.log(posArr)
  console.log(corName)
  const sortedArr = posArr.reduce((init, pos) => {
    const temp = init[pos[corName]] = init[pos[corName]] || []
    temp.push(pos)
    return init
  }, {})
  console.log(sortedArr)
  // switch (action) {
  //   case 'up':

  //     break

  //   default:
  //     break
  // }
}
export default function (gm, Game) {
  const proto = Game.prototype
  function keydownHandler (e) {
    const action = ACTIONS_MAP[e.keyCode]
    e.preventDefault()
    tileMove(gm, action)
  }

  on(window, EVENT_METHOD, keydownHandler)

  proto._clearEvents = function () {
    off(window, EVENT_METHOD, keydownHandler)
  }
}
