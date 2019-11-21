const { Directors } = require("./directors.model")

async function getAllDirectors(req, res) {
  try {
    const allDirectors = await Directors.find()
    
    res.status(200).json({directors: allDirectors})
  } catch (error) {
    res.status(500).json({error: true, message: error.message})
  }
}

module.exports = {
  getAllDirectors
}
