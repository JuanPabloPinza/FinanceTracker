import { getCurrentUser } from '../../../lib/getCurrentUser';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export default async function DashboardPage() {
  
  const user = await getCurrentUser();
  
  if (!user) {
    redirect('/auth/login');
  }
  
  return (
    <div className="container p-8 mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <Link 
          href="/auth/logout" 
          className="px-4 py-2 text-white bg-red-600 rounded-md hover:bg-red-700"
        >
          Cerrar sesión
        </Link>
      </div>
      
      <div className="p-6 bg-white rounded-lg shadow-md">
        <h2 className="mb-4 text-xl font-semibold">Información del usuario</h2>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>ID:</strong> {user.userId}</p>
        <p><strong>Rol:</strong> {user.rol}</p>
      </div>
    </div>
  );
}