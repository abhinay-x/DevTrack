// server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const connectDB = require('./src/config/db');

// Environment variables
const PORT = process.env.PORT || 5000;

// Connect to database
connectDB();

// Initialize app
const app = express();

// Global middlewares
app.use(express.json());
app.use(cors());
app.use(helmet());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP
});
app.use(limiter);

// Health check route
app.get('/', (req, res) => {
  res.json({ message: 'DevTrack API is running 🚀' });
});

// Mount routes
const authRoutes = require('./src/routes/authRoutes');
app.use('/api/auth', authRoutes);
const logRoutes = require('./src/routes/logRoutes');
const snippetRoutes = require('./src/routes/snippetRoutes');
const goalRoutes = require('./src/routes/goalRoutes');
const analyticsRoutes = require('./src/routes/analyticsRoutes');
app.use('/api/logs', logRoutes);
app.use('/api/snippets', snippetRoutes);
app.use('/api/goals', goalRoutes);
app.use('/api/analytics', analyticsRoutes);

// Error handling middleware placeholder
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Server Error' });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
