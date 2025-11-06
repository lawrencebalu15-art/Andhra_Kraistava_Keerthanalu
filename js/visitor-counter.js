// Visitor Counter functionality
document.addEventListener('DOMContentLoaded', function() {
    // Create the counter element
    const counterDiv = document.createElement('div');
    counterDiv.className = 'visitor-counter';
    counterDiv.innerHTML = 'Visitors: <span id="visitorCount">...</span>';
    document.body.appendChild(counterDiv);

    // Add styles
    const styles = document.createElement('style');
    styles.textContent = `
        .visitor-counter {
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: rgba(0, 0, 0, 0.8);
            color: #fff;
            padding: 8px 15px;
            border-radius: 20px;
            font-size: 0.9rem;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
            z-index: 1000;
        }
        
        .visitor-counter span {
            font-weight: bold;
            color: #ffd700;
        }
    `;
    document.head.appendChild(styles);

    // Function to update the counter with retries and local fallback
    // Try serverless endpoint first (recommended). Fallback to CountAPI if serverless isn't deployed.
    const SERVERLESS_ENDPOINT = '/api/counter';
    const COUNTAPI_URL = 'https://api.countapi.xyz/hit/andhra-kraistava-keerthanalu/visits';
    const CACHE_KEY = 'ak_visitors_cached';

    function displayValue(val) {
        const el = document.getElementById('visitorCount');
        if (!el) return;
        if (val === null || typeof val === 'undefined' || Number.isNaN(Number(val))) {
            el.textContent = 'N/A';
        } else {
            try { el.textContent = Number(val).toLocaleString(); } catch (e) { el.textContent = String(val); }
        }
    }

    async function fetchCountOnce() {
        // First try the serverless endpoint on the same domain
        try {
            const resp = await fetch(SERVERLESS_ENDPOINT, { cache: 'no-store' });
            if (resp.ok) {
                const json = await resp.json();
                if (json && typeof json.value === 'number') {
                    try { localStorage.setItem(CACHE_KEY, String(json.value)); } catch (e) {}
                    displayValue(json.value);
                    return true;
                }
            }
        } catch (err) {
            // Not available or error; continue to fallback
            console.warn('Serverless endpoint not available or errored:', err);
        }

        // Fallback to CountAPI (third-party)
        try {
            const resp = await fetch(COUNTAPI_URL, { cache: 'no-store' });
            if (!resp.ok) throw new Error('Non-OK response: ' + resp.status);
            const data = await resp.json();
            if (data && typeof data.value === 'number') {
                try { localStorage.setItem(CACHE_KEY, String(data.value)); } catch (e) {}
                displayValue(data.value);
                return true;
            }
            throw new Error('Invalid JSON structure');
        } catch (error) {
            console.error('Error updating visitor counter (CountAPI):', error);
            return false;
        }
    }

    function showFallback() {
        // Try cached value first
        try {
            const cached = localStorage.getItem(CACHE_KEY);
            if (cached !== null) {
                displayValue(Number(cached));
                return;
            }
        } catch (e) {
            console.error('Error reading cached visitor count:', e);
        }
        // If nothing available, show friendly offline message
        const el = document.getElementById('visitorCount');
        if (el) el.textContent = 'Offline';
    }

    async function updateCounterWithRetry(retries = 3, delayMs = 5000) {
        for (let i = 0; i < retries; i++) {
            const ok = await fetchCountOnce();
            if (ok) return;
            // Wait before next try
            await new Promise(res => setTimeout(res, delayMs));
        }
        // All attempts failed -> show fallback
        showFallback();
    }

    // Update the counter when the page loads (with retry/fallback)
    updateCounterWithRetry();
});