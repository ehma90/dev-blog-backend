# Dev-Blog Backend API

A comprehensive NestJS backend API for a modern blog application with user authentication, blog post management, and MongoDB integration.

## 🚀 Features

- **User Authentication & Authorization**
  - JWT-based authentication
  - User registration and login
  - Protected routes with guards
  - Token refresh functionality
  - Current user profile management

- **Blog Post Management**
  - CRUD operations for blog posts
  - Author-based post ownership
  - Rich post content with metadata
  - Tag system for categorization
  - Public and private post access

- **Database Integration**
  - MongoDB with Mongoose ODM
  - User and Post schemas
  - Data validation and relationships
  - Timestamps and indexing

- **API Features**
  - RESTful API design
  - Input validation with DTOs
  - Error handling and status codes
  - CORS enabled for frontend integration
  - Environment-based configuration

## 🛠️ Tech Stack

- **Framework:** NestJS (Node.js)
- **Database:** MongoDB with Mongoose
- **Authentication:** JWT (JSON Web Tokens)
- **Validation:** class-validator & class-transformer
- **Language:** TypeScript
- **Testing:** HTTP test files with REST Client

## 📋 Prerequisites

- Node.js (v18 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn package manager

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/ehma90/dev-blog-backend.git
cd dev-blog-backend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Setup

Create a `.env` file in the root directory:

```env
# Database
MONGODB_URI="mongodb+srv://username:password@cluster.mongodb.net/dev-blog-test?retryWrites=true&w=majority&appName=ClusterName"

# JWT
JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"

# Server
PORT="4000"
```

### 4. Start the Application

```bash
# Development mode
npm run start:dev

# Production mode
npm run build
npm run start:prod
```

The server will start on `http://localhost:4000` (or your specified PORT).

## 📚 API Documentation

### Authentication Endpoints

#### POST /auth/register

Register a new user account.

**Request Body:**

```json
{
  "fullName": "John Doe",
  "email": "john.doe@example.com",
  "password": "password123"
}
```

**Response:**

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "68b72134473c194c2829025c",
    "fullName": "John Doe",
    "email": "john.doe@example.com"
  }
}
```

#### POST /auth/login

Login with existing credentials.

**Request Body:**

```json
{
  "email": "john.doe@example.com",
  "password": "password123"
}
```

**Response:**

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "68b72134473c194c2829025c",
    "fullName": "John Doe",
    "email": "john.doe@example.com"
  }
}
```

#### GET /auth/me

Get current user information. **Requires Authentication**

**Headers:**

```
Authorization: Bearer <jwt_token>
```

**Response:**

```json
{
  "id": "68b72134473c194c2829025c",
  "fullName": "John Doe",
  "email": "john.doe@example.com"
}
```

#### POST /auth/refresh

Refresh the JWT token. **Requires Authentication**

**Headers:**

```
Authorization: Bearer <jwt_token>
```

