import initStorage from './initStorage'
export default function (gm) {
  gm.gameState = gm.gameState ||
   Array.from({ length: 4 }, _ => [])
     .map(item => item.push(...Array(4).fill(null)))
  initStorage(gm)
}
