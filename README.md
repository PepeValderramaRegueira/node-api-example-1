# Ejemplo de API

Este es un pequeño ejemplo de cómo se podría estructurar una API (es solo una manera,
hay miles de formas de estructurarlo), pero de esta manera todo está más agrupado
como si fueran componentes. Cada colección de mongo será transformada en una carpeta
en el directorio `/api`, y cada directorio (es decir, colección) tendrá su modelo,
sus rutas y su controlador. Así, cuando se importan los controladores en los archivos
de rutas, los tenemos accesibles en el mismo directorio, lo que hará que las rutas sean
más limpias.

Esta API devuelve JSON para que podáis hacer las pruebas con Postman. La única diferencia
es que en lugar de devolver JSONs tendréis que hacer el res.render.

## Puesta a punto de la API

### Archivo .env

Hay que añadir el archivo .env con las siguientes variables:

```
  PORT=3000
  DB=mongodb://127.0.0.1:27017/node-api-example
```

### Poblar la base de datos

La API cuenta con un script (situado en la carpeta `/scripts`) el cual servirá para
poblar la base de datos.

Utiliza un paquete de npm llamado `mongo-seeding`, el cual nos permite tener un
manejo bastante potente de los datos que utilizaremos en las semillas. La URL de este
paquete es https://www.npmjs.com/package/mongo-seeding.

Para poblar nuestra base de datos, tenemos que colocarnos en la raíz del proyecto y
ejecutar el script `seed-db` => `npm run seed-db` (asegurarnos de que se está
ejecutando el servicio de Mongo).

### Levantar el servidor

Bastará con utilizar el script `dev` => `npm run dev`.

## ¿Cómo están estructurados los recursos que sirve la API?

Dentro de la carpeta `/api`, habrá una carpeta por cada colección de Mongo, las cuales
estarán divididas en tres archivos: un archivo modelo, un arhivo de rutas y un archivo
controlador.

La idea de separarlo así es para tener todo bien estructurado y modularizado, encargándose
cada archivo de lo suyo y no mezclar funcionalidades.

### [collection].model.js

Llevan el sufijo `.model` para diferenciarlos. Este archivo contiene la defición del modelo
de la base de datos.

### [collection].routes.js

Contiene todas las rutas que pertenecen a esta colección. Al inicio de cada archivo, se importan
todas las funciones de su controlador (ver siguiente apartado), se crea un router para capturar
las rutas y se exporta el router al final.

Cuando capturamos una ruta, en lugar de hacer todo el procedimiento que ocurre cuando se solicita
este recurso como se muestra a continuación:

```javascript
  router.get("/find/:id", (req, res) => {
    // Procedimiento para devolver el recurso solicitado
    // Puede ocupar 10 líneas como 100, lo que puede dar lugar a un archivo de rutas
    // muy extenso y difícil de depurar y mantener.
  })
```

```javascript
  const router = require("express").Router()
  const { getAllDirectors, getOneDirector, addDirector } = require("./directors.controller")

  router.get("/", getAllDirectors)
  router.get("/find/:id", getOneDirector)

  router.post("/add", addDirector)

  module.exports = router
```

lo que haremos será únicamente capturar la ruta e indicar qué función del controlador se debe ejecutar
cuando se accede a este recurso. Veamos el archivo `/api/directors/directors.routes.js` entero:

```javascript
  // Creamos el router para capturar las rutas.
  const router = require("express").Router()

  // Importamos las funciones del controlador.
  const { getAllDirectors, getOneDirector, addDirector } = require("./directors.controller")

  // Capturamos las rutas get y, por cada ruta capturada, llamamos a la función que le corresponda.
  router.get("/", getAllDirectors)
  router.get("/find/:id", getOneDirector)

  // Hacemos lo mismo con las rutas post.
  router.post("/add", addDirector)

  // Aquí se podrían poner las rutas delete y las put.

  // Exportamos el router por defecto.
  module.exports = router
```

Como se puede apreciar, es un archivo en el que solamente hay rutas, justo la finalidad que tiene esta
metodología.

