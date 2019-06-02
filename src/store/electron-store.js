const Store = require('electron-store')
const store = new Store()

export const setValue = (key, value) => store.set(key, value)

export const getValue = (key) => store.get(key)

export const deleteValue = (key) => store.delete(key)

export const clearValues = () => store.clear()
