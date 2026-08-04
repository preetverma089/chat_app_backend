const express = require("express");

const userRoutes = require("./routes/userRoutes");
const conversationRoutes = require("./routes/conversationRoutes")
const errorHandler = require("./middlewares/errorMiddleware");

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

// Routes
app.use("/api/users", userRoutes);
app.use("/api/chat", conversationRoutes)
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