require("dotenv").config()
const express = require("express")

// Importante: en la carpeta api hay un archivo index.js, el cual exporta las rutas que va
// a utilizar. Cuando hagamos el require, no es necesario poner require("./api/index").
// Al llamarse index.js, el servidor tomará ese archivo por defecto y bastará con referenciar
// al directorio que contiene dicho archivo (en este caso el directorio api, pero este patrón
// puede aplicarse en más directorios).
const apiRoutes = require("./api")

const app = express()

// Rutas para la API.
app.use("/api", apiRoutes)

app.listen(process.env.PORT, () => {
  console.log("Server listening on http://localhost:3000")
})
