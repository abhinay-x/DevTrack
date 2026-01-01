// src/controllers/logController.js
const DailyLog = require('../models/DailyLog');
const updateUserStreak = require('../utils/updateStreak');
const { validationResult } = require('express-validator');

// @desc    Create new daily log
// @route   POST /api/logs
// @access  Private
exports.createLog = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { _id, ...logData } = req.body;
    const log = await DailyLog.create({
      userId: req.user._id,
      ...logData,
    });

    await updateUserStreak(req.user._id);

    res.status(201).json(log);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Get all logs for user
// @route   GET /api/logs
// @access  Private
exports.getLogs = async (req, res) => {
  try {
    const { category, startDate, endDate, page = 1, limit = 20, sort = '-date' } = req.query;
    const query = { userId: req.user._id };

    if (category) query.category = category;
    if (startDate || endDate) {
      query.date = {};
      if (startDate) query.date.$gte = new Date(startDate);
      if (endDate) query.date.$lte = new Date(endDate);
    }

    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;

    const [logs, total] = await Promise.all([
      DailyLog.find(query).sort(sort).skip(skip).limit(limitNum),
      DailyLog.countDocuments(query),
    ]);

    res.json({
      logs,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        pages: Math.ceil(total / limitNum),
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Get single log by ID
// @route   GET /api/logs/:id
// @access  Private
exports.getLogById = async (req, res) => {
  try {
    const log = await DailyLog.findOne({ _id: req.params.id, userId: req.user._id });
    if (!log) return res.status(404).json({ message: 'Log not found' });
    res.json(log);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Update log
// @route   PUT /api/logs/:id
// @access  Private
exports.updateLog = async (req, res) => {
  try {
    const log = await DailyLog.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      req.body,
      { new: true }
    );
    if (!log) return res.status(404).json({ message: 'Log not found' });
    res.json(log);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Delete log
// @route   DELETE /api/logs/:id
// @access  Private
exports.deleteLog = async (req, res) => {
  try {
    const log = await DailyLog.findOneAndDelete({ _id: req.params.id, userId: req.user._id });
    if (!log) return res.status(404).json({ message: 'Log not found' });
    res.json({ message: 'Log removed' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};
