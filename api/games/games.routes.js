const router = require("express").Router()
const { getAllGames } = require("./games.controller")

router.get("/", getAllGames)

module.exports = router
