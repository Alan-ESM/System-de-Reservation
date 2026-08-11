import http from 'node:http';
import { POST as registerPOST } from './api/register.js';
import { GET as guestsGET } from './api/guests.js';
import { GET as guestGET } from './api/guest.js';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type'
};

const toRequest = async (req, url) => {
  const body = await new Promise((resolve, reject) => {
    if (req.method === 'GET' || req.method === 'HEAD') {
      resolve(undefined);
      return;
    }

    const chunks = [];
    req.on('data', (chunk) => chunks.push(chunk));
    req.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
    req.on('error', reject);
  });

  return new Request(url, {
    method: req.method,
    headers: req.headers,
    body
  });
};

const sendResponse = async (res, response) => {
  const headers = Object.fromEntries(response.headers.entries());
  for (const [key, value] of Object.entries(corsHeaders)) {
    headers[key] = value;
  }

  const buffer = Buffer.from(await response.arrayBuffer());
  res.writeHead(response.status, headers);
  res.end(buffer);
};

const json = (data, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      ...corsHeaders
    }
  });

const createHandler = () =>
  http.createServer(async (req, res) => {
    const url = new URL(req.url, `http://${req.headers.host}`);

    if (req.method === 'OPTIONS') {
      res.writeHead(204, corsHeaders);
      res.end();
      return;
    }

    try {
      if (req.method === 'POST' && url.pathname === '/api/register') {
        await sendResponse(res, await registerPOST(await toRequest(req, url)));
        return;
      }

      if (req.method === 'GET' && url.pathname === '/api/guests') {
        await sendResponse(res, await guestsGET(await toRequest(req, url)));
        return;
      }

      if (req.method === 'GET' && url.pathname.startsWith('/api/guest/')) {
        await sendResponse(res, await guestGET(await toRequest(req, url)));
        return;
      }

      await sendResponse(res, json({ error: 'Not found' }, 404));
    } catch {
      await sendResponse(res, json({ error: 'Server error' }, 500));
    }
  });

export const startServer = async (preferredPort = Number(process.env.PORT || 3000)) => {
  let port = preferredPort;

  for (;;) {
    const server = createHandler();
    try {
      await new Promise((resolve, reject) => {
        server.once('error', reject);
        server.listen(port, resolve);
      });
      console.log(`API ready on http://127.0.0.1:${port}`);
      return { server, port };
    } catch (error) {
      if (error?.code === 'EADDRINUSE') {
        port += 1;
        continue;
      }
      throw error;
    }
  }
};

if (import.meta.url === `file://${process.argv[1].replace(/\\/g, '/')}`) {
  await startServer();
}
