// src/routes/authRoutes.js
const express = require('express');
const { body } = require('express-validator');
const {
  registerUser,
  authUser,
  getUserProfile,
  updateUserProfile,
} = require('../controllers/authController');
const protect = require('../middleware/auth');

const router = express.Router();

// Validation rules
const registerValidation = [
  body('username', 'Username is required').not().isEmpty(),
  body('email', 'Please include a valid email').isEmail(),
  body('password', 'Password must be 6 or more characters').isLength({ min: 6 }),
];

const loginValidation = [
  body('email', 'Please include a valid email').isEmail(),
  body('password', 'Password is required').exists(),
];

router.post('/register', registerValidation, registerUser);
router.post('/login', loginValidation, authUser);
router.get('/me', protect, getUserProfile);
router.put('/profile', protect, updateUserProfile);

module.exports = router;
