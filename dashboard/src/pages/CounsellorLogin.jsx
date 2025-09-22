import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

export default function CounsellorLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      // Use MongoDB-based counsellor login
      const response = await fetch(`${API_BASE}/api/dashboard/counsellors/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Login failed. Please check your email and password.");
        return;
      }

      // Store counsellor data and token
      localStorage.setItem("counsellor", JSON.stringify(data.counsellor));
      localStorage.setItem("counsellorToken", data.token);
      localStorage.setItem(
        "user",
        JSON.stringify({ 
          id: data.counsellor.id, 
          email: data.counsellor.email, 
          name: data.counsellor.name 
        })
      );

      navigate("/counsellor-dashboard");
    } catch (e) {
      setError("Login failed. Please check your email and password.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex justify-center items-center py-16">
      <div className="w-full max-w-md bg-white border border-gray-200 rounded-3xl p-8 shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-6">Login as Counsellor</h1>
        {error && (
          <div className="mb-4 rounded-xl border border-red-200 bg-red-50 text-red-700 px-4 py-3 text-sm">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Counsellor Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-perylene-600"
              placeholder="you@college.edu"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-perylene-600"
              placeholder="••••••••"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 transition-all duration-200 disabled:opacity-60"
          >
            {loading ? "Signing in..." : "Login"}
          </button>
        </form>
        <div className="mt-6 text-center">
          <button 
            onClick={() => navigate("/")}
            className="text-sm text-gray-600 hover:text-perylene-600 transition-colors"
          >
            ← Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}
