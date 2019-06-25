
import { addClass } from '../utils/dom'
import { types } from '../utils/index'

const TILE_CLASS = 'tile'
const TILE_INNER_CLASS = 'tile-inner'
const TILE_NUM = 4
const POSITION_CLASS_PREFIX = 'tile-position'
const TILE_NEW_CLASS = 'tile-new'
const TILE_MERGED_CLASS = 'tile-merged'
const UNIT_TILES = 4

export function createBasicTile () {
  const tile = document.createElement('div')
  const tileInner = document.createElement('div')
  addClass(tileInner, TILE_INNER_CLASS)
  addClass(tile, TILE_CLASS)
  tile.appendChild(tileInner)
  return tile
}

// 10%的概率生成4，其余为2
const getInitNum = () => !~~(Math.random() * 10) ? 4 : 2

export function createTileDom (position, ifNew, ifMerged) {
  const tile = createBasicTile()
  tile.firstElementChild.textContent = position.value
  addClass(tile, `${TILE_CLASS}-${position.value}`)
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

function getShufflePos (gm, num = TILE_NUM) {
  const { gameState } = gm
  const result = []
  const emptyTilesList = gameState
    .reduce((init, cur, i) => {
      cur.forEach((item, index) => {
        item || init.push({
          x: index + 1,
          y: i + 1,
          index: UNIT_TILES * i + index,
          sort: UNIT_TILES * index + i
        })
      })
      return init
    }, [])

  const len = emptyTilesList.length
  if (!len || len < num) return emptyTilesList
  while (result.length < num) {
    const randomIndex = Math.floor(Math.random() * emptyTilesList.length)
    const chosenPos = emptyTilesList
      .splice(randomIndex, 1).pop()
    Object.assign(chosenPos, { value: getInitNum() })
    result.push(chosenPos)
  }
  return result.sort((x, y) => {
    return x.sort - y.sort
  })
}

const createTiles = function (num) {
  const gm = this
  const { el, gameState } = gm
  const createdTilePos = getShufflePos(gm, num)
  if (!createdTilePos.length) return

  createdTilePos.forEach(pos => {
    const { x, y } = pos
    gameState[y - 1][x - 1] = pos
    const dom = createTileDom(pos, true)
    el.appendChild(dom)
  })
}
export function initDom (gm, Game) {
  const proto = Game.prototype
  proto._createTiles = createTiles
  gm._clearTiles()
  gm._createTiles()
}
