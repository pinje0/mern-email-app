import axios from 'axios';
import type { LoginCredentials, AuthResponse, EmailSchedule, CreateEmailData } from '../types';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle token expiration
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const authAPI = {
  login: (credentials: LoginCredentials) =>
    api.post<AuthResponse>('/auth/login', credentials),
  
  logout: () =>
    api.post('/auth/logout'),
  
  getCurrentUser: () =>
    api.get('/auth/me'),
  
  seedUser: () =>
    api.get('/auth/seed'),
};

export const emailAPI = {
  getAll: () =>
    api.get<EmailSchedule[]>('/emails'),
  
  getById: (id: string) =>
    api.get<EmailSchedule>(`/emails/${id}`),
  
  create: (data: CreateEmailData) =>
    api.post<{ message: string; emailSchedule: EmailSchedule }>('/emails', data),
  
  update: (id: string, data: CreateEmailData) =>
    api.put<{ message: string; emailSchedule: EmailSchedule }>(`/emails/${id}`, data),
  
  delete: (id: string) =>
    api.delete(`/emails/${id}`),
  
  send: (id: string) =>
    api.post<{ message: string; emailSchedule: EmailSchedule }>(`/emails/${id}/send`),
};

export default api;
