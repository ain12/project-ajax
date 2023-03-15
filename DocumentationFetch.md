# Función Fetch

La función Fetch es una API moderna de JavaScript que permite realizar solicitudes de red y obtener recursos desde un servidor web. La función Fetch se utiliza comúnmente para obtener y actualizar datos de una API web. La función Fetch es compatible con promesas, lo que la hace fácil de usar y manejar.

## Sintaxis

```javascript
fetch(url, [options])
  .then((response) => {
    // Procesar la respuesta
  })
  .catch((error) => {
    // Gestionar el error
  });
```

- url: La URL de la solicitud.
- options: Un objeto opcional que define las opciones de la solicitud. Las opciones incluyen:
  - method: El método HTTP de la solicitud (GET, POST, PUT, DELETE, etc.).
  - headers: Un objeto que contiene los encabezados de la solicitud.
  - body: El cuerpo de la solicitud. Esto se utiliza principalmente en solicitudes POST o PUT.
  - mode: El modo de la solicitud (cors, no-cors, same-origin).
  - cache: El tipo de caché a utilizar (default, no-cache, reload, force-cache, only-if-cached).
  - redirect: El modo de redireccionamiento (follow, error, manual).
  - referrer: La URL de referencia de la solicitud.
  - referrerPolicy: El modo de política de referencia de la solicitud.
  - integrity: La integridad del contenido de la solicitud.

El método Fetch recibe una URL como parámetro y devuelve una promesa que se resuelve en una respuesta. La respuesta se procesa utilizando el método .then(), que a su vez devuelve otra promesa.

En Fetch, una promesa es un objeto que representa un valor que puede no estar disponible todavía. Cuando realizas una petición Fetch, la función devuelve una promesa que se resolverá una vez que se reciba la respuesta del servidor.

La promesa que se devuelve de Fetch puede ser resuelta o rechazada, dependiendo de si la solicitud se completa con éxito o no. Si se completa con éxito, la respuesta incluirá información como el estado de la respuesta (200, 404, etc.), el tipo de contenido (JSON, texto, binario, etc.), los encabezados de la respuesta y los datos de la respuesta.

