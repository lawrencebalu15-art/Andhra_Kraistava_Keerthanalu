// Serverless counter endpoint for Vercel/Netlify functions
// This endpoint uses Upstash Redis REST API to atomically increment a counter.
// Environment variables required:
// - UPSTASH_REDIS_REST_URL (e.g. https://<id>.upstash.io)
// - UPSTASH_REST_TOKEN

export default async function handler(req, res) {
  const UPSTASH_URL = process.env.UPSTASH_REDIS_REST_URL;
  const UPSTASH_TOKEN = process.env.UPSTASH_REST_TOKEN;

  if (!UPSTASH_URL || !UPSTASH_TOKEN) {
    return res.status(500).json({ error: 'Missing Upstash configuration' });
  }

  try {
    // Use Upstash REST API to increment a key named 'visits'
    // Upstash supports simple REST paths like: POST {UPSTASH_URL}/incr/visits
    const resp = await fetch(`${UPSTASH_URL.replace(/\/$/, '')}/incr/visits`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${UPSTASH_TOKEN}`,
        'Content-Type': 'application/json'
      }
    });

    if (!resp.ok) {
      const text = await resp.text();
      console.error('Upstash non-OK response', resp.status, text);
      return res.status(500).json({ error: 'Upstash error' });
    }

    const json = await resp.json();
    // Upstash typically returns { result: <number> } or { value: <number> }
    const value = json.result ?? json.value ?? json;
    return res.status(200).json({ value: Number(value) });
  } catch (err) {
    console.error('Error in counter handler:', err);
    return res.status(500).json({ error: 'Server error' });
  }
}
