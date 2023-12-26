import mysql from "mysql2";

const db = mysql.createConnection({
  host: process.env.RDS_HOSTNAME || "localhost",
  user: process.env.RDS_USERNAME || "root",
  password: process.env.RDS_PASSWORD || "",
  port: process.env.RDS_PORT || 3306,
  database: process.env.DATABASE_NAME || "test",
});

db.connect(function (err) {
  if (err) {
    console.error("Database connection failed: " + err.stack);
    return;
  }

  console.log("Connected to database.");
});

module.exports = db;
