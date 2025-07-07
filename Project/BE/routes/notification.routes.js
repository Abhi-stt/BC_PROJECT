const express = require('express');
const router = express.Router();
const Notification = require('../notification.schema');

// Add notification
router.post('/', async (req, res) => {
  res.json(await new Notification(req.body).save());
});
// Get all notifications for a user
router.get('/user/:userId', async (req, res) => {
  res.json(await Notification.find({ userId: req.params.userId }));
});
// Mark as read
router.put('/:id/read', async (req, res) => {
  res.json(await Notification.findByIdAndUpdate(req.params.id, { read: true }, { new: true }));
});
// Mark all as read
router.put('/read-all/:userId', async (req, res) => {
  await Notification.updateMany({ userId: req.params.userId }, { read: true });
  res.json({ message: 'All notifications marked as read' });
});
// Delete notification
router.delete('/:id', async (req, res) => {
  res.json(await Notification.findByIdAndDelete(req.params.id));
});

module.exports = router; 