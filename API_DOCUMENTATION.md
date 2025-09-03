# Dev-Blog Backend API Documentation

## Overview

This is a NestJS backend API for a blog application with user authentication and blog post management.

## Setup

### Prerequisites

- Node.js (v18 or higher)
- MongoDB
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies: `npm install`
3. Copy `.env.example` to `.env` and configure your environment variables
4. Start MongoDB
5. Run the application: `npm run start:dev`

### Environment Variables

```env
MONGODB_URI=mongodb://localhost:27017/dev-blog
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
PORT=4000
```

## API Endpoints

### Authentication

#### POST /auth/register

Register a new user.

**Request Body:**

```json
{
  "fullName": "string",
  "email": "string",
  "password": "string"
}
```

**Response:**

```json
{
  "access_token": "string",
  "user": {
    "id": "string",
    "fullName": "string",
    "email": "string"
  }
}
```

#### POST /auth/login

Login with existing credentials.

**Request Body:**

```json
{
  "email": "string",
  "password": "string"
}
```

**Response:**

```json
{
  "access_token": "string",
  "user": {
    "id": "string",
    "fullName": "string",
    "email": "string"
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
  "id": "string",
  "fullName": "string",
  "email": "string"
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
  "access_token": "string",
  "user": {
    "id": "string",
    "fullName": "string",
    "email": "string"
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

### Posts

#### GET /posts

Get all blog posts.

**Response:**

```json
[
  {
    "_id": "string",
    "title": "string",
    "authorName": "string",
    "excerpt": "string",
    "tags": ["string"],
    "content": "string",
    "authorId": {
      "_id": "string",
      "fullName": "string",
      "email": "string"
    },
    "createdAt": "string",
    "updatedAt": "string"
  }
]
```

#### GET /posts/:id

Get a specific blog post by ID.

**Response:**

```json
{
  "_id": "string",
  "title": "string",
  "authorName": "string",
  "excerpt": "string",
  "tags": ["string"],
  "content": "string",
  "authorId": {
    "_id": "string",
    "fullName": "string",
    "email": "string"
  },
  "createdAt": "string",
  "updatedAt": "string"
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
  "title": "string",
  "authorName": "string",
  "excerpt": "string",
  "tags": ["string"],
  "content": "string"
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
  "title": "string",
  "authorName": "string",
  "excerpt": "string",
  "tags": ["string"],
  "content": "string"
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

## Authentication

The API uses JWT (JSON Web Tokens) for authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

## Error Responses

The API returns standard HTTP status codes and error messages:

- `400 Bad Request` - Invalid request data
- `401 Unauthorized` - Invalid or missing authentication
- `404 Not Found` - Resource not found
- `409 Conflict` - Email already exists
- `500 Internal Server Error` - Server error

## Data Models

### User

```typescript
{
  _id: ObjectId,
  fullName: string,
  email: string,
  password: string (hashed),
  createdAt: Date,
  updatedAt: Date
}
```

### Post

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
