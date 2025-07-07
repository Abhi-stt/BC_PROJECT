const express = require('express');
const router = express.Router();
const Counselor = require('../counselor.schema');

// Add counselor
router.post('/', async (req, res) => {
  res.json(await new Counselor(req.body).save());
});
// List/search counselors
router.get('/', async (req, res) => {
  res.json(await Counselor.find());
});
// Get counselor details
router.get('/:id', async (req, res) => {
  res.json(await Counselor.findById(req.params.id));
});
// Update counselor
router.put('/:id', async (req, res) => {
  res.json(await Counselor.findByIdAndUpdate(req.params.id, req.body, { new: true }));
});
// Delete counselor
router.delete('/:id', async (req, res) => {
  res.json(await Counselor.findByIdAndDelete(req.params.id));
});

module.exports = router; 