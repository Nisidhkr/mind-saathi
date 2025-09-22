import React, { useState, useEffect } from 'react';
import api from '../services/api';

const ConnectionTest = () => {
  const [apiStatus, setApiStatus] = useState('testing');
  const [groups, setGroups] = useState([]);
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    testConnections();
  }, []);

  const testConnections = async () => {
    console.log('🧪 Starting connection tests...');
    
    try {
      // Test API Health
      console.log('🔄 Testing API health...');
      const apiUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';
      const healthResponse = await fetch(`${apiUrl.replace('/api', '')}/api/health`);
      const healthText = await healthResponse.text();
      console.log('✅ Health check:', healthText);

      // Test Groups API
      console.log('🔄 Testing Groups API...');
      const groupsResponse = await api.get('/groups');
      console.log('✅ Groups API response:', groupsResponse.data);
      setGroups(groupsResponse.data);

      // Test Posts API
      console.log('🔄 Testing Posts API...');
      const postsResponse = await api.get('/posts');
      console.log('✅ Posts API response:', postsResponse.data);
      setPosts(postsResponse.data);

      setApiStatus('success');
      setError(null);
    } catch (err) {
      console.error('❌ Connection test failed:', err);
      setApiStatus('failed');
      setError(err.message);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">🧪 Connection Test</h1>
      
      <div className="space-y-4">
        {/* API Status */}
        <div className="p-4 border rounded-lg">
          <h2 className="text-lg font-semibold mb-2">API Status</h2>
          <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
            apiStatus === 'testing' ? 'bg-yellow-100 text-yellow-800' :
            apiStatus === 'success' ? 'bg-green-100 text-green-800' :
            'bg-red-100 text-red-800'
          }`}>
            {apiStatus === 'testing' ? '🔄 Testing...' :
             apiStatus === 'success' ? '✅ Connected' :
             '❌ Failed'}
          </div>
          {error && (
            <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded text-red-700 text-sm">
              {error}
            </div>
          )}
        </div>

        {/* Groups */}
        <div className="p-4 border rounded-lg">
          <h2 className="text-lg font-semibold mb-2">Groups ({groups.length})</h2>
          {groups.length > 0 ? (
            <ul className="space-y-1">
              {groups.map(group => (
                <li key={group._id} className="text-sm">
                  • {group.name}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 text-sm">No groups loaded</p>
          )}
        </div>

        {/* Posts */}
        <div className="p-4 border rounded-lg">
          <h2 className="text-lg font-semibold mb-2">Posts ({posts.length})</h2>
          {posts.length > 0 ? (
            <ul className="space-y-1">
              {posts.slice(0, 3).map(post => (
                <li key={post._id} className="text-sm">
                  • {post.title || 'Untitled'} by {post.nickname}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 text-sm">No posts loaded</p>
          )}
        </div>

        {/* Retry Button */}
        <button
          onClick={testConnections}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          🔄 Retry Tests
        </button>
      </div>
    </div>
  );
};

export default ConnectionTest;
