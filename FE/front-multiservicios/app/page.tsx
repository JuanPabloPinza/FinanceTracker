import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
      <h1 className="mb-6 text-4xl font-bold text-center">Bienvenido a Mi Aplicación</h1>
      <p className="mb-8 text-lg text-center max-w-md">
        Esta es una aplicación segura con autenticación mediante tokens y cookies HTTP-only.
      </p>
      <div className="flex gap-4">
        <Link 
          href="/auth/login" 
          className="px-6 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Iniciar sesión
        </Link>
      </div>
    </div>
  );
}