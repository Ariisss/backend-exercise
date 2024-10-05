const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/user');
const loggingMiddleware = require('./middleware/loggingMiddleware');const rateLimiter = require('./middleware/rateLimiterMiddleware');

const app = express();
const PORT = 3000;

// app.use(express.json());

// rate limiting middleware
app.use(rateLimiter);

// middleware
app.use(bodyParser.json());
app.use(loggingMiddleware);

// routes
app.use('/user', userRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});