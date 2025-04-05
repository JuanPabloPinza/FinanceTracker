export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

interface ApiResponse<T> {
  data?: T;
  error?: string;
}

export async function apiClient<T>(
  endpoint: string,
  options?: RequestInit
): Promise<ApiResponse<T>> {
  const url = `${API_URL}${endpoint}`;
  
  const defaultOptions: RequestInit = {
    credentials: 'include', // Importante para enviar/recibir cookies
    headers: {
      'Content-Type': 'application/json',
    },
    ...options,
  };

  try {
    const response = await fetch(url, defaultOptions);
    
    if (!response.ok) {
      // Si el error es 401, podríamos intentar refrescar el token
      if (response.status === 401) {
        // Intentamos refrescar el token solo si no estamos ya en la ruta de refresh
        if (!endpoint.includes('auth/refresh')) {
          const refreshed = await refreshToken();
          if (refreshed) {
            // Reintentar la solicitud original
            return apiClient(endpoint, options);
          }
        }
      }
      
      const errorData = await response.json();
      return { error: errorData.message || 'Ha ocurrido un error' };
    }

    const data = await response.json();
    return { data };
  } catch (error) {
    return { error: 'Error de red' };
  }
}

export async function refreshToken(): Promise<boolean> {
  try {
    const response = await fetch(`${API_URL}/auth/refresh`, {
      method: 'POST',
      credentials: 'include',
    });

    return response.ok;
  } catch {
    return false;
  }
}