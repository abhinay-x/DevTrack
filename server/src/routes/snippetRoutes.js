// src/routes/snippetRoutes.js
const express = require('express');
const { body } = require('express-validator');
const {
  createSnippet,
  getSnippets,
  getSnippetById,
  updateSnippet,
  deleteSnippet,
} = require('../controllers/snippetController');
const protect = require('../middleware/auth');

const router = express.Router();

const snippetValidation = [
  body('title', 'Title is required').not().isEmpty(),
  body('language', 'Language is required').not().isEmpty(),
  body('code', 'Code content is required').not().isEmpty(),
];

router.route('/')
  .post(protect, snippetValidation, createSnippet)
  .get(protect, getSnippets);

router.route('/:id')
  .get(protect, getSnippetById)
  .put(protect, updateSnippet)
  .delete(protect, deleteSnippet);

module.exports = router;
