const express = require("express");
const router = express.Router();
const database = require("#db.js");
const bcrypt = require("bcrypt");
const { generateToken } = require("#middleware/auth.js");

router.post("/", (req, res) => {
  const { username, password } = req.body;
  if (username && password) {
    const query = "SELECT * FROM users WHERE username = ?";
    database.query(query, [username], (error, data) => {
      if (error) return res.status(500).send("Database error");
      if (data.length === 0) return res.status(401).send("Incorrect username");

      const user = data[0];
      const hashedPasswordCheck = bcrypt.compareSync(password, user.password);
      if (hashedPasswordCheck) {
        const token = generateToken({
          id: user.id,
          username: user.username,
        });
        res.cookie("token", token, {
          httpOnly: true,
          secure: true,
          maxAge: 24 * 60 * 60 * 1000,
        });
        res.status(200).json({
          success: true,
          message: "Login success",
          token,
          user: {
            id: user.id,
            username: user.username,
          },
        });
      } else {
        res.status(401).send("Incorrect password");
      }
    });
  } else {
    res.status(400).send("Please enter username and password");
  }
});

module.exports = router;
