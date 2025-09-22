import { useState, useEffect } from "react";
import { auth } from "../firebase";

export default function LoginHistory() {
  const [loginHistory, setLoginHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState({});

  const backendBaseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

  useEffect(() => {
    fetchLoginHistory();
  }, [currentPage]);

  async function fetchLoginHistory() {
    try {
      setLoading(true);
      const user = auth.currentUser;
      if (!user) {
        setError("Please login to view your login history");
        return;
      }

      const idToken = await user.getIdToken();
      const response = await fetch(`${backendBaseUrl}/api/auth/login-history?page=${currentPage}&limit=20`, {
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
      });

      const data = await response.json();
      if (data.success) {
        setLoginHistory(data.loginHistory);
        setPagination(data.pagination);
        setError("");
      } else {
        setError(data.message || "Failed to fetch login history");
      }
    } catch (e) {
      setError("Failed to fetch login history");
      console.error("Login history fetch error:", e);
    } finally {
      setLoading(false);
    }
  }

  function formatDate(dateString) {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  }

  function getLoginMethodBadge(method) {
    const badges = {
      email: "bg-blue-100 text-blue-800",
      google: "bg-red-100 text-red-800",
      session_restore: "bg-green-100 text-green-800"
    };
    
    const labels = {
      email: "Email",
      google: "Google",
      session_restore: "Session"
    };

    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${badges[method] || 'bg-gray-100 text-gray-800'}`}>
        {labels[method] || method}
      </span>
    );
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl text-gray-600">Loading login history...</div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Login History</h1>
        <p className="text-gray-600">Track all your login activities and sessions</p>
      </div>

      {error && (
        <div className="mb-6 rounded-xl border border-red-200 bg-red-50 text-red-700 px-4 py-3">
          {error}
        </div>
      )}

      {loginHistory.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-500 text-lg">No login history found</div>
        </div>
      ) : (
        <>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Date & Time</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Method</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Device</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Browser</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">OS</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">IP Address</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {loginHistory.map((login, index) => (
                    <tr key={login._id} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {formatDate(login.loginTime)}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        {getLoginMethodBadge(login.loginMethod)}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {login.deviceInfo?.device || 'Unknown'}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {login.deviceInfo?.browser || 'Unknown'}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {login.deviceInfo?.os || 'Unknown'}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600 font-mono">
                        {login.ipAddress || 'Unknown'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pagination */}
          {pagination.totalPages > 1 && (
            <div className="mt-6 flex justify-between items-center">
              <div className="text-sm text-gray-600">
                Showing page {pagination.currentPage} of {pagination.totalPages} 
                ({pagination.totalCount} total logins)
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => setCurrentPage(currentPage - 1)}
                  disabled={!pagination.hasPrev}
                  className="px-4 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                <button
                  onClick={() => setCurrentPage(currentPage + 1)}
                  disabled={!pagination.hasNext}
                  className="px-4 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </>
      )}

      <div className="mt-8 p-4 bg-blue-50 rounded-xl border border-blue-200">
        <h3 className="text-sm font-semibold text-blue-900 mb-2">About Login Tracking</h3>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• <strong>Email:</strong> Login using email and password</li>
          <li>• <strong>Google:</strong> Login using Google OAuth</li>
          <li>• <strong>Session:</strong> Automatic login from saved session (page refresh/return visits)</li>
        </ul>
      </div>
    </div>
  );
}
