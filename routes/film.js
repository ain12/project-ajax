const { Pool } = require("pg");
const express = require("express");
const router = express.Router();

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "postgres",
  password: "1234",
  port: 5432,
});

// pool.connect((error) => {
//   if (error) {
//     console.error("Error connecting to database:", error);
//   } else {
//     console.log("Connected!");
//   }
// });
pool.connect((err, client, done) => {
    if (err) {
      console.error('Error de conexión:', err);
    } else {
      console.log('Conexión a la base de datos establecida');
    }
  });

router.get("/film", async (req, res) => {
  pool.query(
    "SELECT tittle, description, release_year, length, rating FROM film",(error, results) => {
      if (error) {
        console.error("Error fetching film:", error);
        res.status(400).send(error);
      } else {
        res.status(200).json(results.rows);
        // res.json(results.rows);
      }
    }
  );
});

module.exports = router;