# Subject EduQi Backend

A NestJS API with Prisma ORM for managing educational subjects, subtopics, and questions.

## Features

- **NestJS** framework for building scalable server-side applications
- **Prisma ORM** for database management
- **PostgreSQL** database support
- RESTful API for managing Subjects, Subtopics, and Questions
- Authentication with JWT
- Question management with validation system
- Swagger documentation

## Deploy to Vercel

### Step 1: Configure Database

You'll need a PostgreSQL database. You can use:
- [Supabase](https://supabase.com) (free tier available)
- [Neon](https://neon.tech) (free tier available)
- [Railway](https://railway.app) (free tier available)

### Step 2: Deploy Backend to Vercel

1. Push your code to GitHub
2. Go to [Vercel Dashboard](https://vercel.com/dashboard)
3. Import your GitHub repository
4. Set the following environment variables in Vercel:

#### Required Environment Variables:
- `DATABASE_URL`: Your PostgreSQL connection string
- `JWT_SECRET`: A secure random string for JWT signing

#### Optional Environment Variables:
- `CORS_ORIGINS`: Comma-separated list of allowed origins (defaults include your frontend)
- `PORT`: Port number (default: 8080)

### Step 3: Configure Frontend

Update your frontend to use the Vercel backend URL:
```javascript
// Replace localhost with your Vercel backend URL
const API_BASE_URL = 'https://your-backend.vercel.app';
```

## Local Development

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MySQL or PostgreSQL database

## Installation

```bash
# Clone the repository
git clone <repository-url>

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Update DATABASE_URL in .env with your database credentials
```

## Database Configuration

### PostgreSQL (default)
```env
DATABASE_URL="postgresql://user:password@localhost:5432/eduqi_db"
```

### MySQL
Update `prisma/schema.prisma` datasource provider:
```prisma
datasource db {
  provider = "mysql"
}
```

Then update `.env`:
```env
DATABASE_URL="mysql://user:password@localhost:3306/eduqi_db"
```

## Database Setup

```bash
# Generate Prisma Client
npx prisma generate

# Create and apply migrations
npx prisma migrate dev --name init

# (Optional) Open Prisma Studio to view your data
npx prisma studio
```

## Running the Application

```bash
# Development mode
npm run start:dev

# Production mode
npm run build
npm run start:prod
```

The API will be available at `http://localhost:3000`

## API Endpoints

### Subjects

- **GET** `/subjects` - Get all subjects (includes subtopics)
- **GET** `/subjects/:id` - Get a specific subject by ID
- **POST** `/subjects` - Create a new subject
  ```json
  {
    "name": "Mathematics",
    "description": "Mathematics subject"
  }
  ```
- **PATCH** `/subjects/:id` - Update a subject
  ```json
  {
    "name": "Advanced Mathematics",
    "description": "Updated description"
  }
  ```
- **DELETE** `/subjects/:id` - Delete a subject (cascades to subtopics)

### Subtopics

- **GET** `/subtopics` - Get all subtopics (includes subject)
- **GET** `/subtopics/:id` - Get a specific subtopic by ID
- **GET** `/subtopics/subject/:subjectId` - Get all subtopics for a specific subject
- **POST** `/subtopics` - Create a new subtopic
  ```json
  {
    "name": "Algebra",
    "description": "Basic algebra concepts",
    "subjectId": 1
  }
  ```
- **PATCH** `/subtopics/:id` - Update a subtopic
  ```json
  {
    "name": "Advanced Algebra",
    "description": "Updated description"
  }
  ```
- **DELETE** `/subtopics/:id` - Delete a subtopic

## Database Schema

### Subject
- `id` (Int, Primary Key, Auto-increment)
- `name` (String)
- `description` (String, Optional)
- `createdAt` (DateTime)
- `updatedAt` (DateTime)
- `subtopics` (Relation to Subtopic[])

### Subtopic
- `id` (Int, Primary Key, Auto-increment)
- `name` (String)
- `description` (String, Optional)
- `subjectId` (Int, Foreign Key)
- `subject` (Relation to Subject)
- `createdAt` (DateTime)
- `updatedAt` (DateTime)

## Project Structure

```
src/
├── subjects/
│   ├── dto/
│   │   ├── create-subject.dto.ts
│   │   └── update-subject.dto.ts
│   ├── subjects.controller.ts
│   ├── subjects.service.ts
│   └── subjects.module.ts
├── subtopics/
│   ├── dto/
│   │   ├── create-subtopic.dto.ts
│   │   └── update-subtopic.dto.ts
│   ├── subtopics.controller.ts
│   ├── subtopics.service.ts
│   └── subtopics.module.ts
├── prisma.service.ts
├── app.module.ts
└── main.ts

prisma/
└── schema.prisma
```

## Testing

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Test coverage
npm run test:cov
```

## License

MIT
