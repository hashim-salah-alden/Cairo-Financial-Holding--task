/**
 * @swagger
 * /api/tasks:
 *   get:
 *     summary: Retrieve all tasks for the authenticated user
 *     description: >
 *       This endpoint retrieves all tasks associated with the currently authenticated user.
 *       It requires the user to be logged in and have a valid authentication token.
 *       The response contains an array of tasks, each with its details like `id`, `title`,
 *       and `description`. If no tasks are found, an empty array is returned.
 *     tags:
 *       - Tasks
 *     security:
 *       - bearerAuth: [] # If your API uses Bearer Token authentication
 *     responses:
 *       200:
 *         description: Successfully retrieved the tasks
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: The unique identifier for the task
 *                     example: "64a7c3f0e72b4e001efb3d21"
 *                   title:
 *                     type: string
 *                     description: The title of the task
 *                     example: "Complete project documentation"
 *                   description:
 *                     type: string
 *                     description: Detailed information about the task
 *                     example: "Write and review the API documentation for the task management system"
 *                   userId:
 *                     type: string
 *                     description: The ID of the user who owns the task
 *                     example: "64a7c3f0e72b4e001efb3d00"
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     description: The timestamp when the task was created
 *                     example: "2023-10-14T12:34:56Z"
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *                     description: The timestamp when the task was last updated
 *                     example: "2023-10-15T08:30:00Z"
 *       400:
 *         description: Missing or invalid authentication
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message
 *                   example: "User information is missing"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message
 *                   example: "An unexpected error occurred"
 */
/**
 * @swagger
 * /api/tasks:
 *   post:
 *     summary: Create a new task
 *     description: >
 *       This endpoint allows the user to create a new task. The user must provide
 *       the task details, including the `title` and `description`. The newly created
 *       task is associated with the authenticated user.
 *       - Requires a valid authentication token.
 *       - Returns the created task object upon success.
 *     tags:
 *       - Tasks
 *     security:
 *       - bearerAuth: [] # If using Bearer Token authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *             properties:
 *               title:
 *                 type: string
 *                 description: The title of the task
 *                 example: "Complete project documentation"
 *               description:
 *                 type: string
 *                 description: A detailed description of the task
 *                 example: "Write API documentation for the task management system."
 *               dueDate:
 *                 type: date
 *                 description: A detailed description of the task
 *                 example: "2025-01-01T00:00:00.000Z"
 *                 
 *     responses:
 *       201:
 *         description: Task successfully created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: "64a7c3f0e72b4e001efb3d21"
 *                 title:
 *                   type: string
 *                   example: "Complete project documentation"
 *                 description:
 *                   type: string
 *                   example: "Write API documentation for the task management system."
 *                 userId:
 *                   type: string
 *                   example: "64a7c3f0e72b4e001efb3d00"
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   example: "2023-10-14T12:34:56Z"
 *       400:
 *         description: Bad request (e.g., missing required fields)
 *       500:
 *         description: Internal server error
 */
/**
 * @swagger
 * /api/tasks/{id}:
 *   put:
 *     summary: Update an existing task
 *     description: >
 *       This endpoint allows the user to update the details of an existing task.
 *       The user must provide the task ID and the new values for the task's properties.
 *       - Requires a valid authentication token.
 *       - Returns the updated task object upon success.
 *     tags:
 *       - Tasks
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the task to update
 *         schema:
 *           type: string
 *           example: "64a7c3f0e72b4e001efb3d21"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The new title for the task
 *                 example: "Review project documentation"
 *               description:
 *                 type: string
 *                 description: The new description for the task
 *                 example: "Ensure the API documentation meets the required standards."
 *               status:
 *                 type: string
 *                 description: The new description for the task
 *                 example: "PENDING || COMPLETED"
 *     responses:
 *       200:
 *         description: Task successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: "64a7c3f0e72b4e001efb3d21"
 *                 title:
 *                   type: string
 *                   example: "Review project documentation"
 *                 description:
 *                   type: string
 *                   example: "Ensure the API documentation meets the required standards."
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *                   example: "2023-10-15T08:30:00Z"
 *       400:
 *         description: Bad request (e.g., invalid ID or missing fields)
 *       404:
 *         description: Task not found
 *       500:
 *         description: Internal server error
 */
/**
 * @swagger
 * /api/tasks/{id}:
 *   delete:
 *     summary: Delete a task
 *     description: >
 *       This endpoint allows the user to delete an existing task by its ID.
 *       - Requires a valid authentication token.
 *       - Returns a success message upon successful deletion.
 *     tags:
 *       - Tasks
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the task to delete
 *         schema:
 *           type: string
 *           example: "64a7c3f0e72b4e001efb3d21"
 *     responses:
 *       200:
 *         description: Task successfully deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Task successfully deleted"
 *       400:
 *         description: Bad request (e.g., invalid ID)
 *       404:
 *         description: Task not found
 *       500:
 *         description: Internal server error
 */
import express from "express";
import { authenticate } from "../middlewares/authMiddleware";
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} from "../controllers/taskController.ts";

const router = express.Router();

router.get("/tasks", authenticate, getTasks);
router.post("/tasks", authenticate, createTask);
router.put("/tasks/:taskId", authenticate, updateTask);
router.delete("/tasks/:taskId", authenticate, deleteTask);

export default router;
