# BandhanConnect

A comprehensive matrimonial application with modern features for finding life partners.

## Features

- **User Authentication**: Secure login/register with JWT tokens
- **Profile Management**: Complete user profiles with photos and preferences
- **Smart Matching**: AI-powered matching algorithm
- **Real-time Messaging**: Chat with potential matches
- **Events & Community**: Join matrimonial events and community discussions
- **Counseling Services**: Professional relationship counseling
- **Wedding Planning**: Tools for wedding planning and budgeting
- **Admin Dashboard**: Comprehensive admin panel for management

## Tech Stack

### Frontend
- React 18 with TypeScript
- Vite for build tooling
- Tailwind CSS for styling
- React Router for navigation
- Axios for API calls
- Lucide React for icons

### Backend
- Node.js with Express
- MongoDB with Mongoose
- JWT for authentication
- bcryptjs for password hashing
- CORS enabled

## Prerequisites

- Node.js (v16 or higher)
- MongoDB (running locally or cloud instance)
- npm or yarn

## Installation

### 1. Clone the repository
```bash
git clone <repository-url>
cd BandhaConnect
```

### 2. Install Backend Dependencies
```bash
cd Project/BE
npm install
```

### 3. Install Frontend Dependencies
```bash
cd ../FE
npm install
```

### 4. Set up MongoDB
Make sure MongoDB is running on your system. The application will connect to `mongodb://localhost:27017/bandhaconnect`.

### 5. Seed the Database
```bash
cd ../BE
npm run seed
```

This will create sample users for testing:
- **Demo User**: demo@bandhan.com / password
- **Admin User**: admin@bandhan.com / password
- **Sample Users**: Various test profiles

## Running the Application

### Start the Backend Server
```bash
cd Project/BE
npm run dev
```

The backend will start on `http://localhost:5000`

### Start the Frontend Development Server
```bash
cd Project/FE
npm run dev
```

The frontend will start on `http://localhost:5173`

## API Endpoints

### Authentication
- `POST /api/users/register` - Register new user
- `POST /api/users/login` - User login
- `GET /api/users/profile` - Get user profile (authenticated)
- `PUT /api/users/profile` - Update user profile (authenticated)

### Matches
- `GET /api/matches` - Get potential matches
- `POST /api/matches/like` - Like a user
- `POST /api/matches/reject` - Reject a user
- `GET /api/matches/liked` - Get liked users

### Messages
- `GET /api/messages/conversations` - Get conversation list
- `GET /api/messages/:userId` - Get messages with specific user
- `POST /api/messages` - Send a message
- `PUT /api/messages/:id/read` - Mark message as read

### Other Features
- Events, Services, Counseling, Community, and more endpoints available

## Project Structure

```
BandhaConnect/
├── Project/
│   ├── BE/                 # Backend
│   │   ├── routes/         # API routes
│   │   ├── *.schema.js     # MongoDB schemas
│   │   ├── middleware/     # Auth middleware
│   │   ├── app.js          # Main server file
│   │   └── seed.js         # Database seeder
│   └── FE/                 # Frontend
│       ├── src/
│       │   ├── components/ # React components
│       │   ├── pages/      # Page components
│       │   ├── contexts/   # React contexts
│       │   ├── services/   # API services
│       │   └── data/       # Sample data
│       └── package.json
└── README.md
```

## Testing the Application

1. **Login**: Use the demo credentials to log in
2. **Browse Matches**: View potential matches on the matches page
3. **Send Messages**: Start conversations with matches
4. **Explore Features**: Navigate through different sections like Events, Services, etc.

## Development Notes

- The frontend uses mock data fallbacks when the backend is not available
- All API calls include proper error handling
- Authentication tokens are automatically managed
- CORS is configured for local development

## Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Ensure MongoDB is running
   - Check if the connection string is correct

2. **Port Already in Use**
   - Change the port in the respective configuration files
   - Kill processes using the required ports

3. **CORS Errors**
   - Ensure the backend CORS configuration matches the frontend URL
   - Check if both servers are running

4. **Authentication Issues**
   - Clear browser localStorage
   - Check if JWT tokens are being sent correctly

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License. 