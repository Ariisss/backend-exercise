// keeps track of requests per ip address
const rateLimitStore = new Map();

// limits number of requests per ip address to 5 per 30 seconds
function rateLimiter(req, res, next) {
  const ip = req.ip; // ip address of the requester
  const now = Date.now(); // current timestamp
  const windowStart = now - 30000; // 30 seconds ago

  // adds the ip address to the rateLimitStore if it doesn't exist
  if (!rateLimitStore.has(ip)) {
    rateLimitStore.set(ip, []);
  }

  const requestTimestamps = rateLimitStore.get(ip);
  // this filters out timestamps that are older than 30 seconds
  const requestsInWindow = requestTimestamps.filter(timestamp => timestamp > windowStart);

  // blocks the request if the number of requests in the last 30 seconds is >= 5
  if (requestsInWindow.length >= 5) {
    return res.status(429).json({
      error: 'Too many requests from this IP, please try again after 30 seconds'
    });
  }

  // adds the current timestamp to the requestTimestamps array
  requestTimestamps.push(now);
  rateLimitStore.set(ip, requestTimestamps);

  next();
}

// a cleanup function to remove old entries
function cleanupRateLimitStore() {
  const now = Date.now();
  const windowStart = now - 30000; // 30 seconds ago

  for (const [ip, timestamps] of rateLimitStore.entries()) {
    const validTimestamps = timestamps.filter(timestamp => timestamp > windowStart);
    if (validTimestamps.length === 0) {
      rateLimitStore.delete(ip); // removes ip if no timestamps are left
    } else {
      rateLimitStore.set(ip, validTimestamps);
    }
  }
}

// cleanup every 5 minutes
setInterval(cleanupRateLimitStore, 5 * 60 * 1000);

module.exports = rateLimiter;