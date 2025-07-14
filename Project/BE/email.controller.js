const emailService = require('./email.service');
const User = require('./user.schema');
const Vendor = require('./vendor.schema');
const Counselor = require('./counselor.schema');
const Community = require('./community.schema');

// Send test email
const sendTestEmail = async (req, res) => {
  try {
    const { email } = req.body;
    
    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Email address is required'
      });
    }

    const result = await emailService.sendTestEmail(email);
    
    if (result.success) {
      res.json({
        success: true,
        message: 'Test email sent successfully',
        messageId: result.messageId
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'Failed to send test email',
        error: result.error
      });
    }
  } catch (error) {
    console.error('Error sending test email:', error);
    res.status(500).json({
      success: false,
      message: 'Error sending test email'
    });
  }
};

// Send welcome email to role user
const sendWelcomeEmail = async (req, res) => {
  try {
    const { userId, roleType } = req.body;
    
    if (!userId || !roleType) {
      return res.status(400).json({
        success: false,
        message: 'User ID and role type are required'
      });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    const userData = {
      name: user.name,
      email: user.email,
      phone: user.phone,
      id: user._id
    };

    const result = await emailService.sendWelcomeRole(userData, roleType);
    
    if (result.success) {
      res.json({
        success: true,
        message: 'Welcome email sent successfully',
        messageId: result.messageId
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'Failed to send welcome email',
        error: result.error
      });
    }
  } catch (error) {
    console.error('Error sending welcome email:', error);
    res.status(500).json({
      success: false,
      message: 'Error sending welcome email'
    });
  }
};

// Send bulk notification to role users
const sendBulkNotification = async (req, res) => {
  try {
    const { roleType, subject, message, filters } = req.body;
    
    if (!roleType || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: 'Role type, subject, and message are required'
      });
    }

    let users = [];
    
    // Get users based on role type
    switch (roleType) {
      case 'vendor':
        const vendors = await Vendor.find(filters || {}).populate('userId');
        users = vendors.map(v => v.userId);
        break;
      case 'counselor':
        const counselors = await Counselor.find(filters || {}).populate('userId');
        users = counselors.map(c => c.userId);
        break;
      case 'community':
        const communities = await Community.find(filters || {}).populate('userId');
        users = communities.map(c => c.userId);
        break;
      default:
        return res.status(400).json({
          success: false,
          message: 'Invalid role type'
        });
    }

    // Send emails to all users
    const results = [];
    for (const user of users) {
      try {
        const userData = {
          name: user.name,
          email: user.email,
          phone: user.phone
        };
        
        const result = await emailService.sendEmail(
          user.email,
          'customNotification',
          { userData, subject, message }
        );
        
        results.push({
          userId: user._id,
          email: user.email,
          success: result.success,
          messageId: result.messageId,
          error: result.error
        });
      } catch (error) {
        results.push({
          userId: user._id,
          email: user.email,
          success: false,
          error: error.message
        });
      }
    }

    const successful = results.filter(r => r.success).length;
    const failed = results.filter(r => !r.success).length;

    res.json({
      success: true,
      message: `Bulk notification sent. ${successful} successful, ${failed} failed.`,
      results,
      summary: {
        total: results.length,
        successful,
        failed
      }
    });
  } catch (error) {
    console.error('Error sending bulk notification:', error);
    res.status(500).json({
      success: false,
      message: 'Error sending bulk notification'
    });
  }
};

// Get email statistics
const getEmailStats = async (req, res) => {
  try {
    // This would typically connect to an email service API to get statistics
    // For now, we'll return mock data
    const stats = {
      totalSent: 0,
      totalDelivered: 0,
      totalBounced: 0,
      totalOpened: 0,
      totalClicked: 0,
      byRole: {
        vendor: { sent: 0, delivered: 0, opened: 0 },
        counselor: { sent: 0, delivered: 0, opened: 0 },
        community: { sent: 0, delivered: 0, opened: 0 }
      },
      byTemplate: {
        roleApplicationSubmitted: 0,
        roleApplicationApproved: 0,
        roleApplicationRejected: 0,
        roleStatusChanged: 0,
        welcomeRole: 0
      }
    };

    res.json({
      success: true,
      data: stats
    });
  } catch (error) {
    console.error('Error fetching email stats:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching email statistics'
    });
  }
};

module.exports = {
  sendTestEmail,
  sendWelcomeEmail,
  sendBulkNotification,
  getEmailStats
}; 