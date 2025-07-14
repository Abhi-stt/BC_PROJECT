# Email Notification System Setup Guide

## Overview
The BandhaConnect email notification system provides automated email notifications for role management workflows, including application submissions, approvals, rejections, and status changes.

## Features
- **Role Application Notifications**: Confirmation emails when users submit role applications
- **Approval/Rejection Emails**: Notifications when applications are approved or rejected
- **Status Change Notifications**: Emails when account status changes (suspended/activated)
- **Welcome Emails**: Welcome messages for new role users
- **Bulk Notifications**: Admin-triggered emails to specific role groups
- **Test Emails**: Email configuration testing functionality

## Email Templates
1. **Role Application Submitted**: Confirmation of application receipt
2. **Role Application Approved**: Congratulations and dashboard access
3. **Role Application Rejected**: Rejection reason and guidance
4. **Account Status Changed**: Status update notifications
5. **Welcome Email**: Getting started guide for new users
6. **Custom Notification**: Admin-created bulk messages

## Setup Instructions

### 1. Environment Variables
Add the following environment variables to your `.env` file:

```env
# Email Configuration
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
FRONTEND_URL=https://bc-project-pbiz.vercel.app
```

### 2. Gmail Setup (Recommended)
1. **Enable 2-Factor Authentication**:
   - Go to your Google Account settings
   - Navigate to Security
   - Enable 2-Step Verification

2. **Generate App Password**:
   - Go to Security settings
   - Click on "App passwords"
   - Select "Mail" and your device
   - Copy the generated 16-character password
   - Use this as your `EMAIL_PASS`

3. **Update Environment Variables**:
   ```env
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_USER=your-gmail@gmail.com
   EMAIL_PASS=your-16-char-app-password
   ```

### 3. Alternative Email Services

#### Outlook/Hotmail
```env
EMAIL_HOST=smtp-mail.outlook.com
EMAIL_PORT=587
EMAIL_USER=your-email@outlook.com
EMAIL_PASS=your-password
```

#### Yahoo
```env
EMAIL_HOST=smtp.mail.yahoo.com
EMAIL_PORT=587
EMAIL_USER=your-email@yahoo.com
EMAIL_PASS=your-app-password
```

#### Custom SMTP Server
```env
EMAIL_HOST=your-smtp-server.com
EMAIL_PORT=587
EMAIL_USER=your-email@domain.com
EMAIL_PASS=your-password
```

## Testing the Email System

### 1. Test Email Function
Use the admin panel's Email Management tab to send test emails:
1. Navigate to Admin Panel → Email Management
2. Click "Send Test Email"
3. Enter an email address
4. Click "Send Test Email"

### 2. API Testing
Test the email API directly:

```bash
# Send test email
curl -X POST http://localhost:5000/api/email/test \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN" \
  -d '{"email": "test@example.com"}'

# Send welcome email
curl -X POST http://localhost:5000/api/email/welcome \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN" \
  -d '{"userId": "USER_ID", "roleType": "vendor"}'

# Send bulk notification
curl -X POST http://localhost:5000/api/email/bulk \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN" \
  -d '{
    "roleType": "vendor",
    "subject": "Important Update",
    "message": "This is a test bulk notification."
  }'
```

## Email Workflow Integration

### Automatic Email Triggers
1. **Role Application Submitted**: Triggered when user submits application
2. **Role Application Approved**: Triggered when admin approves application
3. **Role Application Rejected**: Triggered when admin rejects application
4. **Account Status Changed**: Triggered when admin changes user status
5. **Welcome Email**: Can be manually triggered from admin panel

### Manual Email Actions
1. **Test Emails**: Verify email configuration
2. **Bulk Notifications**: Send custom messages to role groups
3. **Welcome Emails**: Send welcome messages to specific users

## Email Templates Customization

### Template Structure
All email templates are defined in `email.service.js` and include:
- **Subject Line**: Dynamic subject based on email type
- **HTML Content**: Responsive email design with branding
- **Dynamic Data**: User information, role types, and custom content

### Customizing Templates
1. **Modify Template Content**: Edit the HTML in `emailTemplates` object
2. **Add New Templates**: Create new template functions
3. **Update Styling**: Modify CSS classes and colors
4. **Add Dynamic Content**: Include user-specific information

### Template Variables
- `userData`: User information (name, email, phone)
- `roleType`: Role type (vendor, counselor, community)
- `status`: Account status (active, suspended)
- `reason`: Rejection or status change reason
- `dashboardUrl`: Link to user's dashboard

## Troubleshooting

### Common Issues

1. **Authentication Failed**:
   - Verify email credentials
   - Check if 2FA is enabled (for Gmail)
   - Ensure app password is correct

2. **Connection Timeout**:
   - Check firewall settings
   - Verify SMTP port (587 for TLS, 465 for SSL)
   - Test with different email providers

3. **Emails Not Sending**:
   - Check server logs for errors
   - Verify environment variables
   - Test with simple SMTP configuration

4. **Emails Going to Spam**:
   - Configure SPF records
   - Set up DKIM authentication
   - Use reputable email service

### Debug Mode
Enable debug logging by adding to your environment:
```env
DEBUG=email:*
```

### Logs
Check server logs for email-related errors:
```bash
# View email service logs
tail -f logs/email.log

# Check application logs
tail -f logs/app.log
```

## Security Considerations

1. **Environment Variables**: Never commit email credentials to version control
2. **Rate Limiting**: Implement rate limiting for email endpoints
3. **Input Validation**: Validate email addresses and content
4. **Authentication**: Ensure only admins can send bulk emails
5. **Monitoring**: Monitor email sending patterns for abuse

## Performance Optimization

1. **Queue System**: Implement email queuing for bulk sends
2. **Batch Processing**: Send emails in batches
3. **Caching**: Cache email templates
4. **Monitoring**: Track email delivery rates and bounce rates

## Next Steps

1. **Email Analytics**: Implement email tracking and analytics
2. **Template Editor**: Create admin interface for template editing
3. **Scheduled Emails**: Add support for scheduled email campaigns
4. **Email Preferences**: Allow users to manage email preferences
5. **Advanced Templates**: Add support for rich media and attachments 