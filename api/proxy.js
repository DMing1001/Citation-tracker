// Vercel Serverless Function — API Proxy
// Usage: /api/proxy?url=https://api.openalex.org/works/...

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=300');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const targetUrl = req.query.url;
  if (!targetUrl) {
    return res.status(400).json({ error: 'Missing url parameter' });
  }

  // Only allow specific API domains (security whitelist)
  const allowedDomains = [
    'api.openalex.org',
    'api.semanticscholar.org',
    'api.crossref.org'
  ];
  try {
    const parsed = new URL(targetUrl);
    if (!allowedDomains.includes(parsed.hostname)) {
      return res.status(403).json({ error: 'Domain not allowed' });
    }
  } catch(e) {
    return res.status(400).json({ error: 'Invalid URL' });
  }

  try {
    const response = await fetch(targetUrl, {
      headers: {
        'User-Agent': 'CiteGlow/1.0 (https://citeglow.com)',
        'Accept': 'application/json'
      },
      signal: AbortSignal.timeout(15000)
    });

    const data = await response.text();
    res.setHeader('Content-Type', 'application/json');
    return res.status(response.status).send(data);
  } catch(e) {
    return res.status(502).json({ error: 'Upstream request failed', message: e.message });
  }
}