Si la solicitud falla, la promesa se rechazará y se puede gestionar el error utilizando el método .catch(). Por ejemplo, se puede mostrar un mensaje de error al usuario o intentar la solicitud nuevamente. Para saber más, se explica con más detalle en el siguiente apartado sobre las [promesas](#promesas-en-javascript).

A continuación, se muestra un ejemplo de cómo se puede utilizar Fetch para enviar datos de formulario a una API utilizando el método POST:

```javascript
const data = { nombre: "Juan", edad: 25 };

fetch("https://ejemplo.com/api/usuarios", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(data),
})
  .then((response) => {
    if (!response.ok) {
      throw new Error("La respuesta del servidor no fue satisfactoria");
    }
    return response.json();
  })
  .then((data) => {
    console.log(data);
  })
  .catch((error) => {
    console.error("Ocurrió un error:", error);
  });
```

En este ejemplo, se especifica el método POST y se definen los encabezados de la solicitud como "application/json" para indicar que se está enviando un objeto JSON en el cuerpo de la solicitud.

La función "fetch()" devuelve una promesa que se resuelve con la respuesta del servidor. Luego, se llama a la función "then()" con la respuesta como argumento. Si la respuesta del servidor no es satisfactoria, se lanza un Error utilizando la instrucción "throw". De lo contrario, se convierte la respuesta en formato JSON utilizando la función "json()", y se llama a otra función "then()" con los datos como argumento.

# Promesas en JavaScript

Una promesa es un objeto que representa un valor que puede estar disponible ahora, en el futuro o nunca. Las promesas son una forma de trabajar con operaciones asíncronas en JavaScript de manera más sencilla y legible.

Una promesa tiene tres estados posibles:

- Pendiente: el resultado aún no está disponible.
- Resuelto: el resultado está disponible y la promesa se cumple (se resuelve) con un valor.
- Rechazado: la operación falló y la promesa se rechaza (se rechaza) con una razón.

Las promesas tienen dos métodos principales:

- then: se utiliza para manejar la resolución de una promesa. Cuando la promesa se cumple (se resuelve), se ejecuta el callback then con el valor de la promesa.

- catch: se utiliza para manejar el rechazo de una promesa. Cuando la promesa se rechaza (se rechaza), se ejecuta el callback catch con la razón del rechazo.

Aquí un ejemplo de cómo se pueden crear y usar promesas:

```javascript
// Creamos una promesa
const promesa = new Promise((resolve, reject) => {
  // Realizamos una operación asíncrona
  setTimeout(() => {
    const resultado = "Mi valor de promesa";
    resolve(resultado); // Resolvemos la promesa con el valor
  }, 1000);
});

// Usamos la promesa
promesa
  .then((valor) => {
    console.log(valor); // Imprime 'Mi valor de promesa'
  })
  .catch((razon) => {
    console.error(razon); // Manejamos cualquier error que ocurra
  });
```

# Async/await

async/await es una característica de JavaScript que facilita el trabajo con código asíncrono y lo hace más fácil de leer y escribir.

Antes de la introducción de async/await, la forma más común de trabajar con código asíncrono en JavaScript era utilizando callbacks o promesas. Sin embargo, esto a menudo llevaba a un código confuso y difícil de leer.

async/await es una forma más intuitiva de trabajar con código asíncrono. Permite que el código asíncrono parezca síncrono, lo que hace que sea más fácil de entender.

## Funciones asíncronas

Una función asíncrona se define utilizando la palabra clave async antes de la definición de la función. Esto indica que la función es asíncrona y que puede contener operaciones asíncronas.

```javascript
async function miFuncionAsincrona() {
  // código aquí
}
```

## Await

await es una palabra clave que sólo puede ser utilizada dentro de una función asíncrona. Se utiliza para esperar el resultado de una operación asíncrona, como una llamada a una API o una operación de lectura/escritura en una base de datos.

Cuando se utiliza await, la función asíncrona se pausa temporalmente hasta que se complete la operación asíncrona y se devuelva un resultado.

Hay varias formas de gestionar los await:

```javascript
//Ejemplo 1:
async function miFuncionAsincrona() {
  try {
    const resultado = await FuncionConFetch();
  } catch (error) {
    //error
  }
  // código aquí
}

//Ejemplo 2:
async function miFuncionAsincrona() {
  try {
    const resultado = await fetch("https://ejemplo.com/datos");
    const datos = await resultado.json();
  } catch (error) {
    //error
  }
}
```

Por un lado, en los dos ejemplos se gestionan los errores de la mimsa manera. Al igual que con las promesas, las funciones asíncronas pueden lanzar errores en caso de fallos. Para manejar estos errores, se puede utilizar un bloque try...catch.

Por otro lado, la diferencia entre el primer ejemplo y el segundo es que en el primer ejemplo se utiliza await para esperar el resultado de una operación asíncrona, mientras que en el segundo ejemplo se utiliza await para esperar la respuesta de una llamada a una API utilizando la función fetch.

En el primer ejemplo, FuncionConFetch() es cualquier función que devuelva una promesa, por ejemplo, una operación de lectura/escritura en una base de datos o una llamada a una API. En nuestro caso, será una llamada a la API a través de un fetch. El await indica que la función asíncrona FuncionConFetch() debe esperar a que se complete la operación asíncrona antes de continuar con la ejecución del código. Si hay algún error, se gestiona en el bloque catch.

En el segundo ejemplo, se utiliza fetch() para realizar directamente una llamada a una API y se utiliza await para esperar la respuesta de la llamada. Una vez que se recibe la respuesta, se utiliza await para esperar a que la respuesta sea convertida en formato JSON. Como en el primer ejemplo, se maneja en el bloque catch si ocurre algún error en cualquiera de las dos operaciones asíncronas.

# Cargar datos dinámicamente en una web estática

La carga de datos dinámica implica la obtención de información en tiempo real desde una fuente externa, como una API, base de datos o un archivo JSON. En una aplicación web, la carga de datos dinámica permite actualizar la interfaz de usuario sin recargar la página completa.

## Uso de Fetch para cargar datos dinámicamente

La función Fetch se puede utilizar para cargar datos dinámicamente en una aplicación web. Para cargar datos dinámicamente, se utiliza la función Fetch para obtener los datos de una fuente externa, y luego se manipulan los datos y se actualiza la interfaz de usuario utilizando el método DOM.

### Ejemplo acoplado

En este ejemplo, metemos los datos dinamicamente directamente desde el Fetch.

HTML:

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Uso de Fetch para cargar datos dinámicamente</title>
  </head>
  <body>
    <h1>Lista Dinámica</h1>
    <div id="mi-lista">
      <ul id="lista"></ul>
    </div>
  </body>
</html>
```

Javascript:

```javascript
function obtenerDatos() {
  return fetch("https://api.example.com/data")
    .then((response) => response.json())
    .then((data) => {
      const lista = document.querySelector("#lista");
      data.forEach((item) => {
        const li = document.createElement("li");
        li.textContent = item.nombre;
        lista.appendChild(li);
      });
    })
    .catch((error) => console.error(error));
}

document.querySelector("#boton-cargar").addEventListener("click", obtenerDatos);
```
