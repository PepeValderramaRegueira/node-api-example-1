const mongoose = require("mongoose")
const ObjectId = mongoose.Schema.Types.ObjectId

const gamesSchema = new mongoose.Schema(
  {
    name: { type: String },
    producers: [ { type: ObjectId, ref: 'Producers' } ],
    directors: [ { type: ObjectId, ref: 'director' } ],
    platforms: [ { type: ObjectId, ref: 'platform' } ],
    genres: [ { type: ObjectId, ref: 'genre' } ],
    releaseDate: { type: Date }
  },
  {
    timestamps: true
  }
)

const Games = mongoose.model('game', gamesSchema)

module.exports = { Games }
