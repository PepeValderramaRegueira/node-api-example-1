const router = require("express").Router()
const { getAllGenres } = require("./genres.controller")

router.get("/", getAllGenres)

module.exports = router
