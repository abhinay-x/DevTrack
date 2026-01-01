// src/config/indexes.js
const DailyLog = require('../models/DailyLog');
const CodeSnippet = require('../models/CodeSnippet');
const Goal = require('../models/Goal');

const setupIndexes = async () => {
  try {
    // DailyLog indexes
    await DailyLog.collection.createIndex({ userId: 1, date: -1 });
    await DailyLog.collection.createIndex({ category: 1, userId: 1 });
    await DailyLog.collection.createIndex({ userId: 1, createdAt: -1 });

    // CodeSnippet indexes
    await CodeSnippet.collection.createIndex({ userId: 1, createdAt: -1 });
    await CodeSnippet.collection.createIndex({ language: 1, userId: 1 });
    await CodeSnippet.collection.createIndex(
      { userId: 1, title: 'text', code: 'text' },
      { default_language: 'none', language_override: 'searchLanguage' }
    );

    // Goal indexes
    await Goal.collection.createIndex({ userId: 1, status: 1 });
    await Goal.collection.createIndex({ userId: 1, createdAt: -1 });
    await Goal.collection.createIndex({ userId: 1, deadline: 1 });

    console.log('✅ Database indexes created successfully');
  } catch (error) {
    console.error('❌ Error creating indexes:', error.message);
  }
};

module.exports = setupIndexes;
