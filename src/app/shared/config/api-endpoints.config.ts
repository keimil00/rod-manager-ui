export const API_ENDPOINTS = {
  // Public endpoints (do not require authentication)
  public: {
    login: '/api/login/',
    loginGoogle: '/api/login/google/',
    refreshToken: '/api/token/refresh/',
    register: '/api/register/',
  },

  // Authenticated endpoints (require authentication)
  authenticated: {
    logout: '/api/logout/',
    tags: '/api/announcements/tag/', // TODO: think how to handle partly public endpoints
    // Add more authenticated endpoints as needed
  },
};
