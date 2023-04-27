class LocalStorageCache {
  setLocalCache(key, value) {
    if (value) {
      localStorage.setItem(key, JSON.stringify(value))
    }
  }
  getLocalCache(key) {
    const value = localStorage.getItem(key)
    if (value) {
      return JSON.parse(value)
    }
  }
  deleteLocalCache(key) {
    localStorage.removeItem(key)
  }

  clearLocal() {
    localStorage.clear()
  }
}

export default new LocalStorageCache()
