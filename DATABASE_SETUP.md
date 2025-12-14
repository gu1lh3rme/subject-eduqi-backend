# Database Setup Guide

This guide will help you set up your database for the Subject EduQi Backend API.

## Prerequisites

You need to have either MySQL or PostgreSQL installed and running.

## Step-by-Step Setup

### 1. Choose Your Database

#### PostgreSQL (Default)

1. Install PostgreSQL if not already installed
2. Create a database:
   ```sql
   CREATE DATABASE eduqi_db;
   ```

3. Update your `.env` file:
   ```env
   DATABASE_URL="postgresql://username:password@localhost:5432/eduqi_db"
   ```

#### MySQL

1. Install MySQL if not already installed
2. Create a database:
   ```sql
   CREATE DATABASE eduqi_db;
   ```

3. Update `prisma/schema.prisma` datasource:
   ```prisma
   datasource db {
     provider = "mysql"
   }
   ```

4. Update your `.env` file:
   ```env
   DATABASE_URL="mysql://username:password@localhost:3306/eduqi_db"
   ```

### 2. Generate Prisma Client

```bash
npx prisma generate
```

### 3. Create and Apply Migrations

```bash
# Create migration
npx prisma migrate dev --name init

# This will:
# - Create a migration file in prisma/migrations/
# - Apply the migration to your database
# - Generate the Prisma Client
```

### 4. Verify Your Setup

You can use Prisma Studio to view your database:

```bash
npx prisma studio
```

This will open a web interface at `http://localhost:5555` where you can view and edit your data.

## Database Schema

The migration will create two tables:

### Subject Table
- `id` - Auto-incrementing primary key
- `name` - Subject name (required)
- `description` - Optional description
- `createdAt` - Timestamp when created
- `updatedAt` - Timestamp when last updated

### Subtopic Table
- `id` - Auto-incrementing primary key
- `name` - Subtopic name (required)
- `description` - Optional description
- `subjectId` - Foreign key to Subject table
- `createdAt` - Timestamp when created
- `updatedAt` - Timestamp when last updated

## Troubleshooting

### Connection Issues

If you can't connect to your database:

1. Verify the database server is running
2. Check your credentials in the `.env` file
3. Ensure the database exists
4. Check firewall settings

### Migration Issues

If migrations fail:

```bash
# Reset the database (WARNING: This will delete all data)
npx prisma migrate reset

# Create a new migration
npx prisma migrate dev --name init
```

### Switching Databases

To switch from PostgreSQL to MySQL or vice versa:

1. Update the `provider` in `prisma/schema.prisma`
2. Update the `DATABASE_URL` in `.env`
3. Delete the `prisma/migrations` folder
4. Run `npx prisma migrate dev --name init` to create new migrations

## Example Data

After setting up the database, you can add some example data:

1. Start the API: `npm run start:dev`

2. Create a subject:
   ```bash
   curl -X POST http://localhost:3000/subjects \
     -H "Content-Type: application/json" \
     -d '{"name": "Mathematics", "description": "All about mathematics"}'
   ```

3. Create subtopics:
   ```bash
   curl -X POST http://localhost:3000/subtopics \
     -H "Content-Type: application/json" \
     -d '{"name": "Algebra", "description": "Basic algebra", "subjectId": 1}'
   ```

4. View all subjects with their subtopics:
   ```bash
   curl http://localhost:3000/subjects
   ```
