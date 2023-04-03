let express = require('express');
const router = express.Router();
const db = require("../db");

db.connect((err, client, done) => {
  if (err) {
    console.error('Error de conexión:', err);
  } else {
    console.log('Conexión a la base de datos establecida');
  }
});


router.get('/', function(req, res, next) {    
    db.query('SELECT * FROM customer c JOIN address a ON c.address_id = a.address_id order by c.customer_id', (err, resultados) => {
        if (err) {
            res.status(400).send(err);
        } else {
            res.status(200).json(resultados.rows);
        }
    });
});

router.get('/get/:id', async function(req, res, next) {
    const id = parseInt(req.params.id)
    
    db.query('select customer_id, first_name, last_name, a.address, a.postal_code, c2.city_id, email, store_id '+ 
    'from customer c ' + 
    'inner join address a on c.address_id = a.address_id ' +
    'inner join city c2 on a.city_id = c2.city_id ' +
    'where c.customer_id = $1', [id], (err, resultados) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).json(resultados.rows)    
        }
    });
});

router.delete('/delete/:id', async function(req, res, next) {
    const id = parseInt(req.params.id)
    
    db.query('DELETE FROM customer c WHERE customer_id = $1', [id], (err, resultados) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).json({message: `User deleted with ID: ${id}`})    
        }
    });
});

router.get('/cities', function(req, res, next) {
    db.query('SELECT * FROM city', (err, resultados) => {
        if (err) {
            res.status(400).send(err);
        } else {
            res.status(200).json(resultados.rows);
        }
    });
});

router.get('/stores', function(req, res, next) {
    db.query('SELECT * FROM store', (err, resultados) => {
        if (err) {
            res.status(400).send(err);
        } else {
            res.status(200).json(resultados.rows);
        }
    });
});

router.post("/create", async (req, res) => {
    const {
        first_name,
        last_name,
        address,
        city_id,
        postal_code,
        email,
        store_id
    } = req.body;
    db.query("insert into address (address, address2, district, city_id, postal_code, phone) values ($1, $2, $3, $4, $5, $6)RETURNING address_id",
    [address, "", "", city_id, postal_code, ""], (err, resultados) => {
        if (err) {
            res.status(400).send(err);
        } else {
            const address_id = resultados.rows[0].address_id;
            db.query("insert into customer (store_id, first_name, last_name, email, address_id) values ($1, $2, $3, $4, $5)", 
            [store_id, first_name, last_name, email, address_id], (err, resultados) => {
                if (err) {
                    res.status(500).send(err);
                } else {
                    res.status(200).json(resultados.rows);
                }
            })
        }
    })
})

router.post("/update", async (req, res) => {
    const {
        customer_id,
        first_name,
        last_name,
        address,
        city_id,
        postal_code,
        email,
        store_id
    } = req.body;

    let addres_id

    const addressExists = await db.query(
        "SELECT address_id FROM address WHERE address = $1",
        [address]
    );

    if (addressExists.rows.length > 0) {
        addres_id = addressExists.rows[0].addres_id;
    } else {
        const newAddress = await db.query(
            "INSERT INTO address (address, address2, district, city_id, postal_code, phone) VALUES ($1, $2, $3, $4, $5, $6) RETURNING address_id",
            [address, "", "", city_id, postal_code, ""]
        );
        addres_id = newAddress.rows[0].address_id
    }

    db.query("update customer set store_id = $1, first_name = $2, last_name = $3, email = $4, address_id = $5 where customer_id = $6 ",
    [store_id, first_name, last_name, email, addres_id, customer_id], (err, resultados) => {
        if (err) {
            res.status(400).send(err);
        } else {
            res.status(200).json(resultados.rows);
        }
    })
})

module.exports = router;

