// src/controllers/authController.js
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const generateToken = require('../utils/generateToken');
const User = require('../models/User');
const AuditLog = require('../models/AuditLog');

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
exports.registerUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { username, email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      token: generateToken(user._id),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Authenticate user & get token
// @route   POST /api/auth/login
// @access  Public
exports.authUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email }).select('+password');

    if (user?.password && (await bcrypt.compare(password ?? '', user.password))) {
      await AuditLog.create({
        userId: user._id,
        action: 'login',
        ipAddress: req.ip,
        userAgent: req.get('user-agent'),
      });

      res.json({
        _id: user._id,
        username: user.username,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Get user profile
// @route   GET /api/auth/me
// @access  Private
exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');

    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Update user profile
// @route   PUT /api/auth/profile
// @access  Private
exports.updateUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (user) {
      const changes = {};
      if (req.body.username && req.body.username !== user.username) {
        changes.username = { from: user.username, to: req.body.username };
        user.username = req.body.username;
      }
      if (req.body.email && req.body.email !== user.email) {
        changes.email = { from: user.email, to: req.body.email };
        user.email = req.body.email;
      }
      if (req.body.profilePicture !== undefined) {
        changes.profilePicture = true;
        user.profilePicture = req.body.profilePicture;
      }
      if (req.body.password) {
        changes.password = true;
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(req.body.password, salt);
      }
      if (req.body.theme) {
        changes.theme = { from: user.theme, to: req.body.theme };
        user.theme = req.body.theme;
      }
      const updatedUser = await user.save();

      if (Object.keys(changes).length > 0) {
        await AuditLog.create({
          userId: user._id,
          action: 'profile_update',
          details: changes,
          ipAddress: req.ip,
          userAgent: req.get('user-agent'),
        });
      }

      res.json({
        _id: updatedUser._id,
        username: updatedUser.username,
        email: updatedUser.email,
        profilePicture: updatedUser.profilePicture,
        theme: updatedUser.theme,
        token: generateToken(updatedUser._id),
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};
