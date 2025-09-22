import axios from "axios";

// Main dashboard API (port 5000)
const API = axios.create({ 
  baseURL: import.meta.env.VITE_API_BASE_URL ? `${import.meta.env.VITE_API_BASE_URL}/api` : "http://localhost:5000/api"
});

// Mindfulness API - now unified under port 5000
const MindfulnessAPI = axios.create({ baseURL: "http://localhost:5000/api/mindfulness" });

// Mood save with full payload (mindfulness)
export const saveMood = (payload) => MindfulnessAPI.post("/mood", payload);

// Get history for graph (mindfulness) - all users
export const getMoodHistory = () => MindfulnessAPI.get("/mood");

// Get mood history for specific user by email
export const getUserMoodHistory = (email) => MindfulnessAPI.get(`/mood/user/${encodeURIComponent(email)}`);

// Get mood history for specific user by userId
export const getUserMoodHistoryById = (userId) => MindfulnessAPI.get(`/mood/user-id/${encodeURIComponent(userId)}`);

// Default export for counsellor functionality
export default API;
