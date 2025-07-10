const express = require('express');
const router = express.Router();
const adminController = require('../admin.controller');

// User management
router.patch('/users/:id/verify', adminController.verifyUser);
router.patch('/users/:id/suspend', adminController.suspendUser);
router.patch('/users/:id/activate', adminController.activateUser);
router.patch('/users/:id/premium', adminController.premiumUser);
router.delete('/users/:id', adminController.deleteUser);

// Content moderation
router.patch('/posts/:id/approve', adminController.approvePost);
router.patch('/posts/:id/reject', adminController.rejectPost);
router.delete('/posts/:id', adminController.deletePost);
router.patch('/reports/:id/resolve', adminController.resolveReport);
router.patch('/reports/:id/review', adminController.reviewReport);

// Fetch all reports for moderation
router.get('/reports', async (req, res) => {
  try {
    const Report = require('../report.schema');
    const reports = await Report.find();
    res.json(reports);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router; 