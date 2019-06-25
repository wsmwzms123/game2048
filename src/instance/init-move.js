// import Game from './index'
import { flatArr } from '../utils'
import { on, off, changeTilePosClass, getTileFromPos, getNum, doubleNum } from '../utils/dom'
const UNIT_TILES = 4
const POS_REG = /tile-position-(\d+)-(\d+)/
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

function reversePos (cor) {
  return cor === 'x' ? 'y' : 'x'
}
function initGameState (gm) {
  gm.gameState = Array.from({ length: 4 }, () => [...Array(4).fill(null)])
}
function tileToGameState (gm) {
  const tiles = gm._getTiles()
  initGameState(gm)
  Array.from(tiles).forEach(tile => {
    const cls = tile.getAttribute('class')
    cls.replace(POS_REG, (match, x, y) => {
      const indexY = y - 1
      const indexX = x - 1
      gm.gameState[indexY][indexX] = {
        x,
        y,
        index: UNIT_TILES * (indexY) + (indexX),
        value: getNum(tile),
        sort: UNIT_TILES * (indexX) + (indexY)
      }
    })
  })
  return tiles
}

function tileMove (gm, action) {
  const { el, gameState } = gm
  const posArr = flatArr(gameState).filter(Boolean)
  const corName = getCorCategory(action)
  const corNeedChange = reversePos(corName)

  const sortedObj = posArr.reduce((init, pos) => {
    const temp = init[pos[corName]] = init[pos[corName]] || []
    temp.push(pos)
    return init
  }, {})

  Object.values(sortedObj).forEach(sortedArr => {
    let flag = null
    let increment = null
    let lastTile = null
    if (action === 'up' || action === 'left') {
      flag = increment = 1
    } else {
      flag = UNIT_TILES
      increment = -1
      sortedArr.reverse()
    }
    sortedArr.forEach(pos => {
      const tempPos = { x: pos.x, y: pos.y }
      const specifiedTile = getTileFromPos(tempPos, el)
      if (tempPos[corNeedChange] !== flag) {
        tempPos[corNeedChange] = flag
      }
      flag += increment
      changeTilePosClass(specifiedTile, tempPos)
      if (lastTile && getNum(lastTile) === getNum(specifiedTile)) {
        doubleNum(lastTile)
        lastTile = null
        gm._clearTiles(specifiedTile)
        flag -= increment
      } else {
        lastTile = specifiedTile
      }
    })
  })
  tileToGameState(gm)
  gm._createTiles(1)
}

export default function (gm, Game) {
  const proto = Game.prototype

  function keydownHandler (e) {
    const action = ACTIONS_MAP[e.keyCode]
    if (!action) return
    e.preventDefault()
    tileMove(gm, action)
  }

  on(window, EVENT_METHOD, keydownHandler)

  proto._clearEvents = function () {
    off(window, EVENT_METHOD, keydownHandler)
  }
}
