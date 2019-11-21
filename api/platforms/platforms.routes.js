const router = require("express").Router()
const { getAllPlatforms } = require("./platforms.controller")

router.get("/", getAllPlatforms)

module.exports = router
