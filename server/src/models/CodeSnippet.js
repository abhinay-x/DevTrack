// src/models/CodeSnippet.js
const mongoose = require('mongoose');

/**
 * CodeSnippet schema for storing code snippets
 * @typedef {Object} CodeSnippetSchema
 * @property {string} userId - Reference to User
 * @property {string} title - Snippet title
 * @property {string} language - Programming language
 * @property {string} code - Code content
 * @property {string} description - Optional description
 * @property {string[]} tags - Optional tags
 * @property {Date} createdAt - Creation date
 * @property {Date} updatedAt - Last update date
 */

const codeSnippetSchema = new mongoose.Schema(
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
    language: {
      type: String,
      required: [true, 'Please add a language'],
    },
    code: {
      type: String,
      required: [true, 'Please add code'],
    },
    description: {
      type: String,
      maxlength: [500, 'Description cannot exceed 500 characters'],
    },
    tags: [{
      type: String,
      trim: true,
    }],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('CodeSnippet', codeSnippetSchema);
