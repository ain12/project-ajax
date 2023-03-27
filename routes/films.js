const express = require('express');
const { Pool } = require('pg');


const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: '1234',
  port: 5432,
});

const router = express.Router();

// Ruta para obtener todas las películas
router.get('/', async (req, res) => {
  try {
    const resultados = await pool.query('SELECT * FROM film');
    res.send(resultados.rows);
  } catch (err) {
    console.error('Error en la consulta', err);
    res.status(500).send('Error en la consulta');
  }
});

module.exports = router;
