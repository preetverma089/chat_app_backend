const express = require("express");
const swaggerUi = require("swagger-ui-express");

const userRoutes = require("./routes/userRoutes");
const conversationRoutes = require("./routes/conversationRoutes")
const messageRoutes = require("../src/routes/messageRoutes")
const errorHandler = require("./middlewares/errorMiddleware");
const swaggerSpec = require("./config/swagger.config");

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health Check
app.get("/health", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Server is healthy"
    });
});

// API Documentation
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
    customSiteTitle: "Chat App Backend API Docs",
}));
app.get("/api-docs.json", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
});

// Routes
app.use("/api/users", userRoutes);
app.use("/api/chat", conversationRoutes)
app.use("/api/message", messageRoutes)
// 404 Middleware
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route not found"
    });
});

// Global Error Middleware (Always Last)
app.use(errorHandler);

module.exports = app;