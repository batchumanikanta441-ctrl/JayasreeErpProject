import axios from "axios";

const api = axios.create({
  baseURL: "https://jayasreeerpproject.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach JWT token to every request automatically
api.interceptors.request.use((config) => {
  try {
    const stored = localStorage.getItem("jayasree-auth");
    if (stored) {
      const parsed = JSON.parse(stored);
      const token = parsed?.state?.token;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
  } catch {
    // Silently ignore parse errors
  }
  return config;
});

// Handle 401 responses — auto logout on expired/invalid token
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear auth state and redirect to login
      try {
        localStorage.removeItem("jayasree-auth");
      } catch {
        // Ignore storage errors
      }
      // Only redirect if not already on login/register page
      if (
        !window.location.pathname.includes("/login") &&
        !window.location.pathname.includes("/register")
      ) {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default api;