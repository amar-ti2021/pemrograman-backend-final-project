const mysql = require("mysql");

require("dotenv").config();
const { DB_HOST, DB_USERNAME, DB_PASSWORD, DB_DATABASE } = process.env;

const database = mysql.createConnection({
  host: DB_HOST,
  user: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_DATABASE,
});

database.connect((err) => {
  if (err) {
    console.log("Error connecting " + err.stack);
    return;
  }
  console.log("Connected to database");
  return;
});

module.exports = database;
