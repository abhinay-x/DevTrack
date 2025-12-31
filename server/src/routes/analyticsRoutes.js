// src/routes/analyticsRoutes.js
const express = require('express');
const { getWeeklyActivity, getCategoryBreakdown, getStreak } = require('../controllers/analyticsController');
const protect = require('../middleware/auth');

const router = express.Router();

router.get('/weekly', protect, getWeeklyActivity);
router.get('/category-breakdown', protect, getCategoryBreakdown);
router.get('/streak', protect, getStreak);

module.exports = router;
