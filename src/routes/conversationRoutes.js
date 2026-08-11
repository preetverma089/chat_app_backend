const route = require('express').Router();
const { createConversation, getConversationList } = require("../controllers/converationController")
const authMiddleware = require("../middlewares/authMiddleware")
const validate = require("../middlewares/validationMiddleware")
const { createConversationValidation } = require("../validations/conversationValidation")

/**
 * @swagger
 * /chat/conversations:
 *   post:
 *     summary: Create a direct conversation with another user, or fetch it if it already exists
 *     tags: [Conversations]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [receiverId]
 *             properties:
 *               receiverId:
 *                 type: string
 *                 description: MongoDB ObjectId of the user to start a conversation with
 *                 example: 651f1a2b3c4d5e6f7a8b9c0d
 *     responses:
 *       200:
 *         description: Conversation created or fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ApiResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       $ref: '#/components/schemas/Conversation'
 *       400:
 *         description: Validation error, or senderId and receiverId are the same
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiError'
 *       401:
 *         description: Missing, invalid or expired access token
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiError'
 *       404:
 *         description: Receiver user not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiError'
 */
route.post("/conversations", validate(createConversationValidation), authMiddleware, createConversation)

/**
 * @swagger
 * /chat/getconversations:
 *   get:
 *     summary: Get all conversations for the logged-in user
 *     tags: [Conversations]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Conversation list fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ApiResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Conversation'
 *       401:
 *         description: Missing, invalid or expired access token
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiError'
 */
route.get("/getconversations", authMiddleware, getConversationList)
module.exports = route;
