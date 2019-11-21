const { Platforms } = require("./platforms.model")

async function getAllPlatforms (req, res) {
  try {
    const allPlatforms = await Platforms.find()

    res.status(200).json({platforms: allPlatforms})
  } catch (error) {
    res.status(500).json({error: true, message: error.message})
  }
}

module.exports = {
  getAllPlatforms
}
