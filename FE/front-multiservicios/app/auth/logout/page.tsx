'use client';
import { useEffect } from 'react';
import { logout } from '@/lib/auth';
import { useRouter } from 'next/navigation';

export default function LogoutPage() {
  const router = useRouter();

  useEffect(() => {
    async function handleLogout() {
      await logout();
      router.push('/auth/login');
      router.refresh(); // Importante para actualizar el estado del servidor
    }

    handleLogout();
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 bg-white rounded-lg shadow-md">
        <p className="text-lg">Cerrando sesión...</p>
      </div>
    </div>
  );
}