import { jwtDecode } from 'jwt-decode';
import { apiClient } from './api';

export interface User {
  userId: string;
  email: string;
  rol: string;
}

export interface AuthResponse {
  message: string;
}

export async function login(email: string, password: string): Promise<AuthResponse | null> {
  const response = await apiClient<AuthResponse>('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });

  return response.data || null;
}

export async function logout(): Promise<void> {
  await apiClient('/auth/logout', { method: 'POST' });
}
