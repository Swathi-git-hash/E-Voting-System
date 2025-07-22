const express = require('express');
const Vote = require('../models/Vote');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

// Cast Vote
router.post('/', authMiddleware, async (req, res) => {
  const { candidate } = req.body;
  try {
    const existingVote = await Vote.findOne({ user: req.userId });
    if (existingVote) return res.status(400).send("User already voted");
    const vote = new Vote({ user: req.userId, candidate });
    await vote.save();
    res.send("Vote cast successfully");
  } catch (err) {
    res.status(500).send("Server error");
  }
});

// Results
router.get('/results', async (req, res) => {
  const results = await Vote.aggregate([
    { $group: { _id: "$candidate", votes: { $sum: 1 } } }
  ]);
  res.json(results);
});

module.exports = router;