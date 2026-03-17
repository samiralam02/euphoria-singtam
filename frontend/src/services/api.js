import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor — attach JWT token if present
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("euphoriaAdminToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor — handle 401 globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("euphoriaAdminToken");
      localStorage.removeItem("euphoriaAdminInfo");
    }
    return Promise.reject(error);
  }
);

// ─── Bookings ───────────────────────────────────────────────────────────────

export const createBooking = (data) => api.post("/bookings", data);
export const getAllBookings = () => api.get("/bookings");
export const updateBookingStatus = (id, status) =>
  api.put(`/bookings/${id}`, { status });
export const deleteBooking = (id) => api.delete(`/bookings/${id}`);

// ─── Party Bookings ──────────────────────────────────────────────────────────

export const createPartyBooking = (data) => api.post("/party-bookings", data);
export const getAllPartyBookings = () => api.get("/party-bookings");
export const updatePartyBookingStatus = (id, status) =>
  api.put(`/party-bookings/${id}`, { status });
export const deletePartyBooking = (id) => api.delete(`/party-bookings/${id}`);

// ─── Admin ───────────────────────────────────────────────────────────────────

export const adminLogin = (credentials) =>
  api.post("/admin/login", credentials);
export const adminRegister = (data) => api.post("/admin/register", data);
export const getAdminProfile = () => api.get("/admin/profile");

// ─── Story ───────────────────────────────────────────────────────────────────

export const getActiveStory  = ()         => api.get("/story/active");
export const getAllStories    = ()         => api.get("/story");
export const createStory     = (data)     => api.post("/story", data);
export const deleteStory     = (id)       => api.delete(`/story/${id}`);

export default api;