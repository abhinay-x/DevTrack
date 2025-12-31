// src/models/DailyLog.js
const mongoose = require('mongoose');

const dailyLogSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      enum: ['Coding', 'Learning', 'Interview', 'Project'],
      required: true,
    },
    duration: {
      type: Number, // minutes
      default: 0,
    },
    date: {
      type: Date,
      required: true,
    },
    notes: {
      type: String,
      default: '',
    },
    tags: [String],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('DailyLog', dailyLogSchema);
