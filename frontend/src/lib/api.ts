// API client for the Finaluchi atelier backend.
//
// Every call degrades gracefully: when VITE_API_URL is not configured (or the
// backend is unreachable) the site keeps working fully on local browser
// storage, exactly as it did before the backend existed.

import { Appointment, Order } from '../types';

const RAW_API_URL = import.meta.env.VITE_API_URL as string | undefined;
export const API_URL = (RAW_API_URL || '').replace(/\/+$/, '');
export const isApiConfigured = API_URL.length > 0;

async function request<T>(path: string, init?: RequestInit): Promise<T | null> {
  if (!isApiConfigured) return null;
  try {
    const res = await fetch(`${API_URL}${path}`, {
      headers: { 'Content-Type': 'application/json' },
      ...init,
    });
    const data = await res.json().catch(() => null);
    if (!res.ok) {
      console.warn(`[API] ${path} failed (${res.status}):`, data?.error || res.statusText);
      return null;
    }
    return data as T;
  } catch (err) {
    console.warn(`[API] ${path} unreachable:`, err);
    return null;
  }
}

/* ---------------------------- Storefront flow ---------------------------- */

export function submitOrder(order: Order): Promise<unknown> {
  return request('/api/orders', {
    method: 'POST',
    body: JSON.stringify(order),
  });
}

export function markOrderPaid(orderNumber: string, gatewayReference: string): Promise<unknown> {
  return request(`/api/orders/${encodeURIComponent(orderNumber)}/paid`, {
    method: 'POST',
    body: JSON.stringify({ gatewayReference }),
  });
}

export async function trackOrder(orderNumber: string, email: string): Promise<Order | null> {
  const data = await request<{ order: Order }>(
    `/api/orders/track?orderNumber=${encodeURIComponent(orderNumber)}&email=${encodeURIComponent(email)}`
  );
  return data?.order || null;
}

export function submitAppointment(appointment: Appointment): Promise<unknown> {
  return request('/api/appointments', {
    method: 'POST',
    body: JSON.stringify(appointment),
  });
}

export interface ContactPayload {
  name: string;
  email?: string;
  phone?: string;
  subject?: string;
  message: string;
}

export function submitContact(payload: ContactPayload): Promise<unknown> {
  return request('/api/contact', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export async function subscribeNewsletter(email: string): Promise<{ ok: boolean; alreadySubscribed?: boolean } | null> {
  return request('/api/newsletter', {
    method: 'POST',
    body: JSON.stringify({ email }),
  });
}

/* ------------------------------ Admin desk ------------------------------- */

const ADMIN_TOKEN_KEY = 'flc_admin_token';

export function getAdminToken(): string | null {
  try {
    return sessionStorage.getItem(ADMIN_TOKEN_KEY);
  } catch {
    return null;
  }
}

export function setAdminToken(token: string | null): void {
  try {
    if (token) sessionStorage.setItem(ADMIN_TOKEN_KEY, token);
    else sessionStorage.removeItem(ADMIN_TOKEN_KEY);
  } catch {
    // sessionStorage unavailable (private mode) — admin stays sessionless
  }
}

export async function adminLogin(passcode: string): Promise<string | null> {
  const data = await request<{ token: string }>('/api/admin/login', {
    method: 'POST',
    body: JSON.stringify({ passcode }),
  });
  if (data?.token) {
    setAdminToken(data.token);
    return data.token;
  }
  return null;
}

export interface AdminOverview {
  orders: Order[];
  appointments: Appointment[];
  generatedAt: string;
}

export async function adminFetchOverview(token: string): Promise<AdminOverview | null> {
  return request<AdminOverview>('/api/admin/overview', {
    headers: { Authorization: `Bearer ${token}` },
  });
}

export function adminAdvanceStage(token: string, orderNumber: string, stageIndex: number): Promise<unknown> {
  return request(`/api/admin/orders/${encodeURIComponent(orderNumber)}/stage`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
    body: JSON.stringify({ stageIndex }),
  });
}

export function adminSendDispatch(
  token: string,
  orderNumber: string,
  courierName: string,
  trackingNumber: string,
  trackingUrl?: string
): Promise<unknown> {
  return request(`/api/admin/orders/${encodeURIComponent(orderNumber)}/dispatch`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
    body: JSON.stringify({ courierName, trackingNumber, trackingUrl }),
  });
}
