
import { query, addClass, removeClass } from '../utils/dom'
import { types } from '../utils/index'

const TILE_CLASS = 'tile'
const TILE_INNER_CLASS = 'tile-inner'
const DEFAULT_TILE_NUM = 2
export function createBasicTile () {
  const tile = document.createElement('div')
  const tileInner = document.createElement('div')
  addClass(tileInner, TILE_INNER_CLASS)
  addClass(tile, TILE_CLASS)
  tile.appendChild(tileInner)
  return tile
}

export function createTileDom (num, position, ifNew, ifMerged) {
  const POSITION_CLASS_PREFIX = 'tile-position'
  const tile = createBasicTile()
  const TILE_NEW_CLASS = 'tile-new'
  const TILE_MERGED_CLASS = 'tile-merged'
  tile.querySelector(`.${TILE_INNER_CLASS}`).textContent = num
  if (!types.isString(position)) {
    position = `-${position.x || 1}-${position.y || 1}`
  }
  position = POSITION_CLASS_PREFIX + position
  if (ifNew) {
    addClass(tile, TILE_NEW_CLASS)
  }
  if (ifMerged) {
    addClass(tile, TILE_MERGED_CLASS)
  }
  addClass(tile, position)
  return tile
}

function createShufflePos (gm) {
  const { gameState } = gm
  const result = []
  const emptyTilesList = gameState
    .reduce((init, cur, i) => {
      cur.forEach((item, index) => {
        item || init.push({
          x: i + 1,
          y: index + 1
        })
      })
      return init
    }, [])
  if (emptyTilesList.length < DEFAULT_TILE_NUM) return emptyTilesList
  while (result.length < DEFAULT_TILE_NUM) {
    const randomIndex = Math.floor(Math.random() * emptyTilesList.length)
    result.push(emptyTilesList.splice(randomIndex, 1).pop())
  }
  return result
}

// 10%的概率生成4，其余为2
const getInitNum = () => !~~(Math.random() * 10) ? 4 : 2

const createTiles = (gm) => {
  const { el } = gm
  createShufflePos(gm).forEach(pos => {
    const dom = createTileDom(getInitNum(), pos, true)
    el.appendChild(dom)
  })
}
export function initDom (gm, Game) {
  // Game.prototype.createTile = function () {
  //   const gm = this
  // }
  const { options } = gm
  const { el } = options
  gm.el = query(el)
  createTiles(gm)
}