Cuando llamamos a las funciones, no tenemos que pasarles los parámetros req, res y next. Internamente ya
se están pasando. Nos bastará con indicarlos en las funciones del archivo controlador.

### [collection].controller.js

**Importante:** como en el segundo proyecto se trabaja con Handlebars, en lugar de hacer un `res.json`,
habría que hacer un `res.render`.

Estos archivos son los que ejecutan toda la lógica de la solicitud. Vamos a ver el archivo
`/api/directors/directors.controller.js`:

```javascript
  const { Directors } = require("./directors.model")

  async function getAllDirectors(req, res) {
    try {
      const allDirectors = await Directors.find()
      
      res.status(200).json({directors: allDirectors})
    } catch (error) {
      res.status(500).json({error: true, message: error.message})
    }
  }

  async function getOneDirector(req, res) {
    try {
      const director = await Directors.find({ _id: req.params.id })

      res.status(200).json(director)
    } catch (error) {
      res.status(500).json({eror: true, message: error.message})
    }
  }

  async function addDirector(req, res) {
    try {
      const { name, age, birthDate } = req.body

      const newDirector = await Directors.create({ name, age, birthDate })

      res.status(200).json(newDirector)
    } catch (error) {
      res.status(500).json({ error: true, message: error.message })
    }
  }

  module.exports = {
    getAllDirectors,
    getOneDirector,
    addDirector
  }
```

Lo primero que hacemos es importar el modelo para poder obtener o añadir los datos a
a la colección.

Después, creamos todas las funciones que necesitemos. Cada una de ellas se encargará
de proporcionar o añadir un recurso.

La primera función se encarga de obtener todos los directores y devolverlos en formato
JSON.

La segunda función se encarga de obtener los datos de un director a partir de su `_id` y
devuelve sus datos.

La tercera función añade un director nuevo. Recoge los datos necesarios (en este caso
name, age y birthDate) del `req.body` y crea un registro nuevo.

Por último, en el module.exports, exportamos todas las funciones que hemos creado. Es
importante darse cuenta de que los exports están encerrados entre llaves, por lo que cuando
hagamos los require en el archivo de routes, deberán tener exactamente el mismo nombre
que en el `module.exports`. Ejemplo:

```Javascript
  // Archivo directors.controller.js
  module.exports = {
    getAllDirectors,
    getOneDirector,
    addDirector
  }
```

```Javascript
  // Archivo directors.routes.js
  const { getAllDirectors, getOneDirector, addDirector } = require("./directors.controller")

  // Se tienen que importar con el mismo nombre con el que se exportaron.
  // Si se importan con otro nombre, dirá que no encuentra el recurso.
```

### Endpoints

#### Get

* `/api/directors` => devuelve todos los directores.
* `/api/directors/find/:id` => devuelve los datos de un director.
* `/api/games` => devuelve todos los juegos populados.
* `/api/genres` => devuelve todos los géneros.
* `/api/platforms` => devuelve todas las plataformas.
* `/api/producers` => devuelve todos los productores.


#### Post

* `/api/directors/add` => crea un director. Parámetros del body: { name, age, birthDate }

## Fin

Espero que esta estructuración pueda ayudaros. Cuando yo hice mi segundo proyecto utilicé una
metodología parecida y tanto a mi compañero como a mí nos pareció bastante cómoda y útil, y
nos ayudó mucho para apenas tener conflictos al integrar nuestros desarrollos con Git.

Esta forma es, por así decirlo, una evolución de la que usamos en nuestro segundo proyecto con
algunas cosas añadidas que en su día no conocía pero que considero que son bastante útiles, como
por ejemplo, llamar únicamente a la función en los arhivos de rutas en lugar de llamarla y pasarla
los tres parámetros de req, res y next.

Al fin y al cabo esto es solamente una manera más de organizar un proyecto la cual yo creo
que es bastante cómoda basándome en mi experiencia, pero sé que hay muchas más maneras de organizarlo
que también tendrán sus ventajas.

¡Mucha suerte a tod@s!
