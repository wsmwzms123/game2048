const types = {}
const toString = Object.prototype.toString
const typesList = 'String Object Array Number Boolean Symbol Set Map Null Undefined'

typesList.split(/\s+/).forEach(name => {
  types['is' + name] = function (target) {
    return toString.call(target).slice(8, -1) === name
  }
})
Object.freeze(typesList)

export { types }
