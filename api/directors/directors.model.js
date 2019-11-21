const mongoose = require("mongoose")

const directorsSchema = new mongoose.Schema(
  {
    name: { type: String },
    age: { type: Number, min: 1 },
    birthDate: { type: Date }
  },
  {
    timestamps: true
  }
)

const Directors = mongoose.model('director', directorsSchema)

module.exports = { Directors }
