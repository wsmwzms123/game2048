import { isUndef } from '../utils'
const PROPERTY_LIST = ['best', 'gameState']

function defineProperty (gm) {
  const storage = window.localStorage
  PROPERTY_LIST.forEach(prop => {
    const property = Object.getOwnPropertyDescriptor(gm, prop)
    const getter = property && property.get
    const setter = property && property.set
    let value = gm[prop]
    Object.defineProperty(gm, prop, {
      get () {
        return getter ? getter.call(gm, prop) : value
      },
      set (val) {
        if (val === value || isUndef(val)) return
        if (setter) {
          setter.call(gm, prop)
        } else {
          storage[prop] = val
          value = val
        }
      }
    })
  })
}

export default function (gm) {
  if (!window.localStorage) return
  const { gameState, best } = window.localStorage
  defineProperty(gm)
  gm.best = +best || 0
  try {
    gm.gameState = JSON.parse(gameState) || gm.gameState
  } catch (e) {}
}
