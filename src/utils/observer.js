import { types } from './index'
export default function (obj, name, cb) {
  const property = Object.getOwnPropertyDescriptor(obj, name)
  const getter = property && property.get
  const setter = property && property.set
  let value = obj[name]

  Object.defineProperty(obj, name, {
    enumerable: true,
    configurable: true,
    get () {
      return getter ? getter.call(obj) : value
    },
    set (newVal) {
      if (newVal === value) return
      if (setter) {
        setter.call(obj)
      } else {
        value = newVal
        if (types.isFunction(cb)) {
          cb.call(obj, newVal)
        }
      }
    }
  })
}
