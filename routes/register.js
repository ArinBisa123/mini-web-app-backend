const express = require("express");
const router = express.Router();
const database = require("#db.js");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");

router.post("/", (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({
      success: false,
      message: "Username and password are required",
    });
  }
  const checkExistingUser = "SELECT * FROM users WHERE username = ?";
  database.query(checkExistingUser, [username], (error, result) => {
    if (error) {
      // console.log(error);
      return res.status(500).send(JSON.stringify(error));
    }
    if (result.length > 0) {
      return res.status(401).json({
        success: false,
        message: "Username already exists",
      });
    } else {
      const hashedPassword = bcrypt.hashSync(password, 10);
      const userID = uuidv4();
      const saveUser =
        "INSERT INTO users (id,username,password) VALUES (?,?,?)";
      database.query(
        saveUser,
        [userID, username, hashedPassword],
        (error, result) => {
          if (error) return res.status(500).send(JSON.stringify(error));
          else {
            res.status(200).json({
              success: true,
              message: "Success register user",
              user: {
                id: userID,
                username: username,
              },
            });
          }
        }
      );
    }
  });
});

module.exports = router;
