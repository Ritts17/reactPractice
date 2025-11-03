import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const subscriptionAPI = {
  getAllSubscriptions: () => api.get('/getAllSubscriptions'),
  getSubscriptionById: (id) => api.get(`/getSubscriptionById/${id}`),
  addSubscription: (subscriptionData) => api.post('/addSubscription', subscriptionData),
  updateSubscription: (id, subscriptionData) => api.put(`/updateSubscription/${id}`, subscriptionData),
  removeSubscription: (id) => api.delete(`/removeSubscription/${id}`)
};

export default api;