import express from 'express';
import { spawn, ChildProcess } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = Number(process.env.PORT) || 3000;
const FLASK_PORT = 5001;
const isProd = process.env.NODE_ENV === 'production';

let pythonProc: ChildProcess | null = null;

function startFlaskBackend() {
  console.log('[Server] Starting Python Flask backend on port', FLASK_PORT);
  const backendDir = path.resolve(__dirname, 'backend');
  
  pythonProc = spawn('python3', ['run.py'], {
    cwd: backendDir,
    env: {
      ...process.env,
      PORT: String(FLASK_PORT),
      PYTHONPATH: backendDir,
      FLASK_ENV: isProd ? 'production' : 'development',
    },
    stdio: 'inherit',
  });

  pythonProc.on('error', (err) => {
    console.error('[Server] Failed to start Python backend:', err.message);
  });

  pythonProc.on('exit', (code, signal) => {
    console.log(`[Server] Python backend exited with code ${code} and signal ${signal}`);
  });
}

async function startServer() {
  // Start the Python backend process
  startFlaskBackend();

  const app = express();

  // Parse JSON bodies for any direct handling
  app.use(express.json({ limit: '1mb' }));
  app.use(express.urlencoded({ extended: true, limit: '1mb' }));

  // Reverse proxy API routes to Python Flask backend
  app.all('/api/*', async (req, res) => {
    const targetUrl = `http://127.0.0.1:${FLASK_PORT}${req.originalUrl}`;
    
    try {
      const headers: Record<string, string> = {};
      for (const [key, val] of Object.entries(req.headers)) {
        if (key.toLowerCase() !== 'host' && typeof val === 'string') {
          headers[key] = val;
        }
      }

      const fetchOptions: RequestInit = {
        method: req.method,
        headers,
      };

      if (['POST', 'PUT', 'PATCH'].includes(req.method) && req.body) {
        fetchOptions.body = JSON.stringify(req.body);
        headers['content-type'] = 'application/json';
      }

      const flaskRes = await fetch(targetUrl, fetchOptions);
      
      res.status(flaskRes.status);
      flaskRes.headers.forEach((value, name) => {
        // Forward headers except transfer-encoding / content-encoding handled by express
        if (!['content-encoding', 'transfer-encoding'].includes(name.toLowerCase())) {
          res.setHeader(name, value);
        }
      });

      const responseData = await flaskRes.text();
      res.send(responseData);
    } catch (err: any) {
      console.error('[Server] Proxy error to Flask backend:', err.message);
      res.status(503).json({
        error: 'service_unavailable',
        message: 'Сервер обработки заявок временно запускается. Пожалуйста, повторите попытку через несколько секунд.',
      });
    }
  });

  if (!isProd) {
    // Development mode: attach Vite middleware
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        hmr: process.env.DISABLE_HMR !== 'true',
        watch: process.env.DISABLE_HMR === 'true' ? null : {},
      },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // Production mode: serve built assets
    const distPath = path.resolve(__dirname, 'dist');
    if (fs.existsSync(distPath)) {
      app.use(express.static(distPath));
      app.get('*', (_req, res) => {
        res.sendFile(path.resolve(distPath, 'index.html'));
      });
    }
  }

  const server = app.listen(PORT, '0.0.0.0', () => {
    console.log(`☕ «Кварта» сервер запущен на http://0.0.0.0:${PORT}`);
  });

  const cleanup = () => {
    console.log('[Server] Shutting down...');
    if (pythonProc) {
      pythonProc.kill('SIGTERM');
    }
    server.close(() => {
      process.exit(0);
    });
  };

  process.on('SIGINT', cleanup);
  process.on('SIGTERM', cleanup);
}

startServer().catch((err) => {
  console.error('[Server] Fatal startup error:', err);
  process.exit(1);
});
