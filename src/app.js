const express = require("express");

const app = express();

app.use(express.json());

// routes
app.get("/health", (req, res) => {
    res.send("server is healthy");
})

// error middleware

module.exports = app;