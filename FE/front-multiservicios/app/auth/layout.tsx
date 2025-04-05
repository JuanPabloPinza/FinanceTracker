import React from 'react';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Mi Aplicación</h1>
          <p className="text-gray-600 mt-2">Sistema de autenticación seguro</p>
        </div>
        {children}
      </div>
    </div>
  );
}