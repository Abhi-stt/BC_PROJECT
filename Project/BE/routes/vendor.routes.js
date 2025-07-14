const express = require('express');
const router = express.Router();
const vendorController = require('../vendor.controller');
const auth = require('../middleware/auth');

// Admin routes
router.get('/admin/all', auth, vendorController.getAllVendors);
router.get('/admin/requests', auth, vendorController.getVendorRequests);
router.post('/admin/requests/:requestId/approve', auth, vendorController.approveVendorRequest);
router.post('/admin/requests/:requestId/reject', auth, vendorController.rejectVendorRequest);
router.put('/admin/:vendorId/status', auth, vendorController.updateVendorStatus);

// Vendor routes
router.get('/profile', auth, vendorController.getVendorById);
router.post('/profile', auth, vendorController.createVendorProfile);
router.put('/profile', auth, vendorController.updateVendorProfile);
router.get('/analytics', auth, vendorController.getVendorAnalytics);

// Public routes
router.get('/:id', vendorController.getVendorById);

module.exports = router; 