const express = require("express");
const router = express.Router();

// controller ya helper jo bhi use karte ho
router.post("/refresh-token", refreshToken);

module.exports = router;