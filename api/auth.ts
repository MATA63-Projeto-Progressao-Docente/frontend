export function storeAuthToken(token: string) {
  localStorage.setItem('authToken', token);
}

export function getAuthToken(): string | null {
  return localStorage.getItem('authToken');
}

export function removeAuthToken() {
  localStorage.removeItem('authToken');
}
