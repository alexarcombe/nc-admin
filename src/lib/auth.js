import * as Storage from "./Storage"
import * as JWT from "./JWT"

const authTokenKey = "token"

export function getToken() {
  return Storage.getItem(authTokenKey)
}

export function setToken(token) {
  Storage.setItem(authTokenKey, token)
}

export function removeToken() {
  Storage.removeItem(authTokenKey)
}

export function isAuthenticated() {
  return request(userQuery)
    .then(() => true)
    .catch(() => false)
}
