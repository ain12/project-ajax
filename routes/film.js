const express = require("express");
const router = express.Router();
const db = require("../db");


db.connect((err, client, done) => {
    if (err) {
      console.error('Error de conexión:', err);
    } else {
      console.log('Conexión a la base de datos establecida');
    }
  });

router.get("/film/get", async (req, res) => {
  db.query(
    "SELECT title, description, release_year, length, rating FROM film",(error, results) => {
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