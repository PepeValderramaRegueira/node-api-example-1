const router = require("express").Router()
const controller = require("./games.controller")

router.get("/", controller.getAllGames)

module.exports = router
