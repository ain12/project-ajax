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

router.get("/staff/get/:id", async (req, res) => {
  const id = req.params.id;
  db.query(
    "SELECT staff_id, first_name, last_name, a.address, email, store_id, active, username, password FROM staff s inner join address a on s.address_id = a.address_id WHERE staff_id = $1",
    [id],
    (error, results) => {
      if (error) {
        console.error("Error fetching staff:", error);
        res.status(500).send("Error fetching staff");
      } else {
        res.json(results.rows[0]);
      }
    }
  );
});

/* router.get("/shop/get", async (req, res) => {
  db.query("SELECT * FROM store", (error, results) => {
    if (error) {
      console.error("Error fetching shops:", error);
      res.status(500).send("Error fetching shops");
    } else {
      res.json(results.rows);
    }
  });
}); */

router.get("/shop/get", async (req, res) => {
  db.query(
    "SELECT store_id, a.address_id, a.address FROM store s inner join address a on s.address_id = a.address_id",
    (error, results) => {
      if (error) {
        console.error("Error fetching shops:", error);
        res.status(500).send("Error fetching shops");
      } else {
        res.json(results.rows);
      }
    }
  );
});

router.post(
  "/staff/create",
  async (req, res) => {
    const {
      first_name,
      last_name,
      address,
      email,
      store_id,
      active,
      username,
      password,
    } = req.body;

    let address_id;

    const addressQuery = await db.query(
      "SELECT address_id FROM address WHERE address = $1",
      [address]
    );

    if (addressQuery.rows.length > 0) {
      address_id = addressQuery.rows[0].address_id;
    } else {
      const newAddressQuery = await db.query(
        "INSERT INTO address (address, address2, district, city_id, postal_code, phone) VALUES ($1, $2, $3, $4, $5, $6) RETURNING address_id",
        [address, "prueba", "N/A", 1, "prueba", "783748"]
      );
      address_id = newAddressQuery.rows[0].address_id;
    }

    /* db.query(
    "INSERT INTO address (address, address2, district, city_id, postal_code, phone) VALUES ($1, $2, $3, $4, $5, $6) RETURNING address_id",
    [address, "prueba", "N/A", 1, "prueba", "783748"],
    (error, results) => {
      if (error) {
        console.error("Error creating address:", error);
        res.status(500).send("Error creating address");
      } else { */
    /*  const address_id = results.rows[0].address_id; */
    db.query(
      "INSERT INTO staff (first_name, last_name, address_id, active, email, store_id, username, password) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING staff_id",
      [
        first_name,
        last_name,
        address_id,
        active,
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
  //}
);
//});

router.put("/staff/update/:id", async (req, res) => {
  const id = req.params.id;
  const {
    first_name,
    last_name,
    address,
    email,
    store_id,
    active,
    username,
    password,
  } = req.body;

  let address_id;

  const addressQuery = await db.query(
    "SELECT address_id FROM address WHERE address = $1",
    [address]
  );

  if (addressQuery.rows.length > 0) {
    address_id = addressQuery.rows[0].address_id;
  } else {
    const newAddressQuery = await db.query(
      "INSERT INTO address (address, address2, district, city_id, postal_code, phone) VALUES ($1, $2, $3, $4, $5, $6) RETURNING address_id",
      [address, "prueba", "N/A", 1, "prueba", "783748"]
    );
    address_id = newAddressQuery.rows[0].address_id;
  }
  db.query(
    "UPDATE staff SET first_name = $1, last_name = $2, address_id = $3, email = $4, store_id = $5, active = $6, username = $7, password = $8 WHERE staff_id = $9",
    [
      first_name,
      last_name,
      address_id,
      email,
      store_id,
      active,
      username,
      password,
      id,
    ],
    (error, results) => {
      if (error) {
        console.error("Error updating staff:", error);
        res.status(500).send("Error updating staff");
      } else {
        res.json({ status: "success" });
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
