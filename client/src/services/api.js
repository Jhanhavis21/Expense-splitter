import axios from 'axios';

const API_BASE_URL = '/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authService = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
};

export const userService = {
  getProfile: () => api.get('/users/profile'),
  updateProfile: (data) => api.put('/users/profile', data),
  getAllUsers: () => api.get('/users/all'),
};

export const expenseService = {
  addExpense: (data) => api.post('/expenses/add', data),
  getExpenses: () => api.get('/expenses/all'),
  getUserExpenses: () => api.get('/expenses/my-expenses'),
  deleteExpense: (id) => api.delete(`/expenses/${id}`),
};

export const friendService = {
  addFriend: (data) => api.post('/friends/add', data),
  getFriends: () => api.get('/friends/my-friends'),
  removeFriend: (data) => api.post('/friends/remove', data),
};

export const settlementService = {
  getBalances: () => api.get('/settlements/balances'),
  settlePayment: (data) => api.post('/settlements/settle', data),
  getSettlements: () => api.get('/settlements/history'),
};

export default api;
