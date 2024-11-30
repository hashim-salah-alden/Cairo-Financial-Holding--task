Cairo Financial Holding- Task
##### i using clever-cloud to host the mysql database 
Task Management API
This repository contains the source code for the Task Management API, a backend application that allows users to manage tasks. The API enables features like creating, updating, retrieving, and deleting tasks, as well as user authentication through JWT (JSON Web Token).

Table of Contents
* Installation
* Setup
* API Documentation

Installation
Follow these steps to set up the project locally:

1. Clone the Repository
git clone https://github.com/hashim-salah-alden/Cairo-Financial-Holding--task
cd Cairo-Financial-Holding--task-main

2. Install Dependencies
Install all the necessary dependencies using npm or yarn.
npm install

3. Set Up Environment Variables      
 .env file in the root directory of the project and this file contain all necessary variables to run this project
DATABASE_URL: the  database connection string (MySQL)
JWT_SECRET: A secret key used for signing JWT tokens
PORT: The port on which the API will run

5. Start the Server
Start the development server with:
npm start

*Setup
After setting up the application, you should be able to:

Access the API endpoints
Use Postman or any other tool to test the API.
Open the Swagger UI for interactive API documentation.
To access the Swagger documentation, go to:
http://localhost:5000/api-docs

*API Documentation
The API follows RESTful principles and provides the following routes:

Authentication
POST /api/auth/register: Register a new user
Request body:
{
  "email": "user@example.com",
  "password": "StrongPassword123!",
  "name": "test"
}
Response:
{
  "id": "unique-id",
  "email": "user@example.com",
  "name": "test"
  "createdAt": "2023-10-14T12:34:56Z"
}




POST /api/auth/login: Login a user and receive a JWT
Request body:
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
    "userId": "the creator id"
    "createdAt": "2023-10-14T12:34:56Z"
  }




POST /tasks: Create a new task
Request body:
{
  "title": "Complete API documentation",
  "description": "Write Swagger documentation for Task API",
  "dueDate" : "2025-01-01T00:00:00.000Z",
}
Response:
{
  "id": "new-task-id",
  "title": "Complete API documentation",
  "description": "Write Swagger documentation for Task API",
  "createdAt": "2023-10-14T12:34:56Z"
}




PUT /tasks/{id}: Update an existing task
Request body:
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
The token expires after a set time (default: 1 hour).
2. Database
Prisma is used as the ORM (Object-Relational Mapper) to interact with the database.
Tasks are linked to users by the userId field in the tasks table.
Tasks contain the following fields: id, title, description, createdAt, updatedAt.
3. Password Security
User passwords are hashed using bcrypt before storing them in the database.
