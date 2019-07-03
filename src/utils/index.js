const types = {}
const toString = Object.prototype.toString
const typesList = 'Function String Object Array Number Boolean Symbol Set Map Null Undefined'

typesList.split(/\s+/).forEach(name => {
  types['is' + name] = function (target) {
    return toString.call(target).slice(8, -1) === name
  }
})
Object.freeze(typesList)

const isUndef = target => target == null

const flatArr = (arr) => {
  return arr.reduce((init, cur) => {
    return init.concat(Array.isArray(cur) ? flatArr(cur) : cur)
  }, [])
}

export { types, isUndef, flatArr }
