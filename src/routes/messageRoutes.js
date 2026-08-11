const route = require("express").Router();
const authMiddleware = require("../middlewares/authMiddleware")
const { sendMessage, getMessages } = require("../controllers/messageController")
const validate = require("../middlewares/validationMiddleware");
const { sendMessagageValidation, getMessagesValidation } = require("../validations/messaageValidation")

/**
 * @swagger
 * /message/sendMessage:
 *   post:
 *     summary: Send a message in a conversation
 *     tags: [Messages]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [conversationId, message, messageType]
 *             properties:
 *               conversationId:
 *                 type: string
 *                 description: MongoDB ObjectId of the conversation
 *                 example: 651f1a2b3c4d5e6f7a8b9c0d
 *               message:
 *                 type: string
 *                 maxLength: 5000
 *                 example: Hey, how are you?
 *               messageType:
 *                 type: string
 *                 enum: [text, image, video, audio, document]
 *                 example: text
 *     responses:
 *       201:
 *         description: Message sent successfully
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ApiResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       $ref: '#/components/schemas/Message'
 *       400:
 *         description: Validation error
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
 *         description: Conversation not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiError'
 */
route.post("/sendMessage", validate(sendMessagageValidation), authMiddleware, sendMessage)

/**
 * @swagger
 * /message/getMessages/{conversationId}:
 *   get:
 *     summary: Get message history for a conversation
 *     tags: [Messages]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: conversationId
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB ObjectId of the conversation
 *         example: 651f1a2b3c4d5e6f7a8b9c0d
 *     responses:
 *       200:
 *         description: Message history fetched successfully
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
 *                         $ref: '#/components/schemas/Message'
 *       400:
 *         description: Validation error (invalid conversationId)
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
 */
route.get("/getMessages/:conversationId", validate(getMessagesValidation, "params"), authMiddleware, getMessages)
module.exports = route;
