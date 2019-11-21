const { Producers } = require("./producers.model")

async function getAllProducers (req, res) {
  try {
    const allProducers = await Producers.find()
    
    res.status(200).json({producers: allProducers})
  } catch (error) {
    res.status(500).json({error: true, message: error.message})
  }
}

module.exports = {
  getAllProducers
}
