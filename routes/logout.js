const express = require("express");
const router = express.Router();

router.post("/", (req, res) => {
  res.clearCookie("token");
  res.json({
    success: true,
    message: "Success log out",
  });
});

module.exports = router;
