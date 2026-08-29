import { createServer } from 'node:http';
import { readFileSync } from 'node:fs';
import { routes } from './routes.mjs';

const server = createServer((req, res) => {
  const url = req.url.split('?')[0];
  console.log('[Mock Server] Request URL:', url);

  const route = routes.find(
    (r) =>
      (r.prefix &&
        (url === r.prefix ||
          url.startsWith(r.prefix + '/') ||
          url.startsWith(r.prefix + '?'))) ||
      (r.regex && r.regex.test(url)),
  );

  const file = route?.file;
  if (!file) {
    res.writeHead(404);
    res.end('Not Found');
    return;
  }

  const data = readFileSync(file, 'utf-8');
  res.writeHead(200, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
  res.end(data);
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Mock server is running on http://localhost:${PORT}`);
});
