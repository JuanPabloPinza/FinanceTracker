'use client';
import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { User } from './auth';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    async function checkAuth() {
      try {
        // Hacemos una petición a un endpoint protegido para verificar la autenticación
        const response = await fetch('/api/auth/me', {
          credentials: 'include',
        });

        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
        } else {
          setUser(null);
          // Si no estamos en páginas públicas, redirigimos al login
          if (!pathname.includes('/auth/login') && !pathname.includes('/public')) {
            router.push('/auth/login');
          }
        }
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    }

    checkAuth();
  }, [pathname, router]);

  return { user, loading };
}