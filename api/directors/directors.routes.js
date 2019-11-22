const router = require("express").Router()
const { getAllDirectors, getOneDirector, addDirector } = require("./directors.controller")

router.get("/", getAllDirectors)
router.get("/find/:id", getOneDirector)

router.post("/add", addDirector)

module.exports = router
