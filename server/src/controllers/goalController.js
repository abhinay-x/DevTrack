// src/controllers/goalController.js
const Goal = require('../models/Goal');
const { validationResult } = require('express-validator');

// @desc    Create goal
// @route   POST /api/goals
// @access  Private
exports.createGoal = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { _id, ...goalData } = req.body;
    const goal = await Goal.create({
      userId: req.user._id,
      ...goalData,
    });
    res.status(201).json(goal);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Get all goals
// @route   GET /api/goals
// @access  Private
exports.getGoals = async (req, res) => {
  try {
    const { status, page = 1, limit = 20, sort = '-createdAt' } = req.query;
    const query = { userId: req.user._id };
    if (status) query.status = status;

    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;

    const [goals, total] = await Promise.all([
      Goal.find(query).sort(sort).skip(skip).limit(limitNum),
      Goal.countDocuments(query),
    ]);

    res.json({
      goals,
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

// @desc    Update goal
// @route   PUT /api/goals/:id
// @access  Private
exports.updateGoal = async (req, res) => {
  try {
    const updateData = { ...req.body };
    
    if (updateData.status === 'Completed' && !updateData.completedAt) {
      updateData.completedAt = new Date();
    }
    
    const goal = await Goal.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      updateData,
      { new: true }
    );
    if (!goal) return res.status(404).json({ message: 'Goal not found' });
    res.json(goal);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Delete goal
// @route   DELETE /api/goals/:id
// @access  Private
exports.deleteGoal = async (req, res) => {
  try {
    const goal = await Goal.findOneAndDelete({ _id: req.params.id, userId: req.user._id });
    if (!goal) return res.status(404).json({ message: 'Goal not found' });
    res.json({ message: 'Goal removed' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Get progress summary for goals
// @route   GET /api/goals/progress
// @access  Private
exports.getGoalsProgress = async (req, res) => {
  try {
    const goals = await Goal.find({ userId: req.user._id });
    const progress = goals.map((g) => ({
      title: g.title,
      progress: ((g.currentHours / g.targetHours) * 100) || 0,
      status: g.status,
    }));
    res.json(progress);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};
