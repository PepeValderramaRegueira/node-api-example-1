require("dotenv").config()
const { Seeder } = require("mongo-seeding")
const path = require("path")

// Configuración para poblar la base de datos Mongo.
const config = {
  database: process.env.DB,
  dropDatabase: true
}

// Creamos la instancia del Seeder con la configuración establecida.
const seeder = new Seeder(config)

// Importante: leer las normas de nomenclatura para crear una estructura correcta para usar
// este método de seeding (https://github.com/pkosiec/mongo-seeding/blob/master/docs/import-data-definition.md)
// Especificamos de dónde vienen los datos.
const collections = seeder.readCollectionsFromPath(
  path.resolve(__dirname, './data/')
);

// Poblamos la base de datos.
// Creamos una función que se autoinvoca.
// ¿Qué son las Immediately-invoked Function Expressions (IIFE)? => https://flaviocopes.com/javascript-iife/
(async () => {
  try {
    await seeder.import(collections)
    console.log('Data imported successfully.')
  } catch (error) {
    console.log('Error seeding the database.')
  }
})()
