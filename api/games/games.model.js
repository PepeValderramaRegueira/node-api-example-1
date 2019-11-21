const mongoose = require("mongoose")
const ObjectId = mongoose.Schema.Types.ObjectId

const gamesSchema = new mongoose.Schema(
  {
    name: { type: String },
    producers: [ { type: ObjectId, ref: 'producers' } ],
    directors: [ { type: ObjectId, ref: 'directors' } ],
    platforms: [ { type: ObjectId, ref: 'platforms' } ],
    genres: [ { type: ObjectId, ref: 'genres' } ],
    releaseDate: { type: Date }
  },
  {
    timestamps: true
  }
)

const Games = mongoose.model('games', gamesSchema)

module.exports = Games
