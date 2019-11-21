const router = require("express").Router()
const { getAllProducers } = require("./producers.controller")

router.get("/", getAllProducers)

module.exports = router
