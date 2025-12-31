// src/routes/goalRoutes.js
const express = require('express');
const { body } = require('express-validator');
const {
  createGoal,
  getGoals,
  updateGoal,
  deleteGoal,
  getGoalsProgress,
} = require('../controllers/goalController');
const protect = require('../middleware/auth');

const router = express.Router();

const goalValidation = [
  body('title', 'Title is required').not().isEmpty(),
];

router.route('/')
  .post(protect, goalValidation, createGoal)
  .get(protect, getGoals);

router.route('/progress').get(protect, getGoalsProgress);

router.route('/:id')
  .put(protect, updateGoal)
  .delete(protect, deleteGoal);

module.exports = router;
