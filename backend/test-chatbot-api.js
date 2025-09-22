// Test script to verify chatbot API endpoints
const http = require('http');

function testEndpoint(path, method = 'GET') {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'localhost',
      port: 5000,
      path: path,
      method: method,
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        resolve({
          status: res.statusCode,
          data: data,
          path: path
        });
      });
    });

    req.on('error', (err) => {
      reject(err);
    });

    req.end();
  });
}

async function runTests() {
  console.log('🧪 Testing Backend API Endpoints...\n');

  const endpoints = [
    '/api/health',
    '/api/chatbot/history',
    '/api/counsellors',
    '/api/auth/login-history?page=1&limit=20'
  ];

  for (const endpoint of endpoints) {
    try {
      const result = await testEndpoint(endpoint);
      console.log(`✅ ${endpoint}: Status ${result.status}`);
      if (result.status === 200) {
        console.log(`   Response: ${result.data.substring(0, 100)}...`);
      }
    } catch (error) {
      console.log(`❌ ${endpoint}: Error - ${error.message}`);
    }
    console.log('');
  }
}

runTests();
