require('dotenv').config();

console.log('🔧 Environment Variables Check:');
console.log('================================');
console.log('FRONTEND_URL:', process.env.FRONTEND_URL || 'NOT SET');
console.log('EMAIL_HOST:', process.env.EMAIL_HOST || 'NOT SET');
console.log('EMAIL_USER:', process.env.EMAIL_USER || 'NOT SET');
console.log('EMAIL_PASS:', process.env.EMAIL_PASS ? 'SET' : 'NOT SET');
console.log('NODE_ENV:', process.env.NODE_ENV || 'NOT SET');
console.log('PORT:', process.env.PORT || 'NOT SET');

console.log('\n📧 Testing URL Generation:');
console.log('================================');
const dashboardUrl = `${process.env.FRONTEND_URL || 'https://bc-project-pbiz.vercel.app'}/app/vendor/123456`;
console.log('Dashboard URL:', dashboardUrl);

const loginUrl = `${process.env.FRONTEND_URL || 'https://bc-project-pbiz.vercel.app'}/login`;
console.log('Login URL:', loginUrl);

console.log('\n✅ Test completed'); 