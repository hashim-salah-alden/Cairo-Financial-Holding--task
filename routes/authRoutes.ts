
/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     description: >
 *       This endpoint allows a new user to create an account. The user must provide 
 *       a unique email address and a secure password. Upon successful registration, 
 *       the user's account is created, and a welcome message is returned.  
 *       - Passwords should meet the required complexity rules.
 *       - Email addresses must be unique in the system.
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 description: The user's email address
 *                 example: "user@example.com"
 *               password:
 *                 type: string
 *                 description: A secure password for the user
 *                 example: "StrongPassword123!"
 *               name:
 *                 type: string
 *                 description: Optional name of the user
 *                 example: "John Doe"
 *     responses:
 *       201:
 *         description: User successfully registered
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: The unique ID of the newly created user
 *                   example: "64a7c3f0e72b4e001efb3d21"
 *                 email:
 *                   type: string
 *                   example: "user@example.com"
 *                 name:
 *                   type: string
 *                   example: "John Doe"
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   example: "2023-10-14T12:34:56Z"
 *       400:
 *         description: Bad request (e.g., missing required fields, invalid email format)
 *       409:
 *         description: Email already in use
 *       500:
 *         description: Internal server error
 */
/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Authenticate a user
 *     description: >
 *       This endpoint authenticates a user by validating their email and password.
 *       Upon successful login, a JSON Web Token (JWT) is returned, which can be used 
 *       to access protected endpoints.  
 *       - The token is valid for a specific duration and must be included in the `Authorization` header for authenticated requests.
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 description: The user's email address
 *                 example: "user@example.com"
 *               password:
 *                 type: string
 *                 description: The user's password
 *                 example: "StrongPassword123!"
 *     responses:
 *       200:
 *         description: Successfully authenticated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: The JWT for accessing protected resources
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "64a7c3f0e72b4e001efb3d21"
 *                     email:
 *                       type: string
 *                       example: "user@example.com"
 *                     name:
 *                       type: string
 *                       example: "John Doe"
 *       401:
 *         description: Unauthorized (e.g., invalid email or password)
 *       400:
 *         description: Bad request (e.g., missing required fields)
 *       500:
 *         description: Internal server error
 */

import express, { Request, Response } from "express";
import { register, login } from "../controllers/authController.js";

// import { authenticate } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

export default router;
