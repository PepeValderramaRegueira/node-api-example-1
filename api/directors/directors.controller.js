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
