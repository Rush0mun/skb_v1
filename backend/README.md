# Shotokan Karate Bangladesh - Backend API

This is the backend API for the Shotokan Karate Bangladesh website, built with Node.js, Express.js, and MongoDB.

## Features

- **Authentication & Authorization**: JWT-based authentication with role-based access control
- **Member Management**: CRUD operations for karate members
- **Notice Management**: Handle notices, events, and tournaments
- **Gallery Management**: Manage gallery images
- **Tournament Registration**: Handle tournament registrations with validation
- **Security**: Rate limiting, CORS, helmet, input validation
- **Error Handling**: Comprehensive error handling and logging

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn

## Installation

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file and configure your environment variables:
   ```env
   MONGODB_URI=mongodb://localhost:27017/shotokan-karate-bd
   JWT_SECRET=your-super-secret-jwt-key
   PORT=5000
   NODE_ENV=development
   FRONTEND_URL=http://localhost:3000
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new admin user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user
- `POST /api/auth/logout` - Logout user

### Members
- `GET /api/members` - Get all members (with pagination and search)
- `GET /api/members/:id` - Get single member
- `POST /api/members` - Create new member
- `PUT /api/members/:id` - Update member (Admin only)
- `DELETE /api/members/:id` - Delete member (Admin only)

### Notices
- `GET /api/notices` - Get all notices (with filtering)
- `GET /api/notices/:id` - Get single notice
- `POST /api/notices` - Create new notice (Admin only)
- `PUT /api/notices/:id` - Update notice (Admin only)
- `DELETE /api/notices/:id` - Delete notice (Admin only)
- `POST /api/notices/:id/register` - Register for tournament
- `GET /api/notices/:id/registrations` - Get tournament registrations (Admin only)

### Gallery
- `GET /api/gallery` - Get all gallery images
- `GET /api/gallery/:id` - Get single gallery image
- `POST /api/gallery` - Add new gallery image (Admin only)
- `PUT /api/gallery/:id` - Update gallery image (Admin only)
- `DELETE /api/gallery/:id` - Delete gallery image (Admin only)

## Database Models

### User
- username, email, password, role, isActive, lastLogin

### Member
- Personal information (name, father/mother name, addresses)
- Contact information (mobile, email)
- Identity information (NID, passport, birth certificate)
- Karate-specific (belt, SKB ID, join date, achievements)

### Notice
- title, content, category (notice/event/tournament)
- date, location, organizer, contact info
- Tournament-specific fields (rules, prize structure, registration deadline)

### GalleryImage
- title, description, imageUrl, altText, category

### TournamentRegistration
- name, skbId, tournamentId, registrationDate, status

## Security Features

- JWT authentication with 7-day expiration
- Password hashing with bcrypt
- Rate limiting (100 requests/15min, 5 auth requests/15min)
- CORS configuration
- Helmet for security headers
- Input validation and sanitization
- Role-based access control

## Error Handling

The API includes comprehensive error handling for:
- Validation errors
- Authentication/authorization errors
- Database errors
- Rate limiting
- 404 endpoints
- Server errors

## Development

- `npm run dev` - Start development server with nodemon
- `npm start` - Start production server

## Environment Variables

Required environment variables:
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT tokens
- `PORT` - Server port (default: 5000)
- `NODE_ENV` - Environment (development/production)
- `FRONTEND_URL` - Frontend URL for CORS

Optional (for image uploads):
- `CLOUDINARY_CLOUD_NAME`
- `CLOUDINARY_API_KEY`
- `CLOUDINARY_API_SECRET`

## Production Deployment

1. Set `NODE_ENV=production`
2. Use a strong `JWT_SECRET`
3. Configure MongoDB Atlas or secure MongoDB instance
4. Set up proper CORS origins
5. Configure reverse proxy (nginx)
6. Set up SSL/TLS certificates
7. Configure logging and monitoring

## API Response Format

All API responses follow this format:

```json
{
  "success": true/false,
  "message": "Response message",
  "data": {
    // Response data
  },
  "errors": [
    // Validation errors (if any)
  ]
}
```

## Testing

You can test the API endpoints using tools like:
- Postman
- Insomnia
- curl
- Thunder Client (VS Code extension)

Example login request:
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username": "admin", "password": "password123"}'
```