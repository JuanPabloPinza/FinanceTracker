'use client';
import { useAuth } from '@/lib/useAuth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRoles?: string[];
}

export default function ProtectedRoute({ children, requiredRoles = [] }: ProtectedRouteProps) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth/login');
    }

    if (!loading && user && requiredRoles.length > 0) {
      if (!requiredRoles.includes(user.rol)) {
        router.push('/unauthorized');
      }
    }
  }, [user, loading, router, requiredRoles]);

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (!user) {
    return null;
  }

  if (requiredRoles.length > 0 && !requiredRoles.includes(user.rol)) {
    return null;
  }

  return <>{children}</>;
}