const storage = window.localStorage

export function getItem(key) {
  return storage.getItem(formatKey(key))
}

export function setItem(key, value) {
  storage.setItem(formatKey(key), value)
}

export function removeItem(key) {
  storage.removeItem(formatKey(key))
}

function formatKey(key) {
  return key
}