**Response:**

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "68b72134473c194c2829025c",
    "fullName": "John Doe",
    "email": "john.doe@example.com"
  }
}
```

#### POST /auth/logout

Logout the current user. **Requires Authentication**

**Headers:**

```
Authorization: Bearer <jwt_token>
```

**Response:**

```json
{
  "message": "Logged out successfully"
}
```

### Blog Post Endpoints

#### GET /posts

Get all blog posts. **Publicly Accessible**

**Response:**

```json
[
  {
    "_id": "68b72431473c194c28290262",
    "title": "Getting Started with NestJS",
    "authorName": "John Doe",
    "excerpt": "A comprehensive introduction to NestJS framework.",
    "tags": ["nestjs", "nodejs", "typescript", "backend"],
    "content": "NestJS is a progressive Node.js framework...",
    "authorId": {
      "_id": "68b72134473c194c2829025c",
      "fullName": "John Doe",
      "email": "john.doe@example.com"
    },
    "createdAt": "2024-01-02T10:30:00.000Z",
    "updatedAt": "2024-01-02T10:30:00.000Z"
  }
]
```

#### GET /posts/:id

Get a specific blog post by ID. **Publicly Accessible**

**Response:**

```json
{
  "_id": "68b72431473c194c28290262",
  "title": "Getting Started with NestJS",
  "authorName": "John Doe",
  "excerpt": "A comprehensive introduction to NestJS framework.",
  "tags": ["nestjs", "nodejs", "typescript", "backend"],
  "content": "NestJS is a progressive Node.js framework...",
  "authorId": {
    "_id": "68b72134473c194c2829025c",
    "fullName": "John Doe",
    "email": "john.doe@example.com"
  },
  "createdAt": "2024-01-02T10:30:00.000Z",
  "updatedAt": "2024-01-02T10:30:00.000Z"
}
```

#### GET /posts/my-posts

Get current user's blog posts. **Requires Authentication**

**Headers:**

```
Authorization: Bearer <jwt_token>
```

#### POST /posts

Create a new blog post. **Requires Authentication**

**Headers:**

```
Authorization: Bearer <jwt_token>
```

**Request Body:**

```json
{
  "title": "My First Blog Post",
  "authorName": "John Doe",
  "excerpt": "A comprehensive guide to getting started with web development.",
  "tags": ["web-development", "programming", "tutorial"],
  "content": "This is the content of my first blog post..."
}
```

#### PATCH /posts/:id

Update a blog post. **Requires Authentication** (only author can update)

**Headers:**

```
Authorization: Bearer <jwt_token>
```

**Request Body:**

```json
{
  "title": "Updated Blog Post Title",
  "authorName": "John Doe",
  "excerpt": "Updated excerpt for the blog post.",
  "tags": ["updated", "web-development", "programming"],
  "content": "This is the updated content of the blog post."
}
```

#### DELETE /posts/:id

Delete a blog post. **Requires Authentication** (only author can delete)

**Headers:**

```
Authorization: Bearer <jwt_token>
```

**Response:**

```json
{
  "message": "Post deleted successfully"
}
```

## 🗄️ Database Schema

### User Schema

```typescript
{
  _id: ObjectId,
  fullName: string,
  email: string (unique),
  password: string (hashed),
  createdAt: Date,
  updatedAt: Date
}
```

### Post Schema

```typescript
{
  _id: ObjectId,
  title: string,
  authorName: string,
  excerpt: string,
  tags: string[],
  content: string,
  authorId: ObjectId (reference to User),
  createdAt: Date,
  updatedAt: Date
}
```

## 🧪 Testing

### HTTP Test Files

The project includes comprehensive HTTP test files for API testing:

- **`http-tests/auth.http`** - Authentication endpoint tests
- **`http-tests/posts.http`** - Blog post CRUD operation tests
- **`http-tests/complete-flow.http`** - End-to-end workflow examples

### Using VS Code REST Client

1. Install the "REST Client" extension in VS Code
2. Open any `.http` file
3. Click "Send Request" above each request to test it

### Using Other HTTP Clients

Copy requests from the `.http` files into:

- Postman
- Insomnia
- curl commands
- Any other HTTP client

### Example Test Workflow

1. **Start the server:**

   ```bash
   npm run start:dev
   ```

2. **Test user registration:**

   ```http
   POST http://localhost:4000/auth/register
   Content-Type: application/json

   {
     "fullName": "Test User",
     "email": "test@example.com",
     "password": "password123"
   }
   ```

3. **Test user login:**

   ```http
   POST http://localhost:4000/auth/login
   Content-Type: application/json

   {
     "email": "test@example.com",
     "password": "password123"
   }
   ```

4. **Use the returned token for authenticated requests**

## 🔒 Security Features

- **JWT Authentication:** Secure token-based authentication
- **Password Hashing:** bcryptjs for password security
- **Input Validation:** DTOs with class-validator
- **Route Protection:** Guards for protected endpoints
- **CORS:** Enabled for frontend integration
- **Environment Variables:** Secure configuration management

## 📁 Project Structure

```
src/
├── auth/                    # Authentication module
│   ├── dto/                # Data Transfer Objects
│   │   └── auth.dto.ts
│   ├── auth.controller.ts  # Auth endpoints
│   ├── auth.service.ts     # Auth business logic
│   ├── auth.module.ts      # Auth module configuration
│   └── jwt.strategy.ts     # JWT strategy
├── users/                  # User management module
│   ├── schemas/            # Database schemas
│   │   └── user.schema.ts
│   ├── users.service.ts    # User business logic
│   └── users.module.ts     # User module configuration
├── posts/                  # Blog post module
│   ├── dto/                # Data Transfer Objects
│   │   └── post.dto.ts
│   ├── schemas/            # Database schemas
│   │   └── post.schema.ts
│   ├── posts.controller.ts # Post endpoints
│   ├── posts.service.ts    # Post business logic
│   └── posts.module.ts     # Post module configuration
├── common/                 # Shared utilities
│   ├── guards/             # Authentication guards
│   │   └── jwt-auth.guard.ts
│   ├── interfaces/         # TypeScript interfaces
│   │   └── auth-user.interface.ts
│   └── dto/                # Shared DTOs
├── app.module.ts           # Main application module
├── app.controller.ts       # Main controller
├── app.service.ts          # Main service
└── main.ts                 # Application entry point
```

## 🚀 Deployment

### Environment Variables for Production

```env
MONGODB_URI="your-production-mongodb-uri"
JWT_SECRET="your-super-secure-jwt-secret"
PORT="4000"
NODE_ENV="production"
```

### Build for Production

```bash
npm run build
npm run start:prod
```

### Docker Deployment (Optional)

Create a `Dockerfile`:

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY dist ./dist

EXPOSE 4000

CMD ["node", "dist/main"]
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/ehma90/dev-blog-backend/issues) page
2. Create a new issue with detailed information
3. Contact the maintainer

## 🔄 API Versioning

Current API version: **v1**

Base URL: `http://localhost:4000`

All endpoints are prefixed with their respective modules:

- Authentication: `/auth/*`
- Posts: `/posts/*`

## 📊 Error Handling

The API returns standard HTTP status codes:

- `200 OK` - Successful request
- `201 Created` - Resource created successfully
- `400 Bad Request` - Invalid request data
- `401 Unauthorized` - Invalid or missing authentication
- `404 Not Found` - Resource not found
- `409 Conflict` - Email already exists
- `500 Internal Server Error` - Server error

## 🔧 Development Scripts

```bash
# Development
npm run start:dev          # Start in development mode with hot reload
npm run start:debug        # Start in debug mode

# Building
npm run build              # Build the application
npm run start:prod         # Start in production mode

# Testing
npm run test               # Run unit tests
npm run test:watch         # Run tests in watch mode
npm run test:cov           # Run tests with coverage
npm run test:e2e           # Run end-to-end tests

# Code Quality
npm run lint               # Run ESLint
npm run format             # Format code with Prettier
```

---

**Built with ❤️ using NestJS, MongoDB, and TypeScript**
