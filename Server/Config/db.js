const mysql = require("mysql2");
require("dotenv").config();


const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});
console.log(process.env.DB_HOST)
db.connect((err) => {
  if (err) {
    console.error("MySQl Error:", err.message);
    return;
  }
  console.log("Database connected!");
});

module.exports = db ;