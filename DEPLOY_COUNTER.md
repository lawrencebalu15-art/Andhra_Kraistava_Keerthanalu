Serverless Visitor Counter (Vercel + Upstash)

This repository includes a serverless counter endpoint at `api/counter.js` that uses Upstash Redis (REST API) to store a global visitor counter. The front-end (`js/visitor-counter.js`) will call `/api/counter` first and fall back to CountAPI if the serverless endpoint isn't deployed.

Steps to deploy (Vercel):

1. Create an Upstash Redis database
   - Go to https://upstash.com and create a free Redis database.
   - Note the REST URL (it looks like `https://<id>.upstash.io`) and the REST token.

2. Add environment variables to Vercel
   - In your Vercel dashboard for this project, go to Settings → Environment Variables.
   - Add:
     - `UPSTASH_REDIS_REST_URL` = your Upstash REST URL (no trailing slash is fine)
     - `UPSTASH_REST_TOKEN` = your Upstash REST token

3. Deploy to Vercel
   - If you haven't connected your GitHub repo to Vercel, connect it and import the project.
   - Vercel will detect the `api/` folder and deploy `api/counter.js` as a serverless function.

4. Verify
   - After deployment, visit any page of your site and the visitor counter should increase and display the number.
   - You can test the endpoint directly (replace example domain):
     ```bash
     curl -i https://<your-deployment>.vercel.app/api/counter
     ```

Notes:
- The API increments atomically on each request to `/api/counter`. If you want to avoid counting bots or repeated refreshes from the same visitor, we can add logic (cookies/short TTL dedupe) to count once-per-day per IP/cookie.
- If you prefer Netlify or AWS Lambda, the `api/counter.js` file should work similarly with minor changes.

Alternative quick option:
- If you don't want to set up Upstash/Vercel, keep using CountAPI (already wired) but that may be blocked on some networks (as you observed). The front-end will fall back to cached/offline display when CountAPI is unreachable.
