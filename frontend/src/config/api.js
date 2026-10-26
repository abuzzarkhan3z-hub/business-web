// Dynamic API URL configuration
// Local dev uses http://localhost:5000
// Production on Vercel uses import.meta.env.VITE_API_URL
export const API_BASE_URL = (
  import.meta.env.VITE_API_URL || 'http://localhost:5000'
).replace(/\/$/, '');

export const API_URL = `${API_BASE_URL}/api`;
