export interface User {
  _id: string;
  email: string;
  name: string;
  loginTimestamps: string[];
  logoutTimestamps: string[];
  createdAt: string;
  updatedAt: string;
}

export interface EmailSchedule {
  _id: string;
  email: string;
  date: string;
  description: string;
  userId: string;
  status: 'pending' | 'sent' | 'failed';
  sentAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    email: string;
    name: string;
  };
}

export interface CreateEmailData {
  email: string;
  date: string;
  description: string;
}
