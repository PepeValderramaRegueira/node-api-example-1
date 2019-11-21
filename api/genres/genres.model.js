const mongoose = require("mongoose")

const genresSchema = new mongoose.Schema(
  {
    name: { type: String }
  },
  {
    timestamps: true
  }
)

const Genres = mongoose.model('genre', genresSchema)

module.exports = { Genres }
