const { Pool } = require("pg");
const express = require("express");
const router = express.Router();

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "sakila",
  password: "katyhudson97",
  port: 5432,
});

pool.connect((error) => {
  if (error) {
    console.error("Error connecting to database:", error);
  } else {
    console.log("Connected to database!");
  }
});

router.get("/staff", async (req, res) => {
  pool.query(
    "SELECT staff_id, first_name, last_name, a.address, email FROM staff s inner join address a on s.address_id = a.address_id",
    (error, results) => {
      if (error) {
        console.error("Error fetching staff:", error);
        res.status(500).send("Error fetching staff");
      } else {
        console.log(results);
        res.json(results.rows);
      }
    }
  );
});

module.exports = router;
