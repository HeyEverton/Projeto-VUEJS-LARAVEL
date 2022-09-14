// import Cookie from 'js-cookie'

const TOKEN_NAME = 'token'

export default {
  setToken(token) {
    localStorage.set(TOKEN_NAME, token, { expires: 30 })
  },

  getToken() {
    return localStorage.get(TOKEN_NAME)
  },

  deleteToken() {
    localStorage.remove(TOKEN_NAME)
  },
}
