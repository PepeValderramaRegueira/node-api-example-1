const router = require("express").Router()

router.use("/directors", require("./directors/directors.routes"))
router.use("/games", require("./games/games.routes"))
router.use("/genres", require("./genres/genres.routes"))
router.use("/platforms", require("./platforms/platforms.routes"))
router.use("/producers", require("./producers/producers.routes"))

module.exports = router
