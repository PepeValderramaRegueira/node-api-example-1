const { Genres } = require("./genres.model")

async function getAllGenres(req, res) {
  try {
    const allGenres = await Genres.find()

    res.status(200).json({genres: allGenres})
  } catch (error) {
    res.status(500).json({error: true, message: error.message})
  }
}

module.exports = {
  getAllGenres
}
