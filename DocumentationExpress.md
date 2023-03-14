-   [Introducción](#Introducción)
-   [Instalación](#Instalación)
-   [Fundamentos básicos](#Fundamentos-básicos)
    -   [Creando una aplicación Express.js](#Creando-una-aplicación-Expressjs)
    -   [Enrutamiento en Express.js](#Enrutamiento-en-Expressjs)
    -   [Middleware en Express.js](#Middleware-en-Expressjs)
    -   [Plantillas en Express.js](#Plantillas-en-Expressjs)
-   [Conexión a base de datos](#Conexión-a-base-de-datos)
    -   [Conexión a MongoDB](#Conexión-a-MongoDB)
    -   [Conexión a MySQL](#Conexión-a-MySQL)
    -   [Conexión a PostgresSQL](#Conexión-a-PostgreSQL)

Documentación de Express.js
===========================

Introducción
------------

Express.js es un framework de aplicaciones web de Node.js que proporciona un conjunto de características para crear aplicaciones web y APIs de forma rápida y sencilla. Es un framework minimalista y flexible que se integra fácilmente con otras librerías y herramientas.

Instalación
-----------

Para instalar Express.js, primero necesitamos tener Node.js instalado en nuestro sistema. Podemos instalar Express.js mediante el comando npm (Node Package Manager):

`npm install express`

Fundamentos básicos
-------------------

### Creando una aplicación Express.js

Para crear una aplicación Express.js, necesitamos crear una instancia de la clase `express()` y luego definir una o más rutas. Una ruta es una combinación de una URL y una función de controlador que se ejecuta cuando se accede a esa URL.

~~~
const express = require('express');
const app = express();
app.get('/', (req, res) => {
  res.send('¡Hola, mundo!');
});
app.listen(3000, () => {
  console.log('Servidor iniciado en http://localhost:3000');
});
~~~

### Enrutamiento en Express.js

Express.js proporciona un mecanismo de enrutamiento fácil de usar para definir rutas en nuestra aplicación. Podemos definir rutas para diferentes verbos HTTP como `GET`, `POST`, `PUT`, `DELETE`, etc.

~~~
app.get('/', (req, res) => {
  res.send('¡Hola, mundo!');
});
app.post('/usuarios', (req, res) => {
  res.send('Se ha creado un nuevo usuario');
});
app.put('/usuarios/:id', (req, res) => {
  res.send(`Se ha actualizado el usuario con ID ${req.params.id}`);
});
app.delete('/usuarios/:id', (req, res) => {
  res.send(`Se ha eliminado el usuario con ID ${req.params.id}`);
});
~~~

### Middleware en Express.js

Express.js utiliza middleware para realizar operaciones en la petición HTTP antes de que llegue al controlador y después de que se genere la respuesta. Un middleware es simplemente una función que se ejecuta en el medio de la cadena de procesamiento de la solicitud y la respuesta.

~~~
app.use(function(req, res, next){
   console.log("Start");
   next();
});

//Route handler
app.get('/', function(req, res, next){
   res.send("Middle");
   next();
});

app.use('/', function(req, res){
   console.log('End');
});
~~~

Cuando hacemos la llamada a '/' recibimos como respuesta **Middle** y por consola aparecerá lo siguiente:
~~~
Start
End
~~~

### Plantillas en Express.js

Express.js nos permite usar diferentes motores de plantillas para renderizar nuestras vistas. Podemos elegir entre pug, ejs, handlebars, entre otros.

~~~
app.set('view engine', 'pug');
app.get('/', (req, res) => {
  res.render('index', { titulo: 'Mi sitio web' });
});
~~~

Conexión a base de datos
------------------------

### Conexión a MongoDB

Para conectarnos a una base de datos MongoDB, necesitamos instalar el paquete `mongoose` y luego crear una instancia de conexión utilizando la URL de la base de datos.
~~~
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/mi-base-de-datos', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
~~~

Una vez conectados, podemos definir un modelo de datos y realizar operaciones CRUD en nuestra base de datos.
~~~
const mongoose = require('mongoose');
// Definimos un esquema para nuestro modelo
const usuarioSchema = new mongoose.Schema({
  nombre: String,
  edad: Number,
  correo: String
});
// Creamos un modelo a partir del esquema
const Usuario = mongoose.model('Usuario', usuarioSchema);
// Creamos un nuevo usuario
const nuevoUsuario = new Usuario({
  nombre: 'Juan',
  edad: 25,
  correo: 'juan@example.com'
});
// Guardamos el usuario en la base de datos
nuevoUsuario.save((err, usuario) => {
  if (err) {
    console.error(err);
  } else {
    console.log('Usuario guardado:', usuario);
  }
});
~~~

Para más información sobre cómo trabajar con bases de datos en Express.js y MongoDB, puedes consultar la documentación oficial de [Mongoose](https://mongoosejs.com/docs/guide.html).

### Conexión a MySQL

Para conectarnos a una base de datos MySQL en Express.js, necesitamos instalar el paquete `mysql2` y luego crear una instancia de conexión utilizando los detalles de nuestra base de datos.

~~~
const mysql = require('mysql2');
// Creamos una conexión a la base de datos
const conexion = mysql.createConnection({
  host: 'localhost',
  user: 'usuario',
  password: 'contraseña',
  database: 'mi-base-de-datos'
});
// Conectamos a la base de datos
conexion.connect((err) => {
  if (err) {
    console.error('Error de conexión:', err);
  } else {
    console.log('Conexión a la base de datos establecida');
  }
});
~~~

Una vez conectados, podemos realizar operaciones CRUD en nuestra base de datos utilizando consultas SQL.

~~~
// Ejecutamos una consulta SELECT
conexion.query('SELECT * FROM usuarios', (err, resultados) => {
  if (err) {
    console.error(err);
  } else {
    console.log('Resultados:', resultados);
  }
});
// Ejecutamos una consulta INSERT
const nuevoUsuario = {
  nombre: 'Juan',
  edad: 25,
  correo: 'juan@example.com'
};
conexion.query('INSERT INTO usuarios SET ?', nuevoUsuario, (err, resultado) => {
  if (err) {
    console.error(err);
  } else {
    console.log('Usuario insertado con ID:', resultado.insertId);
  }
});
~~~

Para más información sobre cómo trabajar con bases de datos en Express.js y MySQL, puedes consultar la documentación oficial de [mysql2](https://github.com/mysqljs/mysql#readme).

### Conexión a PostgreSQL

Para conectarnos a una base de datos PostgreSQL en Express.js, necesitamos instalar el paquete `pg` y luego crear una instancia de conexión utilizando los detalles de nuestra base de datos.

~~~
const { Pool } = require('pg');
// Creamos una instancia de conexión a la base de datos
const pool = new Pool({
  user: 'usuario',
  host: 'localhost',
  database: 'mi-base-de-datos',
  password: 'contraseña',
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
~~~

Una vez conectados, podemos realizar operaciones CRUD en nuestra base de datos utilizando consultas SQL.

~~~
// Ejecutamos una consulta SELECT
pool.query('SELECT * FROM usuarios', (err, resultados) => {
  if (err) {
    console.error(err);
  } else {
    console.log('Resultados:', resultados.rows);
  }
});
// Ejecutamos una consulta INSERT
const nuevoUsuario = {
  nombre: 'Juan',
  edad: 25,
  correo: 'juan@example.com'
};
pool.query('INSERT INTO usuarios(nombre, edad, correo) VALUES ($1, $2, $3)', [nuevoUsuario.nombre, nuevoUsuario.edad, nuevoUsuario.correo], (err, resultado) => {
  if (err) {
    console.error(err);
  } else {
    console.log('Usuario insertado con éxito');
  }
});
~~~

Para más información sobre cómo trabajar con bases de datos en Express.js y PostgreSQL, puedes consultar la documentación oficial de [pg](https://node-postgres.com/).
