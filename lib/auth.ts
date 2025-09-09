export interface AdminUser {
  _id: string;
  username: string;
  email: string;
  role: 'admin' | 'super-admin';
  isActive: boolean;
  lastLogin?: string;
}

export function getAdminToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('adminToken');
}

export function getAdminUser(): AdminUser | null {
  if (typeof window === 'undefined') return null;
  const userStr = localStorage.getItem('adminUser');
  return userStr ? JSON.parse(userStr) : null;
}

export function removeAdminAuth(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('adminToken');
  localStorage.removeItem('adminUser');
}

export function isAuthenticated(): boolean {
  return !!getAdminToken();
}

export async function makeAuthenticatedRequest(url: string, options: RequestInit = {}) {
  const token = getAdminToken();
  
  if (!token) {
    throw new Error('No authentication token found');
  }

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
    ...options.headers,
  };

  const response = await fetch(url, {
    ...options,
    headers,
  });

  if (response.status === 401) {
    // Token expired or invalid
    removeAdminAuth();
    window.location.href = '/admin/login';
    throw new Error('Authentication expired');
  }

  return response;
}