export const API_ENDPOINTS = {
  // Public endpoints (do not require authentication)
  public: {
    login: '/api/login/',
    loginGoogle: '/api/login/google/',
    refreshToken: '/api/token/refresh/',
    register: '/api/register/',
    getAnnouncements: '/api/announcements/',
    getTags: '/api/announcements/tag/',
    getEvents: '/api/announcements/event/'
  },

  mixed: {
    logout: '/api/logout/',
  },

  // Authenticated endpoints (require authentication)
  authenticated: {
    createTag: '/api/announcements/tag/', // TODO: think how to handle partly public endpoints
    createAnnouncement: '/api/announcements/',
    // Add more authenticated endpoints as needed
  },
};
