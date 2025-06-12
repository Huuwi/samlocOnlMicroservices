const rateLimitStore = new Map();

const RATE_LIMIT = 100; // requests
const TIME_WINDOW = 1 * 60 * 1000; // 1 phút

function rateLimiter(req, res, next) {
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown';
    const now = Date.now();

    let entry = rateLimitStore.get(ip);

    if (!entry || entry.expiresAt < now) {
        // Lần đầu tiên hoặc hết hạn => reset
        rateLimitStore.set(ip, {
            count: 1,
            expiresAt: now + TIME_WINDOW
        });
        return next();
    }

    if (entry.count >= RATE_LIMIT) {
        res.writeHead(429, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Too many requests' }));
    } else {
        entry.count++;
        rateLimitStore.set(ip, entry);
        next();
    }
}

module.exports = rateLimiter;
