# Project App Backend

A fully functional REST API backend for a project/task management application built with Node.js, Express, and Prisma ORM.

## Features

- ✅ RESTful API endpoints for task management
- ✅ MySQL database integration with Prisma ORM
- ✅ CORS enabled for frontend integration
- ✅ Environment configuration with dotenv
- ✅ Error handling and validation
- ✅ Health check endpoint

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MySQL
- **ORM**: Prisma
- **CORS**: Enabled for cross-origin requests

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/tasks` | Get all tasks |
| POST | `/tasks` | Create a new task |
| PUT | `/tasks/:id` | Update task progress |
| DELETE | `/tasks/:id` | Delete a task |
| GET | `/health` | Health check |

## Installation & Setup

### Prerequisites

- Node.js (v16 or higher)
- MySQL server
- npm or yarn

### 1. Clone and Install

```bash
# Install dependencies
npm install

# Install Prisma CLI globally (optional)
npm install -g prisma
```

### 2. Database Setup

1. Create a MySQL database named `project_app_db`
2. Update the `.env` file with your database credentials:

```env
DATABASE_URL="mysql://username:password@localhost:3306/project_app_db"
PORT=5000
```

### 3. Database Migration

```bash
# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma migrate dev --name init

# (Optional) Reset database
npx prisma migrate reset
```

### 4. Start the Server

```bash
# Development mode with nodemon
npm run dev

# Production mode
npm start
```

The server will start on `http://localhost:5000`

## Usage Examples

### Create a new task
```bash
curl -X POST http://localhost:5000/tasks \
  -H "Content-Type: application/json" \
  -d '{
    "taskName": "Complete project documentation",
    "detail": "Write comprehensive documentation for the project",
    "dueDate": "2024-12-31",
    "progress": "In Progress"
  }'
```

### Get all tasks
```bash
curl http://localhost:5000/tasks
```

### Update task progress
```bash
curl -X PUT http://localhost:5000/tasks/1 \
  -H "Content-Type: application/json" \
  -d '{"progress": "Completed"}'
```

## Project Structure

```
project-app-backend/
├── src/
│   ├── app.ts
│   └── routes/
│       └── appRoutes.ts
├── prisma/
│   ├── schema.prisma
│   └── migrations/
├── server.js
├── package.json
├── .env
├── .gitignore
└── README.md
```

## Development

### Available Scripts

- `npm start` - Start the server
- `npm run dev` - Start with nodemon for development
- `npm run db:generate` - Generate Prisma client
- `npm run db:migrate` - Run database migrations
- `npm run db:reset` - Reset database

## Troubleshooting

### Common Issues

1. **Database connection failed**: Check your `.env` file for correct database URL
2. **Prisma client not found**: Run `npx prisma generate`
3. **Migration errors**: Ensure MySQL is running and database exists

### Environment Variables

Make sure your `.env` file contains:
```env
DATABASE_URL="mysql://username:password@localhost:3306/project_app_db"
PORT=5000
```

## License

ISC
