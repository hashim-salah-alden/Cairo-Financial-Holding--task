Cairo Financial Holding - Task Management API
This repository contains the source code for the Task Management API, a backend application that allows users to manage tasks. The API provides features like creating, updating, retrieving, and deleting tasks, as well as user authentication through JWT (JSON Web Token).

The project uses Clever Cloud to host the MySQL database.

Table of Contents

*Installation
*Setup
*API Documentation
*Assumptions and Design Decisions
*Installation


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
