### QUE ÉS?

També conegut com API de REST, o API de RESTful, es un conjunt de regles y convencions per part dels desenvolupadors y dissenyadors de la web per tal de crear serveis web que permetin la comunicació i l'intercanvi de dades entre diferents aplicacions de software.  

En esencia, una API de REST es basa en l’arquitectura web y fa ús de mètodes estàndard d’HTTP per crear, actualitzar i esborrar recursos, com podria ser: GET, POST, PUT y DELETE. Aquests recursos son representacions de dades tal i com objectes JSON o XML, els quals es poden accedir i manipular mitjançant una URL

Un dels principals avantatges que dona una API de REST es la seva tolerancia y flexibilitat a més de la escalabilitat que té. Ja que permet als desenvolupadors crear aplicacions que poden interactuar amb una gran varietat de serveis web i bases de dades. A més, com està basada en HTTP, es compatible amb una inmensa varietat de llenguatges de programació i sistemes operatius. Lo que fa que sigui una de les principals opcions de cara als desenvolupadors gràcies a la seva versatilitat i fàcil accés.

Per a diseñar una API de REST s’utilitzen diferents principis i pràctiques que es concentren en crear un servei web que sigui entenedor i fàcil de fer servir i mantenir. Aquests principis inclueixen:

La separació de les preocupacions, que fa que cada recurs o entitat que es crea a través de l’ API ha de ser responsable de una sola tasca específica. Això fa que es pugui treballar en diferents parts de forma independent.

Exemple:

/usuaris/{id\_usuari}/tasques: per obtenir una llista de totes les tasques d'un usuari.

/usuaris/{id\_usuari}/tasques/{id\_tasca}: per accedir a una tasca específica per la seva ID.

/usuaris/{id\_usuari}/tasques/{id\_tasca}/comentaris: per obtenir una llista de tots els comentaris associats a una tasca.

La utilització de URLs, les quals han de ser descriptives i significatives, es ha dir, han de ser concretes per tal d’entendre a que recurs s'està accedint o manipulan. Ús de mètodes HTTP (GET, POST, PUT y DELETE) de forma adecuada. Exemple:

"/productes/123" hauria de representar el recurs d'un producte específic amb la ID 123.

L’implementació de autenticació i autorització per tal de mantenir un entorn segur per protegir les dades i els recursos que es mou a través de l’API. Ús de formats de dades estàndard per a que els clients puguin interactuar de una forma entenedora amb l’API i puguin interpretar sense problemes l’informació que s’intercanvia. Els més comuns son JSON i XML, a més l'ús d’aquests formats reforça mes possibles interaccions amb altres aplicacions i serveis web.

Resumint, una API de REST es una forma de crear serveis web que permet a diferents aplicacions de software comunicarse i compartir informació d’una manera esandaritzada i eficient utilitzan la arquitectura REST,la cual es flexible i escalable, i es basa es en l’ús de meètodes HTTP i URLs descriptives per accedir i manipular recursos, per això, es una opció popular entre els desenvolupadors que vulguin crear aplicacions que puguin interactuar amb una gran varietat de serveis web i bases de dades.

### IMPLEMENTACIÓ

Per fer ús d’una API de REST en l’aplicació JavaScript es pot fer ús de les llibreries *fetch* que ve de base en els navegadors moderns. La llibreria *fetch* permet realitzar les peticions HTTP i obtenir una resposta asíncrona del servidor.

**PART DE NODE & EXPRESS**

1. Un cop instal·lat Node.js, creat l’arxiu index.js i iniciat el projecte (amb *npm init*). Tenim que instalar express (*npm install express*)

```bash

$ npm init

```
  ```bash

$ npm install express

```


2. Al crear un nou fitxer (server.js) escriure el següent codi:

  




```javascript
const express = require('express');
const app = express();
const port = 8000;
app.listen(port, () => {
	console.log(`Servidor funcionant en el port: ${port}`);
});
```  

3. Executa servidor: *node server.js*

```bash

$ node server.js

```

**PART DE REST**

1. En el fitxer server.js es tenen que crear les rutes/URL’s (o endpoints)

**Exemple:**

  ```javascript
app.get('/api/exemple/ruta, (req, res) => {
	const ejemplo = { texto: 'Exemple de ruta' };
	res.json(ejemplo);
});
```

\*Ruta que accepta peticions GET i retorna un objecte simple JSON.

*localhost:8000/api/exemple/ruta*

**Exemple:**

  ```javascript
app.post('/api/cart/add-product', (req, res) => {
	// Lògica per afegir productes al cart
	res.send('Producte agregat al carrito!');
});
```

\*Ruta que accepta peticions POST i retorna un missatge al client.

*localhost:8000/api/cart/add-product*

2. Es poden afegir funcionalitats com autenticació d’usuaris o conexions a bases de dades. És important documentar els canvis de la API REST.

**Exemple generat per Chat GPT:**

```javascript
const express = require('express');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const app = express();
// Configurar el middleware Passport
passport.use(new LocalStrategy({
` `usernameField: 'email',
` `passwordField: 'password'
` `},
const express = require('express');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const app = express();
// Configurar el middleware Passport
passport.use(new LocalStrategy({
` `usernameField: 'email',
` `passwordField: 'password'
` `},
` `function(email, password, done) {
` `// Aquí iría la lógica para buscar al usuario en una base de datos o en algún otro lugar
` `if (email === 'usuario@ejemplo.com' && password === 'contraseña') {
` `return done(null, { email: email });
` `} else {
` `return done(null, false, { message: 'Usuario o contraseña incorrectos' });
` `}
` `}
));
// Endpoint para la autenticación de usuarios
app.post('/api/login', passport.authenticate('local', { session: false }), (req, res) => {
` `res.json({ message: 'Inicio de sesión exitoso', user: req.user });
});
// Iniciar el servidor
app.listen(3000, () => {
` `console.log('Servidor corriendo en el puerto 3000');
});
```
