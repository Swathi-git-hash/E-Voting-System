const mongoose = require('mongoose');

const VoteSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', unique: true },
  candidate: { type: String, required: true }
});

module.exports = mongoose.model('Vote', VoteSchema);