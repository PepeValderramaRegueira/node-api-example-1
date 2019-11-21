const { Games } = require("./games.model")

async function getAllGames(req, res) {
  try {
    const allGames = await Games
      .find()
      .populate('producers')
      .populate('directors')
      .populate('platforms')
      .populate('genres')

    res.status(200).json({games: allGames})
  } catch (error) {
    res.status(500).json({error: true, message: error.message})
  }
}

module.exports = {
  getAllGames
}
