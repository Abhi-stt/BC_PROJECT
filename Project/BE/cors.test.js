const axios = require('axios');

const endpoints = [
  '/api/users',
  '/api/matches',
  '/api/messages',
  '/api/timeline',
  '/api/tasks',
  '/api/budgets',
  '/api/services',
  '/api/counselors',
  '/api/sessions',
  '/api/posts',
  '/api/success-stories',
  '/api/notifications',
  '/api/cors-test',
  '/api/events',
];

const BASE_URLS = [
  'http://localhost:5000',
  'https://bc-project.onrender.com',
];

(async () => {
  for (const baseUrl of BASE_URLS) {
    console.log(`\n=== Testing base URL: ${baseUrl} ===`);
    for (const endpoint of endpoints) {
      try {
        const response = await axios.get(baseUrl + endpoint, {
          headers: {
            Origin: 'http://localhost:5173',
          },
          withCredentials: true,
          validateStatus: () => true,
        });
        console.log(`  Endpoint: ${endpoint}`);
        console.log('    Status:', response.status);
        console.log('    Access-Control-Allow-Origin:', response.headers['access-control-allow-origin']);
        console.log('    Access-Control-Allow-Credentials:', response.headers['access-control-allow-credentials']);
      } catch (error) {
        if (error.response) {
          console.error(`  Endpoint: ${endpoint}`);
          console.error('    Error Status:', error.response.status);
          console.error('    Error Data:', error.response.data);
        } else {
          console.error(`  Endpoint: ${endpoint}`);
          console.error('    Request failed:', error.message);
        }
      }
    }
  }
})(); 