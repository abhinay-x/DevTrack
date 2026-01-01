// src/models/Goal.js
const mongoose = require('mongoose');

/**
 * Goal schema for tracking development goals
 * @typedef {Object} GoalSchema
 * @property {string} userId - Reference to User
 * @property {string} title - Goal title
 * @property {string} description - Optional description
 * @property {number} targetHours - Target hours to complete
 * @property {number} currentHours - Current hours logged
 * @property {string} deadline - Goal deadline
 * @property {string} category - Goal category
 * @property {string} status - Goal status
 * @property {Date} completedAt - Completion date (if completed)
 * @property {Date} createdAt - Creation date
 * @property {Date} updatedAt - Last update date
 */

const goalSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    title: {
      type: String,
      required: [true, 'Please add a title'],
      trim: true,
      maxlength: [100, 'Title cannot exceed 100 characters'],
    },
    description: {
      type: String,
      maxlength: [500, 'Description cannot exceed 500 characters'],
    },
    targetHours: {
      type: Number,
      required: [true, 'Please add target hours'],
      min: [1, 'Target hours must be at least 1'],
    },
    currentHours: {
      type: Number,
      default: 0,
      min: [0, 'Current hours cannot be negative'],
    },
    deadline: {
      type: Date,
      required: [true, 'Please add a deadline'],
    },
    category: {
      type: String,
      required: [true, 'Please add a category'],
      enum: ['Learning', 'Project', 'Career', 'Skill', 'Other'],
    },
    status: {
      type: String,
      enum: ['Active', 'Completed', 'Paused'],
      default: 'Active',
    },
    completedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Goal', goalSchema);
