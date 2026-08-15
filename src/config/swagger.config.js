const swaggerJsdoc = require("swagger-jsdoc");

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Chat App Backend API",
            version: "1.0.0",
            description:
                "REST API documentation for the chat app backend (auth, users, conversations, messages). Real-time events are handled separately over Socket.IO.",
        },
        servers: [
            {
                url: "/api",
                description: "Current server (works for both local and hosted)",
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                    description:
                        "Send the access token returned by /users/loginUser as: Authorization: Bearer <token>",
                },
            },
            schemas: {
                ApiResponse: {
                    type: "object",
                    properties: {
                        success: { type: "boolean", example: true },
                        statusCode: { type: "integer", example: 200 },
                        message: { type: "string", example: "Success" },
                        data: { type: "object", nullable: true },
                    },
                },
                ApiError: {
                    type: "object",
                    properties: {
                        success: { type: "boolean", example: false },
                        statusCode: { type: "integer", example: 400 },
                        message: { type: "string", example: "Something went wrong" },
                        errors: { type: "array", items: {}, example: [] },
                    },
                },
                User: {
                    type: "object",
                    properties: {
                        _id: { type: "string", example: "651f1a2b3c4d5e6f7a8b9c0d" },
                        fullName: { type: "string", example: "Preet Verma" },
                        email: { type: "string", format: "email", example: "preet@example.com" },
                        role: {
                            type: "string",
                            enum: ["personal", "developer", "business"],
                            example: "personal",
                        },
                        createdAt: { type: "string", format: "date-time" },
                        updatedAt: { type: "string", format: "date-time" },
                    },
                },
                Conversation: {
                    type: "object",
                    properties: {
                        _id: { type: "string", example: "651f1a2b3c4d5e6f7a8b9c0d" },
                        type: { type: "string", enum: ["direct", "group"], example: "direct" },
                        participants: {
                            type: "array",
                            items: { type: "string" },
                            example: ["651f1a2b3c4d5e6f7a8b9c0d", "651f1a2b3c4d5e6f7a8b9c0e"],
                        },
                        groupName: { type: "string", nullable: true },
                        groupProfilePicture: { type: "string", nullable: true },
                        groupDescription: { type: "string", nullable: true },
                        groupAdmin: { type: "array", items: { type: "string" } },
                        lastMessage: { type: "string", nullable: true },
                        lastMessageAt: { type: "string", format: "date-time", nullable: true },
                        createdBy: { type: "string" },
                        isDeleted: { type: "boolean", example: false },
                        createdAt: { type: "string", format: "date-time" },
                        updatedAt: { type: "string", format: "date-time" },
                    },
                },
                Message: {
                    type: "object",
                    properties: {
                        _id: { type: "string", example: "651f1a2b3c4d5e6f7a8b9c0d" },
                        conversationId: { type: "string", example: "651f1a2b3c4d5e6f7a8b9c0d" },
                        senderId: { type: "string", example: "651f1a2b3c4d5e6f7a8b9c0e" },
                        message: { type: "string", example: "Hey, how are you?" },
                        messageType: {
                            type: "string",
                            enum: ["text", "image", "video", "audio", "document"],
                            example: "text",
                        },
                        attachments: {
                            type: "array",
                            items: {
                                type: "object",
                                properties: {
                                    url: { type: "string" },
                                    fileName: { type: "string" },
                                    fileSize: { type: "number" },
                                    mimeType: { type: "string" },
                                },
                            },
                        },
                        replyTo: { type: "string", nullable: true },
                        isEdited: { type: "boolean", example: false },
                        isDeleted: { type: "boolean", example: false },
                        createdAt: { type: "string", format: "date-time" },
                        updatedAt: { type: "string", format: "date-time" },
                    },
                },
            },
        },
        tags: [
            { name: "Users", description: "Signup, login and profile APIs" },
            { name: "Conversations", description: "Conversation creation and listing APIs" },
            { name: "Messages", description: "Sending and fetching chat messages" },
        ],
    },
    apis: ["./src/routes/*.js"],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
