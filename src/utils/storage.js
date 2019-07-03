const storage = Object.create(null)
const handlersAlias = ['set', 'get', 'remove']

handlersAlias.forEach(method => {
  storage[method] = (...args) => {
    window.localStorage[method + 'Item'](...args)
  }
})

export default storage
