// models/user.tokens.js
const mongoose = require('mongoose');

const UserTokenSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  twoFactorSecret: { type: String },
  is2FAEnabled: { type: Boolean, default: false }
});

module.exports = mongoose.model('UserToken', UserTokenSchema);
