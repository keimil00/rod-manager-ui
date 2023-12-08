export const API_ENDPOINTS = {
  // Public endpoints (do not require authentication)
  public: {
    login: '/api/login/',
    loginGoogle: '/api/login/google/',
    refreshToken: '/api/token/refresh/',
    register: '/api/register/',
    getAnnouncements: '/api/announcements/',
    getTags: '/api/announcements/tag/',
    getEvents: '/api/announcements/event/',
    getGardenOffers: '/api/garden-offers/',
    getContacts: '/api/garden-offers/contact/',
    getAvailableOffers: '/api/garden-offers/available-gardens/',
    getMinMax: '/api/garden-offers/min-max/'
  },

  mixed: {
    logout: '/api/logout/',
  },

  // Authenticated endpoints (require authentication)
  authenticated: {
    createTag: '/api/announcements/tag/', // TODO: think how to handle partly public endpoints
    createAnnouncement: '/api/announcements/',
    createGardenOffer: '/api/garden-offers/',
    getComplaints: '/api/complaints/',
    sendComplaintMessage: '/api/complaints/message/',
    createComplaint: '/api/complaints/',
    changeComplaintState: '/api/complaints/changestate/'
    // Add more authenticated endpoints as needed
  },
};
