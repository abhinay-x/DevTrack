// src/controllers/snippetController.js
const CodeSnippet = require('../models/CodeSnippet');
const { validationResult } = require('express-validator');

// @desc    Create code snippet
// @route   POST /api/snippets
// @access  Private
exports.createSnippet = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const snippet = await CodeSnippet.create({
      userId: req.user._id,
      ...req.body,
    });
    res.status(201).json(snippet);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Get snippets with optional search
// @route   GET /api/snippets
// @access  Private
exports.getSnippets = async (req, res) => {
  try {
    const { q, language } = req.query;
    const query = { userId: req.user._id };
    if (language) query.language = language;
    if (q) {
      query.$or = [
        { title: new RegExp(q, 'i') },
        { tags: new RegExp(q, 'i') },
        { language: new RegExp(q, 'i') },
      ];
    }
    const snippets = await CodeSnippet.find(query).sort({ createdAt: -1 });
    res.json(snippets);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Get single snippet
// @route   GET /api/snippets/:id
// @access  Private
exports.getSnippetById = async (req, res) => {
  try {
    const snippet = await CodeSnippet.findOne({ _id: req.params.id, userId: req.user._id });
    if (!snippet) return res.status(404).json({ message: 'Snippet not found' });
    res.json(snippet);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Update snippet
// @route   PUT /api/snippets/:id
// @access  Private
exports.updateSnippet = async (req, res) => {
  try {
    const snippet = await CodeSnippet.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      req.body,
      { new: true }
    );
    if (!snippet) return res.status(404).json({ message: 'Snippet not found' });
    res.json(snippet);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Delete snippet
// @route   DELETE /api/snippets/:id
// @access  Private
exports.deleteSnippet = async (req, res) => {
  try {
    const snippet = await CodeSnippet.findOneAndDelete({ _id: req.params.id, userId: req.user._id });
    if (!snippet) return res.status(404).json({ message: 'Snippet not found' });
    res.json({ message: 'Snippet removed' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};
