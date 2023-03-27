const express = require("express");
const router = express.Router();
const db = require("../db");
//const fs = require("fs");
//const pool = new Pool(fs.readFile(__dirname + '/db_credentials.json'))

router.get("/staff/get", async (req, res) => {
  db.query(
    "SELECT staff_id, first_name, last_name, a.address, email FROM staff s inner join address a on s.address_id = a.address_id",
    (error, results) => {
      if (error) {
        console.error("Error fetching staff:", error);
        res.status(500).send("Error fetching staff");
      } else {
        res.json(results.rows);
      }
    }
  );
});

router.get("/shop/get", async (req, res) => {
  db.query("SELECT * FROM store", (error, results) => {
    if (error) {
      console.error("Error fetching shops:", error);
      res.status(500).send("Error fetching shops");
    } else {
      res.json(results.rows);
    }
  });
});

router.post("/staff/create", async (req, res) => {
  const {
    first_name,
    last_name,
    address,
    email,
    store_id,
    username,
    password,
  } = req.body;
  db.query(
    "INSERT INTO address (address, address2, district, city_id, postal_code, phone) VALUES ($1, $2, $3, $4, $5, $6) RETURNING address_id",
    [address, "prueba", "N/A", 1, "prueba", "783748"],
    (error, results) => {
      if (error) {
        console.error("Error creating address:", error);
        res.status(500).send("Error creating address");
      } else {
        const address_id = results.rows[0].address_id;
        db.query(
          "INSERT INTO staff (first_name, last_name, address_id, email, store_id, username, password) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING staff_id",
          [
            first_name,
            last_name,
            address_id,
            email,
            store_id,
            username,
            password,
          ],
          (error, results) => {
            if (error) {
              console.error("Error creating staff:", error);
              res.status(500).send("Error creating staff");
            } else {
              console.log(results);
              res.json({ staff_id: results.rows[0].staff_id });
            }
          }
        );
      }
    }
  );
});

router.delete("/staff/delete/:id", async (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM staff WHERE staff_id = $1", [id], (error, results) => {
    if (error) {
      console.error("Error deleting staff:", error);
      res.status(500).json({ error: "Error deleting staff" });
    } else {
      res.json({ status: "success" });
    }
  });
});

module.exports = router;
