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
    "SELECT title, description, release_year, length, rating, replacement_cost, film_id FROM film LIMIT 25",(error, results) => {
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

//get id
router.get("/film/get/:id", async (req, res) => {
  const id = req.params.id;
  db.query(
    "SELECT film_id, title, description, release_year, length, rating, replacement_cost FROM film WHERE film_id = $1",
    [id],
    (error, results) => {
      if (error) {
        console.error("Error fetching film:", error);
        res.status(500).send("Error fetching film");
      } else {
        res.json(results.rows[0]);
      }
    }
  );
});


//delete
router.delete("/staff/delete/:id",async (req, res) =>{
  const id = req.params.id;
  console.log(id);
  db.query("DELETE FROM film WHERE film_id= $1",[id],(error,results) => {
    if (error) {
      console.error("Error deleting film: ", error)
      res.status(500).json({ error: "Error deleting film"});
    } else res.json({status: "success"})
  })
})

module.exports = router;

//update
router.put("/film/update/:id", async (req, res) => {
  const id = req.params.id;
  const { title, description, release_year, length, rating, replacement_cost } = req.body;

  db.query(
    "UPDATE film SET title = $1, description = $2, release_year = $3, length = $4, rating = $5, replacement_cost = $6 WHERE film_id = $7",
    [title, description, release_year, length, rating, replacement_cost, id],
    (error, results) => {
      if (error) {
        console.error("Error updating film:", error);
        res.status(500).send("Error updating film");
      } else {
        res.json({ status: "success" });
      }
    }
  );
});

//insert 
router.post("/film/create", async (req, res) => {
  console.log(req);
  const { title, description, release_year, length, rating, replacement_cost } = req.body;
  db.query(
    "INSERT INTO film (title, description, release_year, length, rating, replacement_cost) VALUES ($1, $2, $3, $4, $5, $6) RETURNING film_id",
    [title, description, release_year, length, rating, replacement_cost],
    (error, results) => {
      if (error) {
        console.error("Error creating film:", error);
        console.error(results);
        res.status(500).send("Error creating film");
      } else {
        console.log(results);
        res.json({ film_id: results.rows[0].film_id });
      }
    }
  );
});
