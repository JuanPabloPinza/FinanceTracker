'use server';
import { cookies } from 'next/headers';
import { jwtDecode } from 'jwt-decode';

export interface User {
  userId: string;
  email: string;
  rol: string;
}

export async function getCurrentUser(): Promise<User | null> {
  const cookieStore = cookies();
  const accessToken = (await cookieStore).get('accessToken')?.value;

  if (!accessToken) return null;

  try {
    const payload = jwtDecode<User>(accessToken);
    return payload;
  } catch (error) {
    console.error('Error decodificando token:', error);
    return null;
  }
}
