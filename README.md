Cairo Financial Holding - Task Management API
This repository contains the source code for the Task Management API, a backend application that allows users to manage tasks. The API provides features like creating, updating, retrieving, and deleting tasks, as well as user authentication through JWT (JSON Web Token).

The project uses Clever Cloud to host the MySQL database.

Table of Contents
Installation
Setup
API Documentation
Assumptions and Design Decisions
Installation


Follow these steps to set up the project locally:

1. Clone the Repository
git clone https://github.com/hashim-salah-alden/Cairo-Financial-Holding--task.git

cd Cairo-Financial-Holding--task-main

3. Install Dependencies
Install all necessary dependencies using npm or yarn:

npm install
# or
yarn install

3. Set Up Environment Variables
Create a .env file in the root directory of the project with the following variables:

DATABASE_URL="your-mysql-connection-string"
JWT_SECRET="your-secret-key"
PORT=5000
DATABASE_URL: The MySQL database connection string.
JWT_SECRET: A secret key used for signing JWT tokens.
PORT: The port on which the API will run.

4. Start the Server
   
Start the development server using:

npm start

The server will run on http://localhost:5000.

Setup
After setting up the application, you should be able to:

Access the API endpoints.
Use Postman or any API testing tool to interact with the API.
Open the Swagger UI for interactive API documentation.
Swagger documentation can be accessed at:

http://localhost:5000/api-docs
API Documentation
The API follows RESTful principles and includes the following routes:

Authentication

POST /api/auth/register: Register a new user

Request Body:
{
  "email": "user@example.com",
  "password": "StrongPassword123!",
  "name": "test"
}

Response:
{
  "id": "unique-id",
  "email": "user@example.com",
  "name": "test",
  "createdAt": "2023-10-14T12:34:56Z"
}



POST /api/auth/login: Login a user and receive a JWT

Request Body:
{
  "email": "user@example.com",
  "password": "StrongPassword123!"
}

Response:
{
  "token": "JWT-token",
  "user": {
    "id": "unique-id",
    "email": "user@example.com",
    "name": "John Doe"
  }
}



Tasks

GET /api/tasks: Retrieve all tasks for the authenticated user
Headers:
Authorization: Bearer <JWT>
Response:
  {
    "id": "task-id",
    "title": "Complete API documentation",
    "description": "Write Swagger documentation for Task API",
    "userId": "creator-id",
    "createdAt": "2023-10-14T12:34:56Z"
  }



POST /tasks: Create a new task

Request Body:
{
  "title": "Complete API documentation",
  "description": "Write Swagger documentation for Task API",
  "dueDate": "2025-01-01T00:00:00.000Z"
}

Response:
{
  "id": "new-task-id",
  "title": "Complete API documentation",
  "description": "Write Swagger documentation for Task API",
  "createdAt": "2023-10-14T12:34:56Z"
}



PUT /tasks/{id}: Update an existing task

Request Body:
{
  "title": "Updated task title",
  "description": "Updated task description"
}

Response:
{
  "id": "updated-task-id",
  "title": "Updated task title",
  "description": "Updated task description",
  "updatedAt": "2023-10-15T08:30:00Z"
}



DELETE /tasks/{id}: Delete a task

Response:
{
  "message": "Task successfully deleted"
}



Assumptions and Design Decisions

1. Authentication & Authorization
   
The API uses JWT (JSON Web Tokens) for user authentication.

A valid JWT must be passed in the Authorization header to access protected routes (e.g., tasks).
Tokens expire after a set time (default: 1 hour).


2. Database
The API uses Prisma as the ORM (Object-Relational Mapper) to interact with the MySQL database.
Tasks are linked to users via the userId field in the tasks table.
Tasks include the following fields:
id, title, description, dueDate, createdAt, updatedAt.


3. Password Security
User passwords are securely hashed using bcrypt before being stored in the database.
