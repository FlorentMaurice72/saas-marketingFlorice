/**
 * API client configuration
 * Ready for integration with backend (REST, tRPC, Supabase, etc.)
 */

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "";

/**
 * Generic fetch wrapper with error handling.
 * Replace with your preferred HTTP client (axios, ky, etc.) when ready.
 */
export async function apiClient<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;

  const res = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
    ...options,
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error(error || `HTTP error ${res.status}`);
  }

  return res.json() as Promise<T>;
}
