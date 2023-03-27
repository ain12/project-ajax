let express = require('express');
const router = express.Router();
const db = require("../db");

// Conectamos a la base de datos
db.connect((err, client, done) => {
  if (err) {
    console.error('Error de conexión:', err);
  } else {
    console.log('Conexión a la base de datos establecida');
  }
});


router.get('/', function(req, res, next) {
    // Ejecutamos una consulta SELECT
    db.query('SELECT * FROM customer c JOIN address a ON c.address_id = a.address_id', (err, resultados) => {
        if (err) {
            res.status(400).send(err);
        } else {
            res.status(200).json(resultados.rows);
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

module.exports = router;

