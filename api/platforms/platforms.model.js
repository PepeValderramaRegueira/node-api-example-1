const mongoose = require("mongoose")

const platformsSchema = new mongoose.Schema(
  {
    name: { type: String }
  },
  {
    timestamps: true
  }
)

const Platforms = mongoose.model('platforms', platformsSchema)

module.exports = Platforms
