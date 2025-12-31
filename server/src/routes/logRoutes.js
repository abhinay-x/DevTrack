// src/routes/logRoutes.js
const express = require('express');
const { body } = require('express-validator');
const {
  createLog,
  getLogs,
  getLogById,
  updateLog,
  deleteLog,
} = require('../controllers/logController');
const protect = require('../middleware/auth');

const router = express.Router();

const logValidation = [
  body('title', 'Title is required').not().isEmpty(),
  body('category', 'Category is required').not().isEmpty(),
  body('date', 'Valid date is required').isISO8601().toDate(),
];

router.route('/').post(protect, logValidation, createLog).get(protect, getLogs);
router
  .route('/:id')
  .get(protect, getLogById)
  .put(protect, updateLog)
  .delete(protect, deleteLog);

module.exports = router;
