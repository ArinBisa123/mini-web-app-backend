require("dotenv").config();
const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
});
connection.connect((error) => {
  if (error) {
    throw error;
  } else {
    console.log("DB is success connected ");
  }
});

module.exports = connection;
