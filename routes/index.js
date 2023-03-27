var express = require('express');
var router = express.Router();
const { films } = require('./films');
const app = express();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;

app.get('/films', async (req, res) => {
  try {
    const resultados = await pool.query('SELECT * FROM film');
    res.send(resultados.rows);
  } catch (err) {
    console.error('Error en la consulta', err);
    res.status(500).send('Error en la consulta');
  }
});

// Iniciar el servidor web
app.listen(3000, () => {
  console.log('Servidor web iniciado en http://localhost:3000');
});
