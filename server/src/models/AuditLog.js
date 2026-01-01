const mongoose = require('mongoose');

/**
 * AuditLog schema for tracking security-critical user actions
 * @typedef {Object} AuditLogSchema
 * @property {string} userId - Reference to User
 * @property {string} action - Action type
 * @property {Object} details - Action details
 * @property {string} [ipAddress] - User IP address
 * @property {string} [userAgent] - User agent string
 * @property {Date} createdAt - Log creation date
 */

const auditLogSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    action: {
      type: String,
      required: true,
      enum: ['password_change', 'profile_update', 'login', 'logout'],
    },
    details: {
      type: mongoose.Schema.Types.Mixed,
    },
    ipAddress: String,
    userAgent: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model('AuditLog', auditLogSchema);
