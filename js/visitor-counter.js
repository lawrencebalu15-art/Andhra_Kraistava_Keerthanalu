// Visitor Counter functionality using Kounter API (alternative to CountAPI)
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

    // Updated URL for Kounter API (replace 'andhra-kraistava-keerthanalu' with your unique counter ID)
    const KOUNTER_API_URL = 'https://kounter.vercel.app/api/andhra-kraistava-keerthanalu';
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
        try {
            const resp = await fetch(KOUNTER_API_URL, { cache: 'no-store' });
            if (!resp.ok) throw new Error('Non-OK response: ' + resp.status);
            const json = await resp.json();
            if (json && typeof json.count === 'number') {
                try { localStorage.setItem(CACHE_KEY, String(json.count)); } catch (e) {}
                displayValue(json.count);
                return true;
            }
            throw new Error('Invalid JSON structure');
        } catch (error) {
            console.error('Error updating visitor counter (Kounter):', error);
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
            await new Promise(res => setTimeout(res, delayMs));
        }
        showFallback();
    }

    // Update the counter when the page loads (with retry/fallback)
    updateCounterWithRetry();
});
