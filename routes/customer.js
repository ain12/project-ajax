/* let express = require('express');
let router = express.Router();

const { Pool } = require('pg');
// Creamos una instancia de conexión a la base de datos
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'sakila',
  password: '1q2w3e',
  port: 5432,
});
// Conectamos a la base de datos
pool.connect((err, client, done) => {
  if (err) {
    console.error('Error de conexión:', err);
  } else {
    console.log('Conexión a la base de datos establecida');
  }
});


router.get('/', function(req, res, next) {
    // Ejecutamos una consulta SELECT
    pool.query('SELECT * FROM customer c JOIN address a ON c.address_id = a.address_id', (err, resultados) => {
        if (err) {
            res.status(400).send(err);
        } else {
            res.status(200).json(resultados.rows);
        }
    });
});

router.delete('/delete/:id', function(req, res, next) {
    const id = parseInt(req.params.id)
    
    pool.query('DELETE FROM customer c WHERE id = $1', [id], (err, resultados) => {
        if (err) {
            res.status(400).send(err);
        } else {
            response.status(200).send(`User deleted with ID: ${id}`)    
        }
    });
});

module.exports = router;
 */
