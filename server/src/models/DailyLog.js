// src/models/DailyLog.js
const mongoose = require('mongoose');

/**
 * DailyLog schema for tracking daily development activities
 * @typedef {Object} DailyLogSchema
 * @property {string} userId - Reference to User
 * @property {string} title - Log title
 * @property {string} category - Activity category
 * @property {number} duration - Duration in minutes
 * @property {string} date - Activity date
 * @property {string} notes - Optional notes
 * @property {Date} createdAt - Creation date
 * @property {Date} updatedAt - Last update date
 */

const dailyLogSchema = new mongoose.Schema(
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
    category: {
      type: String,
      required: [true, 'Please add a category'],
      enum: ['Coding', 'Learning', 'Interview', 'Project', 'Other'],
    },
    duration: {
      type: Number,
      required: [true, 'Please add duration'],
      min: [1, 'Duration must be at least 1 minute'],
    },
    date: {
      type: Date,
      required: [true, 'Please add a date'],
      default: Date.now,
    },
    notes: {
      type: String,
      maxlength: [500, 'Notes cannot exceed 500 characters'],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('DailyLog', dailyLogSchema);
