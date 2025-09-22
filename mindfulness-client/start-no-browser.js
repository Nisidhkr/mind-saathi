const { spawn } = require('child_process');

// Set environment variables to prevent browser opening
process.env.BROWSER = 'none';
process.env.PORT = '3001';
process.env.REACT_APP_BROWSER = 'none';

console.log('🚀 Starting mindfulness client without opening browser...');

// Start react-scripts with explicit environment
const child = spawn('npx', ['react-scripts', 'start'], {
  stdio: 'inherit',
  env: {
    ...process.env,
    BROWSER: 'none',
    PORT: '3001',
    REACT_APP_BROWSER: 'none'
  }
});

child.on('close', (code) => {
  console.log(`Mindfulness client exited with code ${code}`);
});
