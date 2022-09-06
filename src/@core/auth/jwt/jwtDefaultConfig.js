export default {
  // Endpoints
  loginEndpoint: '/bookshelf/auth/login',
  registerEndpoint: '/bookshelf//user/create',
  refreshEndpoint: '/jwt/refresh-token',
  logoutEndpoint: '/bookshelf/auth/logout',

  // This will be prefixed in authorization header with token
  // e.g. Authorization: Bearer <token>
  tokenType: 'Bearer',

  // Value of this property will be used as key to store JWT token in storage
  storageTokenKeyName: 'token',
  storageRefreshTokenKeyName: 'refreshToken',
}
