const express = require("express")
const { token } = require("../../services/token")
const { activity } = require("./controller")

const router = express.Router()

//get all alimenti
router.get("/", token({ required: true }), activity.getLocations)

//get alimento from id
router.get("/:id", token({ require: true }), activity.getSpecificLocation)

//insert new alimento
router.post("/", token({ required: true }), activity.createLocation)


module.exports = router 