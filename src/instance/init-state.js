import initStorage from './init-storage'
export default function (gm) {
  initStorage(gm)
  gm.gameState = gm.gameState ||
   Array.from({ length: 4 }, () => [...Array(4).fill(null)])
}
