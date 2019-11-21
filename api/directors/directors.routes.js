const router = require("express").Router()
const { getAllDirectors } = require("./directors.controller")

router.get("/", getAllDirectors)

module.exports = router
