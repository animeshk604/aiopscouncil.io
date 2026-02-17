const API_URL = import.meta.env.VITE_API_URL || 'https://aiopscouncil.io/api';

function getToken(): string | null {
  return localStorage.getItem('aiops_token');
}

export function setToken(token: string) {
  localStorage.setItem('aiops_token', token);
}

export function clearToken() {
  localStorage.removeItem('aiops_token');
}

export function isLoggedIn(): boolean {
  return !!getToken();
}

async function request(path: string, options: RequestInit = {}) {
  const token = getToken();
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || 'Request failed');
  }

  return data;
}

// Auth
export async function register(data: {
  email: string;
  password: string;
  name: string;
  role?: string;
  company?: string;
}) {
  const result = await request('/auth/register', {
    method: 'POST',
    body: JSON.stringify(data),
  });
  setToken(result.token);
  return result;
}

export async function login(email: string, password: string) {
  const result = await request('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
  setToken(result.token);
  return result;
}

export async function getProfile() {
  return request('/auth/profile');
}

export function logout() {
  clearToken();
}

// Applications
export async function submitApplication(data: {
  name: string;
  email: string;
  role?: string;
  company?: string;
  experience: string;
  warStory: string;
}) {
  return request('/applications', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function getApplicationStatus(email: string) {
  return request(`/applications/status?email=${encodeURIComponent(email)}`);
}

// Membership
export async function getMembershipInfo() {
  return request('/membership/info');
}

export async function getMembershipStatus() {
  return request('/membership/status');
}

export async function createCheckoutSession() {
  return request('/membership/checkout', { method: 'POST' });
}

export async function createPortalSession() {
  return request('/membership/portal', { method: 'POST' });
}
