const mongoose = require("mongoose")

const producersSchema = new mongoose.Schema(
  {
    name: { type: String },
    age: { type: Number, min: 1 },
    birthDate: { type: Date }
  },
  {
    timestamps: true
  }
)

const Producers = mongoose.model('Producers', producersSchema)

module.exports = { Producers }
