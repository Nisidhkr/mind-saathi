import axios from "axios";

const API = axios.create({ 
  baseURL: "http://localhost:5000/api/mindfulness",
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add request interceptor for debugging
API.interceptors.request.use(
  (config) => {
    console.log('🔄 API Request:', config.method?.toUpperCase(), config.url);
    return config;
  },
  (error) => {
    console.error('❌ API Request Error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor for debugging
API.interceptors.response.use(
  (response) => {
    console.log('✅ API Response:', response.status, response.config.url);
    return response;
  },
  (error) => {
    console.error('❌ API Response Error:', error.response?.status, error.config?.url, error.message);
    return Promise.reject(error);
  }
);

// Mood save with full payload
export const saveMood = (payload) => API.post("/mood", payload);

// Clean up invalid data
export const cleanupMoodData = () => API.delete("/mood/cleanup");

// Get history for graph - try multiple endpoints
export const getMoodHistory = async () => {
  try {
    // First try the general mood endpoint
    const response = await API.get("/mood");
    return response;
  } catch (error) {
    console.log('🔄 Trying user-specific endpoint...');
    // If that fails, try user-specific endpoint
    const userEmail = localStorage.getItem('userEmail') || 'senpranay616@gmail.com';
    try {
      const response = await API.get(`/mood/user/${encodeURIComponent(userEmail)}`);
      return response;
    } catch (userError) {
      console.error('❌ Both endpoints failed:', error.message, userError.message);
      throw error;
    }
  }
};
