import { spawn } from 'node:child_process';
import { startServer } from './server.js';

const { server, port } = await startServer(Number(process.env.PORT || 3000));

const env = {
  ...process.env,
  PORT: String(port),
  VITE_API_URL: `http://127.0.0.1:${port}`
};

const frontend =
  process.platform === 'win32'
    ? spawn('cmd.exe', ['/d', '/s', '/c', 'npm run dev -w frontend'], {
        stdio: 'inherit',
        env
      })
    : spawn('npm', ['run', 'dev', '-w', 'frontend'], {
        stdio: 'inherit',
        env
      });

const stop = (code = 0) => {
  if (frontend && !frontend.killed) frontend.kill();
  if (server) server.close(() => process.exit(code));
  else process.exit(code);
};

frontend.on('exit', (code) => {
  if (code && code !== 0) stop(code);
});

process.on('SIGINT', () => stop(0));
process.on('SIGTERM', () => stop(0));
