const express = require("express");
const router = express.Router();
const { verifyToken } = require("#middleware/auth.js");

router.get("/", verifyToken, (req, res) => {
  res.json({
    success: true,
    message: "Token is valid.",
    user: req.user,
  });
});

module.exports = router;
