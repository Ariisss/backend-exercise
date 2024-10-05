// Rate limiter store
const rateLimitStore = new Map();

// Rate limiter middleware
function rateLimiter(req, res, next) {
  const ip = req.ip;
  const now = Date.now();
  const windowStart = now - 30000; // 30 seconds ago

  if (!rateLimitStore.has(ip)) {
    rateLimitStore.set(ip, []);
  }

  const requestTimestamps = rateLimitStore.get(ip);
  const requestsInWindow = requestTimestamps.filter(timestamp => timestamp > windowStart);

  if (requestsInWindow.length >= 5) {
    return res.status(429).json({
      error: 'Too many requests from this IP, please try again after 30 seconds'
    });
  }

  requestTimestamps.push(now);
  rateLimitStore.set(ip, requestTimestamps);

  next();
}

// Optional: Add a cleanup function to remove old entries
function cleanupRateLimitStore() {
  const now = Date.now();
  const windowStart = now - 30000; // 30 seconds ago

  for (const [ip, timestamps] of rateLimitStore.entries()) {
    const validTimestamps = timestamps.filter(timestamp => timestamp > windowStart);
    if (validTimestamps.length === 0) {
      rateLimitStore.delete(ip);
    } else {
      rateLimitStore.set(ip, validTimestamps);
    }
  }
}

// Run cleanup every 5 minutes
setInterval(cleanupRateLimitStore, 5 * 60 * 1000);

module.exports = rateLimiter;