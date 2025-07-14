const nodemailer = require('nodemailer');
require('dotenv').config();

// Email configuration for Gmail
const emailConfig = {
  host: process.env.EMAIL_HOST || 'smtp.gmail.com',
  port: process.env.EMAIL_PORT || 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
};

// Create transporter globally
const transporter = nodemailer.createTransport(emailConfig);

// Email templates
const emailTemplates = {
  // Role Application Submitted
  roleApplicationSubmitted: (userData, roleType) => ({
    subject: `Role Application Submitted - ${roleType.charAt(0).toUpperCase() + roleType.slice(1)}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
          <h1 style="margin: 0; font-size: 24px;">BandhaConnect</h1>
          <p style="margin: 10px 0 0 0; opacity: 0.9;">Role Application Submitted</p>
        </div>
        
        <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px;">
          <h2 style="color: #333; margin-bottom: 20px;">Hello ${userData.name},</h2>
          
          <p style="color: #666; line-height: 1.6; margin-bottom: 20px;">
            Thank you for submitting your application to join BandhaConnect as a <strong>${roleType}</strong>. 
            We have received your application and our team will review it carefully.
          </p>
          
          <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #667eea;">
            <h3 style="color: #333; margin-top: 0;">Application Details:</h3>
            <p><strong>Role:</strong> ${roleType.charAt(0).toUpperCase() + roleType.slice(1)}</p>
            <p><strong>Email:</strong> ${userData.email}</p>
            <p><strong>Submitted:</strong> ${new Date().toLocaleDateString()}</p>
          </div>
          
          <p style="color: #666; line-height: 1.6; margin-bottom: 20px;">
            We typically review applications within 2-3 business days. You will receive an email notification 
            once your application has been reviewed.
          </p>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${process.env.FRONTEND_URL || 'https://bc-project-pbiz.vercel.app'}" 
               style="background: #667eea; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">
              Visit BandhaConnect
            </a>
          </div>
          
          <p style="color: #666; line-height: 1.6; margin-bottom: 20px;">
            If you have any questions about your application, please don't hesitate to contact our support team.
          </p>
          
          <p style="color: #666; line-height: 1.6;">
            Best regards,<br>
            The BandhaConnect Team
          </p>
        </div>
      </div>
    `
  }),

  // Role Application Approved
  roleApplicationApproved: (userData, roleType, dashboardUrl) => ({
    subject: `BandhaConnect: Your ${roleType.charAt(0).toUpperCase() + roleType.slice(1)} Application Approved!`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #28a745 0%, #20c997 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
          <h1 style="margin: 0; font-size: 24px;">🎉 Application Approved!</h1>
          <p style="margin: 10px 0 0 0; opacity: 0.9;">Welcome to BandhaConnect</p>
        </div>
        <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px;">
          <h2 style="color: #333; margin-bottom: 20px;">Congratulations, ${userData.name || 'User'}!</h2>
          <p style="color: #666; line-height: 1.6; margin-bottom: 20px;">
            Your application to join BandhaConnect as a <strong>${roleType.charAt(0).toUpperCase() + roleType.slice(1)}</strong> has been approved!
          </p>
          <div style="background: #fff3cd; padding: 15px; border-radius: 8px; margin: 20px 0; border: 1px solid #ffeeba;">
            <h3 style="color: #856404; margin-top: 0;">Your Login Credentials</h3>
            <p style="color: #856404; font-size: 16px;"><strong>Email:</strong> ${userData.email}<br/><strong>Temporary Password:</strong> ${userData.tempPassword}</p>
            <p style="color: #856404; font-size: 14px;">Please log in and change your password after your first login for security.</p>
          </div>
          <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #28a745;">
            <h3 style="color: #333; margin-top: 0;">Next Steps</h3>
            <ul style="color: #666; line-height: 1.8;">
              <li>Log in using your credentials below</li>
              <li>After login, you will be redirected to your <strong>${roleType}</strong> dashboard</li>
              <li>Complete your profile and start using BandhaConnect</li>
            </ul>
          </div>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${process.env.FRONTEND_URL || 'https://bc-project-pbiz.vercel.app'}/login" 
               style="background: #28a745; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block; font-weight: bold; margin-right: 10px;">
              Login to Dashboard
            </a>
            <a href="${dashboardUrl}" 
               style="background: #007bff; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block; font-weight: bold;">
              Direct Dashboard Access
            </a>
          </div>
          <div style="background: #e3f2fd; padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #2196f3;">
            <h4 style="color: #1565c0; margin-top: 0;">How to Access Your Dashboard:</h4>
            <ol style="color: #1565c0; line-height: 1.6;">
              <li><strong>Option 1:</strong> Click "Login to Dashboard" and use your credentials to log in</li>
              <li><strong>Option 2:</strong> Click "Direct Dashboard Access" to go directly to your dashboard (you'll be prompted to log in)</li>
            </ol>
            <p style="color: #1565c0; font-size: 14px; margin-top: 10px;">
              <strong>Note:</strong> After login, you will be automatically redirected to your <strong>${roleType}</strong> dashboard.
            </p>
          </div>
          <p style="color: #666; line-height: 1.6; margin-bottom: 20px;">
            If you have any questions, please contact our support team.
          </p>
          <p style="color: #666; line-height: 1.6;">
            Welcome to the BandhaConnect family!<br>
            Best regards,<br>
            The BandhaConnect Team
          </p>
        </div>
      </div>
    `
  }),

  // Role Application Rejected
  roleApplicationRejected: (userData, roleType, reason) => ({
    subject: `Update on Your ${roleType} Application`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #dc3545 0%, #fd7e14 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
          <h1 style="margin: 0; font-size: 24px;">Application Update</h1>
          <p style="margin: 10px 0 0 0; opacity: 0.9;">Important Information</p>
        </div>
        
        <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px;">
          <h2 style="color: #333; margin-bottom: 20px;">Hello ${userData.name},</h2>
          
          <p style="color: #666; line-height: 1.6; margin-bottom: 20px;">
            Thank you for your interest in joining BandhaConnect as a <strong>${roleType}</strong>. 
            After careful review of your application, we regret to inform you that we are unable to 
            approve your application at this time.
          </p>
          
          <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #dc3545;">
            <h3 style="color: #333; margin-top: 0;">Reason for Decision:</h3>
            <p style="color: #666; line-height: 1.6;">${reason || 'Your application did not meet our current requirements.'}</p>
          </div>
          
          <div style="background: #fff3cd; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <h4 style="color: #856404; margin-top: 0;">What You Can Do:</h4>
            <ul style="color: #856404; line-height: 1.6;">
              <li>Review and improve your application</li>
              <li>Ensure all required information is provided</li>
              <li>Consider applying again in the future</li>
              <li>Contact our support team for guidance</li>
            </ul>
          </div>
          
          <p style="color: #666; line-height: 1.6; margin-bottom: 20px;">
            We encourage you to review your application and consider applying again in the future. 
            Our requirements and criteria may change, and we welcome new applications.
          </p>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${process.env.FRONTEND_URL || 'https://bc-project-pbiz.vercel.app'}/apply" 
               style="background: #6c757d; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">
              Apply Again
            </a>
          </div>
          
          <p style="color: #666; line-height: 1.6;">
            If you have any questions about this decision, please don't hesitate to contact our support team.<br><br>
            Best regards,<br>
            The BandhaConnect Team
          </p>
        </div>
      </div>
    `
  }),

  // Role Status Changed (Suspended/Activated)
  roleStatusChanged: (userData, roleType, status, reason) => ({
    subject: `Your ${roleType} Account Status Update`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, ${status === 'suspended' ? '#dc3545' : '#28a745'} 0%, ${status === 'suspended' ? '#fd7e14' : '#20c997'} 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
          <h1 style="margin: 0; font-size: 24px;">Account Status Update</h1>
          <p style="margin: 10px 0 0 0; opacity: 0.9;">${status === 'suspended' ? 'Account Suspended' : 'Account Reactivated'}</p>
        </div>
        
        <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px;">
          <h2 style="color: #333; margin-bottom: 20px;">Hello ${userData.name},</h2>
          
          <p style="color: #666; line-height: 1.6; margin-bottom: 20px;">
            This email is to inform you about a change in the status of your <strong>${roleType}</strong> account on BandhaConnect.
          </p>
          
          <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid ${status === 'suspended' ? '#dc3545' : '#28a745'};">
            <h3 style="color: #333; margin-top: 0;">Status Change:</h3>
            <p><strong>New Status:</strong> <span style="color: ${status === 'suspended' ? '#dc3545' : '#28a745'}; font-weight: bold;">${status.charAt(0).toUpperCase() + status.slice(1)}</span></p>
            ${reason ? `<p><strong>Reason:</strong> ${reason}</p>` : ''}
            <p><strong>Date:</strong> ${new Date().toLocaleDateString()}</p>
          </div>
          
          ${status === 'suspended' ? `
            <div style="background: #f8d7da; padding: 15px; border-radius: 8px; margin: 20px 0;">
              <h4 style="color: #721c24; margin-top: 0;">What This Means:</h4>
              <ul style="color: #721c24; line-height: 1.6;">
                <li>Your account is temporarily suspended</li>
                <li>You cannot access your dashboard</li>
                <li>All services are paused</li>
                <li>Contact support to resolve issues</li>
              </ul>
            </div>
          ` : `
            <div style="background: #d4edda; padding: 15px; border-radius: 8px; margin: 20px 0;">
              <h4 style="color: #155724; margin-top: 0;">Great News!</h4>
              <ul style="color: #155724; line-height: 1.6;">
                <li>Your account has been reactivated</li>
                <li>You can access your dashboard again</li>
                <li>All services are restored</li>
                <li>Welcome back to BandhaConnect!</li>
              </ul>
            </div>
          `}
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${process.env.FRONTEND_URL || 'https://bc-project-pbiz.vercel.app'}/support" 
               style="background: ${status === 'suspended' ? '#dc3545' : '#28a745'}; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">
              ${status === 'suspended' ? 'Contact Support' : 'Access Dashboard'}
            </a>
          </div>
          
          <p style="color: #666; line-height: 1.6;">
            If you have any questions about this status change, please contact our support team.<br><br>
            Best regards,<br>
            The BandhaConnect Team
          </p>
        </div>
      </div>
    `
  }),

  // Welcome Email for New Role
  welcomeRole: (userData, roleType, dashboardUrl) => ({
    subject: `Welcome to BandhaConnect - Your ${roleType.charAt(0).toUpperCase() + roleType.slice(1)} Journey Begins!`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
          <h1 style="margin: 0; font-size: 24px;">🌟 Welcome to BandhaConnect!</h1>
          <p style="margin: 10px 0 0 0; opacity: 0.9;">Your ${roleType.charAt(0).toUpperCase() + roleType.slice(1)} journey starts here</p>
        </div>
        <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px;">
          <h2 style="color: #333; margin-bottom: 20px;">Welcome, ${userData.name || 'User'}! 🎉</h2>
          <p style="color: #666; line-height: 1.6; margin-bottom: 20px;">
            Congratulations on joining BandhaConnect as a <strong>${roleType.charAt(0).toUpperCase() + roleType.slice(1)}</strong>! You're now part of our growing community dedicated to helping people find their perfect match.
          </p>
          <div style="background: #fff3cd; padding: 15px; border-radius: 8px; margin: 20px 0; border: 1px solid #ffeeba;">
            <h3 style="color: #856404; margin-top: 0;">Your Login Credentials</h3>
            <p style="color: #856404; font-size: 16px;"><strong>Email:</strong> ${userData.email}<br/><strong>Temporary Password:</strong> ${userData.tempPassword}</p>
            <p style="color: #856404; font-size: 14px;">Please log in and change your password after your first login for security.</p>
          </div>
          <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #667eea;">
            <h3 style="color: #333; margin-top: 0;">Getting Started</h3>
            <ol style="color: #666; line-height: 1.8;">
              <li>Log in using your credentials below</li>
              <li>After login, you will be redirected to your <strong>${roleType}</strong> dashboard</li>
              <li>Complete your profile and start using BandhaConnect</li>
            </ol>
          </div>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${process.env.FRONTEND_URL || 'https://bc-project-pbiz.vercel.app'}/login" 
               style="background: #667eea; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block; font-weight: bold; margin-right: 10px;">
              Login to Dashboard
            </a>
            <a href="${dashboardUrl}" 
               style="background: #007bff; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block; font-weight: bold;">
              Direct Dashboard Access
            </a>
          </div>
          <div style="background: #e3f2fd; padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #2196f3;">
            <h4 style="color: #1565c0; margin-top: 0;">How to Access Your Dashboard:</h4>
            <ol style="color: #1565c0; line-height: 1.6;">
              <li><strong>Option 1:</strong> Click "Login to Dashboard" and use your credentials to log in</li>
              <li><strong>Option 2:</strong> Click "Direct Dashboard Access" to go directly to your dashboard (you'll be prompted to log in)</li>
            </ol>
            <p style="color: #1565c0; font-size: 14px; margin-top: 10px;">
              <strong>Note:</strong> After login, you will be automatically redirected to your <strong>${roleType}</strong> dashboard.
            </p>
          </div>
          <p style="color: #666; line-height: 1.6; margin-bottom: 20px;">
            If you have any questions, please contact our support team.
          </p>
          <p style="color: #666; line-height: 1.6;">
            Welcome to the BandhaConnect family!<br>
            Best regards,<br>
            The BandhaConnect Team
          </p>
        </div>
      </div>
    `
  }),

  // Custom Notification Template
  customNotification: (userData, subject, message) => ({
    subject: subject,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
          <h1 style="margin: 0; font-size: 24px;">BandhaConnect</h1>
          <p style="margin: 10px 0 0 0; opacity: 0.9;">Important Notification</p>
        </div>
        
        <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px;">
          <h2 style="color: #333; margin-bottom: 20px;">Hello ${userData.name},</h2>
          
          <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #667eea;">
            <h3 style="color: #333; margin-top: 0;">${subject}</h3>
            <div style="color: #666; line-height: 1.6; white-space: pre-wrap;">${message}</div>
          </div>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${process.env.FRONTEND_URL || 'https://bc-project-pbiz.vercel.app'}" 
               style="background: #667eea; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">
              Visit BandhaConnect
            </a>
          </div>
          
          <p style="color: #666; line-height: 1.6;">
            If you have any questions, please don't hesitate to contact our support team.<br><br>
            Best regards,<br>
            The BandhaConnect Team
          </p>
        </div>
      </div>
    `
  })
};

// Email service functions
const emailService = {
  // Send email with template (using Gmail for real delivery)
  sendEmail: async (to, templateName, data) => {
    try {
      const template = emailTemplates[templateName];
      if (!template) {
        throw new Error(`Email template '${templateName}' not found`);
      }

      let emailContent;
      if (typeof template === 'function') {
        // Handle different template function signatures
        if (templateName === 'welcomeRole') {
          emailContent = template(data.userData, data.roleType, data.dashboardUrl);
        } else if (templateName === 'roleApplicationApproved') {
          emailContent = template(data.userData, data.roleType, data.dashboardUrl);
        } else if (templateName === 'roleApplicationSubmitted') {
          emailContent = template(data.userData, data.roleType);
        } else if (templateName === 'roleApplicationRejected') {
          emailContent = template(data.userData, data.roleType, data.reason);
        } else if (templateName === 'roleStatusChanged') {
          emailContent = template(data.userData, data.roleType, data.status, data.reason);
        } else if (templateName === 'customNotification') {
          emailContent = template(data.userData, data.subject, data.message);
        } else {
          emailContent = template(data);
        }
      } else {
        emailContent = template;
      }

      const mailOptions = {
        from: `"BandhaConnect" <${emailConfig.auth.user}>`,
        to: to,
        subject: emailContent.subject,
        html: emailContent.html
      };

      const result = await transporter.sendMail(mailOptions);
      console.log('Email sent successfully:', result.messageId);
      return { success: true, messageId: result.messageId };
    } catch (error) {
      console.error('Error sending email:', error);
      return { success: false, error: error.message };
    }
  },

  // Send role application submitted email
  sendRoleApplicationSubmitted: async (userData, roleType) => {
    return await emailService.sendEmail(
      userData.email,
      'roleApplicationSubmitted',
      { userData, roleType }
    );
  },

  // Send role application approved email
  sendRoleApplicationApproved: async (userData, roleType) => {
    const dashboardUrl = `${process.env.FRONTEND_URL || 'https://bc-project-pbiz.vercel.app'}/app/${roleType}/${userData.id}`;
    return await emailService.sendEmail(
      userData.email,
      'roleApplicationApproved',
      { userData, roleType, dashboardUrl }
    );
  },

  // Send role application rejected email
  sendRoleApplicationRejected: async (userData, roleType, reason) => {
    return await emailService.sendEmail(
      userData.email,
      'roleApplicationRejected',
      { userData, roleType, reason }
    );
  },

  // Send role status changed email
  sendRoleStatusChanged: async (userData, roleType, status, reason) => {
    return await emailService.sendEmail(
      userData.email,
      'roleStatusChanged',
      { userData, roleType, status, reason }
    );
  },

  // Send welcome email for new role
  sendWelcomeRole: async (userData, roleType) => {
    const dashboardUrl = `${process.env.FRONTEND_URL || 'https://bc-project-pbiz.vercel.app'}/app/${roleType}/${userData.id}`;
    return await emailService.sendEmail(
      userData.email,
      'welcomeRole',
      { userData, roleType, dashboardUrl }
    );
  },

  // Test email function
  sendTestEmail: async (to) => {
    const testData = {
      userData: {
        name: 'Test User',
        email: to
      },
      roleType: 'vendor'
    };
    return await emailService.sendEmail(to, 'roleApplicationSubmitted', testData);
  }
};

module.exports = emailService; 