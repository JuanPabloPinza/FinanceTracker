import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtDecode } from 'jwt-decode';

// Rutas que no requieren autenticación
const publicRoutes = ['/auth/login', '/auth/register', '/'];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Si es una ruta pública, permitir acceso
  if (publicRoutes.some(route => pathname.startsWith(route))) {
    return NextResponse.next();
  }
  
  // Verificar token de acceso
  const accessToken = request.cookies.get('accessToken')?.value;
  
  if (!accessToken) {
    // Si no hay token y está intentando acceder a una API
    if (pathname.startsWith('/api/')) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }
    // Redirigir a login para rutas normales
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }
  
  try {
    // Verificar si el token está expirado
    const payload = jwtDecode<{ exp: number }>(accessToken);
    const isExpired = payload.exp * 1000 < Date.now();
    
    if (isExpired) {
      // Intentar usar el refresh token
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`, {
        method: 'POST',
        headers: {
          Cookie: request.headers.get('cookie') || '',
        },
        credentials: 'include',
      });
      
      if (!response.ok) {
        // Si falla el refresh, redirigir a login
        if (pathname.startsWith('/api/')) {
          return NextResponse.json({ error: 'Token expirado' }, { status: 401 });
        }
        return NextResponse.redirect(new URL('/auth/login', request.url));
      }
      
      // Si el refresh fue exitoso, continuar con la solicitud
      const newResponse = NextResponse.next();
      
      // Copiar las cookies de la respuesta al cliente
      response.headers.forEach((value, key) => {
        if (key.toLowerCase() === 'set-cookie') {
          newResponse.headers.append('set-cookie', value);
        }
      });
      
      return newResponse;
    }
    
    // Token válido, continuar
    return NextResponse.next();
  } catch (error) {
    // Error al decodificar el token
    if (pathname.startsWith('/api/')) {
      return NextResponse.json({ error: 'Token inválido' }, { status: 401 });
    }
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }
}

// Configurar qué rutas deben ser procesadas por el middleware
export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|public/).*)',
  ],
};